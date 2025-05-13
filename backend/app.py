from flask import Flask
from flask_cors import CORS

# Crear app
app = Flask(__name__)
CORS(app)  # Permite peticiones desde React (CORS)

# IMPORTAR Y REGISTRAR RUTAS
from routes.login import login_bp
from recomendacion.recomendacion import recomendacion_bp
from routes.usuarios import user_bp
from routes.pelicula import pelicula_bp

app.register_blueprint(login_bp)
app.register_blueprint(recomendacion_bp)
app.register_blueprint(user_bp)
app.register_blueprint(pelicula_bp)

# Iniciar app
if __name__ == '__main__':
    app.run(debug=True, port=5000)
