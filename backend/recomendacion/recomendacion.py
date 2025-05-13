from flask import Blueprint, jsonify

recomendacion_bp = Blueprint('recomendacion', __name__)

@recomendacion_bp.route('/recomendaciones', methods=['GET'])
def get_recomendaciones():
    # Aquí iría tu lógica de recomendación real
    peliculas_recomendadas = [
        {"titulo": "Inception", "genero": "Sci-Fi"},
        {"titulo": "The Matrix", "genero": "Sci-Fi"},
        {"titulo": "The Social Network", "genero": "Drama"}
    ]
    return jsonify(peliculas_recomendadas)
