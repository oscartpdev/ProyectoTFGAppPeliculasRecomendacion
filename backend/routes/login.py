import mysql.connector
from flask import Blueprint, request, jsonify
from db import get_connection
from datetime import datetime

login_bp = Blueprint('login', __name__)

# Configuración de conexión (ajusta a tu entorno)


@login_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')  # suponiendo que usas email como username
    contrasena = data.get('contrasena')

    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        query = "SELECT * FROM usuario WHERE email = %s AND contrasena = %s"
        cursor.execute(query, (email, contrasena))
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        if user:
            return jsonify({'message': 'Login correcto', 'user': user}), 200
        else:
            return jsonify({'message': 'Credenciales inválidas'}), 401

    except mysql.connector.Error as err:
        print("Error en la base de datos:", err)
        return jsonify({'message': 'Error interno'}), 500
    
@login_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    contrasena = data.get('contrasena')
    nombre = data.get('nombre')
    fecha_registro = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        query = "INSERT INTO usuario (email, contrasena, nombre, fecha_registro) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (email, contrasena, nombre, fecha_registro))
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'message': 'Registro exitoso'}), 201

    except mysql.connector.Error as err:
        print("Error en la base de datos:", err)
        return jsonify({'message': 'Error interno'}), 500
