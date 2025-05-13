import mysql.connector
from flask import Blueprint, request, jsonify
from db import get_connection
from datetime import datetime

user_bp = Blueprint('user', __name__)

@user_bp.route('/list_users', methods=['GET'])
def list_users():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM usuario")
        users = cursor.fetchall()
        return jsonify(users), 200
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        conn.close()

@user_bp.route('/friends/<amigo_id>', methods=['GET'])
def get_friend_detail(amigo_id):
    usuario_id = request.headers.get('Usuario-Id')
    if not usuario_id:
        return jsonify({"error": "Falta usuario_id"}), 400

    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
            SELECT u.id, u.nombre, a.fecha_solicitud
            FROM amistad a
            JOIN usuario u ON (
                (a.usuario_id = %s AND a.amigo_id = %s AND u.id = a.amigo_id)
                OR
                (a.amigo_id = %s AND a.usuario_id = %s AND u.id = a.usuario_id)
            )
        """

        cursor.execute(query, (usuario_id, amigo_id, usuario_id, amigo_id))
        amigo = cursor.fetchone()

        if amigo:
            return jsonify(amigo), 200
        else:
            return jsonify({"error": "No hay amistad entre los usuarios"}), 404

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        conn.close()

@user_bp.route('/all_friends', methods=['GET'])
def all_friends():
    usuario_id = request.headers.get('Usuario-Id')
    if not usuario_id:
        return jsonify({"error": "Falta usuario_id"}), 400

    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
            SELECT u.id, u.nombre, a.fecha_solicitud
            FROM amistad a
            JOIN usuario u ON (
                (a.usuario_id = %s AND u.id = a.amigo_id) OR
                (a.amigo_id = %s AND u.id = a.usuario_id)
            )
        """

        cursor.execute(query, (usuario_id, usuario_id))
        friends = cursor.fetchall()
        return jsonify(friends), 200

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        conn.close()

@user_bp.route('/add_friend',methods=['POST'])
def add_friend():
    data = request.get_json()
    amigo_id = data.get('amigo_id')
    usuario_id = request.headers.get('Usuario-Id')

    if not amigo_id or not usuario_id:
        return jsonify({"error": "Faltan datos"}), 400

    try:
        conn = get_connection()
        cursor = conn.cursor()

        # Verificar si ya existe la amistad
        query = """
            SELECT * FROM amistad
            WHERE (usuario_id = %s AND amigo_id = %s) OR (usuario_id = %s AND amigo_id = %s)
        """
        cursor.execute(query, (usuario_id, amigo_id, amigo_id, usuario_id))
        existing_friendship = cursor.fetchone()

        if existing_friendship:
            return jsonify({"error": "Ya son amigos"}), 400

        # Insertar nueva amistad
        fecha_solicitud = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        insert_query = """
            INSERT INTO amistad (usuario_id, amigo_id, fecha_solicitud)
            VALUES (%s, %s, %s)
        """
        cursor.execute(insert_query, (usuario_id, amigo_id, fecha_solicitud))
        conn.commit()

        return jsonify({"message": "Amistad creada exitosamente"}), 201

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        conn.close()