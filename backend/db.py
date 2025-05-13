# db.py
import mysql.connector

def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Mysqlpassword03@",
        database="recomendador_peliculas"
    )
