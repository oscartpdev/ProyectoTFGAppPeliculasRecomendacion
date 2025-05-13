CREATE DATABASE IF NOT EXISTS recomendador_peliculas;
USE recomendador_peliculas;

-- Tabla Usuario
CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(25),
    email VARCHAR(255) UNIQUE,
    contrasena VARCHAR(255),
    fecha_registro DATE
);

-- Tabla Amistad
CREATE TABLE Amistad (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    amigo_id INT,
    estado ENUM('pendiente', 'aceptado', 'rechazado'),
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (amigo_id) REFERENCES Usuario(id)
);

-- Tabla Historial de Visualización
CREATE TABLE HistorialVisualizacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    pelicula_id INT, -- ID de TheMovieDB
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

-- Tabla Interacción
CREATE TABLE Interaccion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    pelicula_id INT, -- ID de TheMovieDB
    accion ENUM('Visto', 'Calificado', 'Guardado', 'Abandonado'),
    calificacion FLOAT,
    tiempo_visualizacion INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

-- Tabla Calificación
CREATE TABLE Calificacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    pelicula_id INT, -- ID de TheMovieDB
    calificacion FLOAT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

-- Tabla Lista de usuario
CREATE TABLE Lista (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    nombre VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

-- Relación Lista <-> Película
CREATE TABLE Lista_Pelicula (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lista_id INT,
    pelicula_id INT, -- ID de TheMovieDB
    FOREIGN KEY (lista_id) REFERENCES Lista(id)
);

-- Tabla Recomendaciones entre usuarios
CREATE TABLE RecomendacionUsuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    amigo_id INT,
    pelicula_id INT, -- ID de TheMovieDB
    estado ENUM('pendiente', 'aceptado', 'rechazado'),
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (amigo_id) REFERENCES Usuario(id)
);

-- Tabla Notificación
CREATE TABLE Notificacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    contenido TEXT,
    leida BOOLEAN DEFAULT FALSE,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);


-- Inserts de Ejemplo (simplificada para el esquema)
INSERT INTO Usuario (nombre, email, contrasena, fecha_registro) VALUES
('Alice', 'alice@example.com', 'pass123', '2024-01-01'),
('Bob', 'bob@example.com', 'pass456', '2024-01-02');


INSERT INTO Amistad (usuario_id, amigo_id, estado) VALUES
(1, 2, 'aceptado');


INSERT INTO HistorialVisualizacion (usuario_id, pelicula_id) VALUES
(1, 27205), -- Alice vio Inception
(2, 603);   -- Bob vio The Matrix


INSERT INTO Interaccion (usuario_id, pelicula_id, accion, calificacion, tiempo_visualizacion) VALUES
(1, 27205, 'Visto', 5.0, 148),
(2, 603, 'Visto', 4.5, 136),
(1, 157336, 'Guardado', NULL, NULL); -- Alice guardó Interstellar

INSERT INTO Calificacion (usuario_id, pelicula_id, calificacion) VALUES
(1, 27205, 5.0),
(2, 603, 4.5);


INSERT INTO Lista (usuario_id, nombre) VALUES
(1, 'Mis Favoritas');


INSERT INTO Lista_Pelicula (lista_id, pelicula_id) VALUES
(1, 27205),
(1, 157336); -- Alice agregó Inception e Interstellar a su lista


INSERT INTO RecomendacionUsuario (usuario_id, amigo_id, pelicula_id, estado) VALUES
(1, 2, 157336, 'pendiente'); -- Alice recomienda Interstellar a Bob


INSERT INTO Notificacion (usuario_id, contenido, leida) VALUES
(2, 'Alice te recomendó la película "Interstellar".', FALSE);



