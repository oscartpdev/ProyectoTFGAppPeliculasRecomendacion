# train_model.py
import pandas as pd
from sklearn.neighbors import NearestNeighbors
import joblib

# Dataset simulado
data = {
    'movie': ['A', 'B', 'C', 'D'],
    'user1': [5, 3, 0, 1],
    'user2': [4, 0, 0, 1],
    'user3': [1, 1, 0, 5]
}

df = pd.DataFrame(data).set_index('movie').T

model = NearestNeighbors(metric='cosine')
model.fit(df.values)

joblib.dump(model, 'models/recommender_model.joblib')
print("Modelo entrenado y guardado correctamente.")
