import mysql.connector
from flask import Blueprint, request, jsonify
from db import get_connection
from datetime import datetime

pelicula_bp = Blueprint('pelicula', __name__)

@pelicula_bp.route('/crear_lista', methods=['POST'])
def crear_lista_favoritos():
    data = request.get_json()
    usuario_id = data.get('usuario_id')

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO Lista (usuario_id, nombre) 
        VALUES (%s, 'Mis Favoritas')
    """, (usuario_id,))
    conn.commit()
    nueva_id = cursor.lastrowid
    cursor.close()
    conn.close()

    return jsonify({'lista_id': nueva_id}), 201

@pelicula_bp.route('/agregar_a_lista', methods=['POST'])
def agregar_a_favoritos():
    data = request.get_json()
    lista_id = data.get('lista_id')
    pelicula_id = data.get('pelicula_id')

    conn = get_connection()
    cursor = conn.cursor()

    # Verificamos si ya está en la lista
    cursor.execute("""
        SELECT * FROM Lista_Pelicula 
        WHERE lista_id = %s AND pelicula_id = %s
    """, (lista_id, pelicula_id))

    if cursor.fetchone():
        cursor.close()
        conn.close()
        return jsonify({'message': 'Ya está en favoritos'}), 409

    # Insertar
    cursor.execute("""
        INSERT INTO Lista_Pelicula (lista_id, pelicula_id) 
        VALUES (%s, %s)
    """, (lista_id, pelicula_id))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({'message': 'Agregado a favoritos'}), 201

@pelicula_bp.route('/lista_favoritos/<usuario_id>', methods=['GET'])
def lista_favoritos(usuario_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT id FROM Lista 
        WHERE usuario_id = %s AND nombre = 'Mis favoritas'
    """, (usuario_id,))
    lista = cursor.fetchone()
    cursor.close()
    conn.close()

    if lista:
        return jsonify({'lista_id': lista[0]})
    else:
        return jsonify({'lista_id': None})
