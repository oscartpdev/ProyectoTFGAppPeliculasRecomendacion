from flask import Blueprint, request, jsonify
from db import get_connection
from datetime import datetime

interaccion_bp = Blueprint('interaccion', __name__)

@interaccion_bp.route('/valorar', methods=['POST'])
def valorar_pelicula():
    data = request.get_json()
    usuario_id = data.get('usuario_id')
    pelicula_id = data.get('pelicula_id')
    valor = data.get('valor')

    if not all([usuario_id, pelicula_id, valor]):
        return jsonify({'error': 'Faltan datos obligatorios'}), 400

    conn = get_connection()
    cursor = conn.cursor()

    fecha_actual = datetime.now()

    try:
        # Insertar o actualizar calificación con fecha
        cursor.execute("""
            INSERT INTO Calificacion (usuario_id, pelicula_id, calificacion, fecha)
            VALUES (%s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE 
                calificacion = VALUES(calificacion),
                fecha = VALUES(fecha)
        """, (usuario_id, pelicula_id, valor, fecha_actual))

        # Insertar interacción con fecha
        cursor.execute("""
            INSERT INTO Interaccion (usuario_id, pelicula_id, accion, calificacion, fecha)
            VALUES (%s, %s, 'Visto', %s, %s)
        """, (usuario_id, pelicula_id, valor, fecha_actual))

        # Verificar si ya está en el historial
        cursor.execute("""
            SELECT id FROM historialvisualizacion
            WHERE usuario_id = %s AND pelicula_id = %s
        """, (usuario_id, pelicula_id))
        existe = cursor.fetchone()

        if not existe:
            cursor.execute("""
                INSERT INTO historialvisualizacion (usuario_id, pelicula_id, fecha)
                VALUES (%s, %s, %s)
            """, (usuario_id, pelicula_id, fecha_actual))

        conn.commit()
        return jsonify({'message': 'Valoración registrada correctamente'})

    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500

    finally:
        cursor.close()
        conn.close()
