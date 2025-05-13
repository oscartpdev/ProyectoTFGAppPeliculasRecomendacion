import os
import joblib
from flask import Flask, request, jsonify

app = Flask(__name__)

# Ruta absoluta basada en la ubicación de app.py
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, '..', 'models', 'recommender_model.joblib')

model = joblib.load(MODEL_PATH)

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    user_ratings = data.get('ratings', [])
    distances, indices = model.kneighbors([user_ratings], n_neighbors=2)
    return jsonify({'distances': distances.tolist(), 'indices': indices.tolist()})

if __name__ == '__main__':
    app.run(port=5001)
