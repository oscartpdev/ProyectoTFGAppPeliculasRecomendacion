import mysql.connector
from flask import Blueprint, request, jsonify
from db import get_connection
from datetime import datetime

pelicula_bp = Blueprint('pelicula', __name__)

@pelicula_bp.route('/crear_lista', methods=['POST'])
def crear_lista():
    data = request.get_json()
    usuario_id = data.get('usuario_id')
    nombre = data.get('nombre', 'Mis Favoritas')

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO Lista (usuario_id, nombre) 
        VALUES (%s, %s)
    """, (usuario_id, nombre))
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

@pelicula_bp.route('/lista/<usuario_id>/<nombre_lista>', methods=['GET'])
def obtener_lista(usuario_id, nombre_lista):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT id FROM Lista 
        WHERE usuario_id = %s AND nombre = %s
    """, (usuario_id, nombre_lista))
    lista = cursor.fetchone()
    cursor.close()
    conn.close()

    if lista:
        return jsonify({'lista_id': lista[0]})
    else:
        return jsonify({'lista_id': None})
    
@pelicula_bp.route('/peliculas_lista/<int:usuario_id>/<string:nombre_lista>', methods=['GET'])
def obtener_peliculas_lista(usuario_id, nombre_lista):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT id FROM Lista 
        WHERE usuario_id = %s AND nombre = %s
    """, (usuario_id, nombre_lista))
    lista = cursor.fetchone()

    if not lista:
        cursor.close()
        conn.close()
        return jsonify({'peliculas': []})

    lista_id = lista['id']

    cursor.execute("""
        SELECT pelicula_id 
        FROM Lista_Pelicula 
        WHERE lista_id = %s
    """, (lista_id,))
    
    peliculas = cursor.fetchall()
    cursor.close()
    conn.close()

    return jsonify({'peliculas': peliculas})
