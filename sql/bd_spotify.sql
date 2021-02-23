-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-02-2021 a las 11:21:30
-- Versión del servidor: 10.1.35-MariaDB
-- Versión de PHP: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `bd_spotify2`
--

DROP DATABASE IF EXISTS  `bd_spotify`;
CREATE database  `bd_spotify` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `bd_spotify`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cancion`
--

CREATE TABLE `cancion` (
  `titulo` varchar(50) NOT NULL,
  `artista` varchar(50) NOT NULL,
  `disco` varchar(50) NOT NULL,
  `genero` varchar(50) NOT NULL,
  `año` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cancion`
--

INSERT INTO `cancion` (`titulo`, `artista`, `disco`, `genero`, `año`) VALUES
('Bohemian Rhapsody', 'Queen', 'A Night at the Opera', 'Rock', 1979),
('Break My Heart', 'Dua Lipa', 'Future Nostalgia', 'Pop', 2020),
('Children of the Grave', 'Black Sabbath', 'Master of Reality', 'Rock', 1971),
('Como Camaron', 'Estopa', 'La maqueta', 'Flamenco', 1999),
('Desde la Azotea', 'Niña Pastori', 'Bajo tus alas', 'Flamenco', 2018),
('El Ratón', 'Diego El Cigala', 'Insdestructible', 'Flamenco', 2016),
('Escúchame Mujer', 'Fondo Flamenco', 'Contracorriente', 'Flamenco', 2007),
('Everybody', 'Backstreet Boys', 'Fresh Hits 1997', 'Pop', 1997),
('Fear of the Dark', 'Iron Maiden', 'Fear of the Dark', 'Rock', 1992),
('Sufre mamon', 'Hombres G', 'Voy a pasármelo bien', 'Pop', 1989),
('The Lion from the North', 'Sabaton', 'Carolus Rex', 'Rock', 2012),
('Wannabe', 'Spice Girls', 'Now Thats What I Call Music! 34', 'Pop', 1996);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `correo` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `contraseña` varchar(10) NOT NULL,
  `numPlaylist` int(3) NOT NULL,
  `premium` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`correo`, `nombre`, `contraseña`, `numPlaylist`, `premium`) VALUES
('anasalguero@gmail.com', 'Ana', 'Ana123', 4, 1),
('carlosduran@gmail.com', 'Carlos', 'Carlos123', 1, 0),
('jesusgomez@gmail.com', 'Jesus', 'Jesus123', 0, 1),
('josemuñoz@gmail.com', 'Jose', 'Jose123', 2, 1),
('juanlopez@gmail.com', 'Juan', 'Juan123', 2, 0),
('laragarcia@gmail.com', 'Lara', 'Lara123', 2, 0),
('luciabarrero@gmail.com', 'Lucia', 'Lucia123', 0, 0),
('marinabarbero@gmail.com', 'Marina', 'Marina123', 0, 0),
('mariomarquez@gmail.com', 'Mario', 'Mario123', 0, 1),
('martapastor@gmail.com', 'Marta', 'Marta123', 0, 1),
('melaniacarrero@gmail.com', 'Melania', 'Melania123', 1, 1),
('miguelatienza@gmail.com', 'Miguel', 'Miguel123', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_playlist`
--

CREATE TABLE `cliente_playlist` (
  `correo_c` varchar(50) NOT NULL,
  `nombre_p` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cliente_playlist`
--

INSERT INTO `cliente_playlist` (`correo_c`, `nombre_p`) VALUES
('anasalguero@gmail.com', 'Acoustic Chill'),
('anasalguero@gmail.com', 'Another Place'),
('anasalguero@gmail.com', 'Bad Vibes'),
('anasalguero@gmail.com', 'Breaking News'),
('carlosduran@gmail.com', 'Daydreaming'),
('josemuñoz@gmail.com', 'End Future'),
('josemuñoz@gmail.com', 'In the dark'),
('juanlopez@gmail.com', 'Love Lies'),
('juanlopez@gmail.com', 'My Person'),
('laragarcia@gmail.com', 'Nostalgia'),
('laragarcia@gmail.com', 'Partyyyy'),
('melaniacarrero@gmail.com', 'Study Session');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `playlist`
--

CREATE TABLE `playlist` (
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `playlist`
--

INSERT INTO `playlist` (`nombre`) VALUES
('Acoustic Chill'),
('Another Place'),
('Bad Vibes'),
('Breaking News'),
('Daydreaming'),
('End Future'),
('In the dark'),
('Love Lies'),
('My Person'),
('Nostalgia'),
('Partyyyy'),
('Study Session');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `playlist_cancion`
--

CREATE TABLE `playlist_cancion` (
  `titulo_c` varchar(50) NOT NULL,
  `nombre_p` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `playlist_cancion`
--

INSERT INTO `playlist_cancion` (`titulo_c`, `nombre_p`) VALUES
('Bohemian Rhapsody', 'Acoustic Chill'),
('Bohemian Rhapsody', 'Partyyyy'),
('Bohemian Rhapsody', 'Study Session'),
('Break My Heart', 'End Future'),
('Break My Heart', 'Love Lies'),
('Children of the Grave', 'Another Place'),
('Children of the Grave', 'Breaking News'),
('Como Camaron', 'Bad Vibes'),
('Como Camaron', 'Partyyyy'),
('Desde la Azotea', 'Bad Vibes'),
('El Ratón', 'Acoustic Chill'),
('El Ratón', 'Breaking News'),
('Escúchame Mujer', 'Acoustic Chill'),
('Escúchame Mujer', 'Bad Vibes'),
('Escúchame Mujer', 'Nostalgia'),
('Everybody', 'Acoustic Chill'),
('Everybody', 'Bad Vibes'),
('Everybody', 'Study Session'),
('Fear of the Dark', 'Another Place'),
('Fear of the Dark', 'Breaking News'),
('Fear of the Dark', 'Love Lies'),
('Sufre mamon', 'Another Place'),
('The Lion from the North', 'Acoustic Chill'),
('The Lion from the North', 'Another Place'),
('The Lion from the North', 'Breaking News'),
('The Lion from the North', 'In the dark'),
('Wannabe', 'Another Place'),
('Wannabe', 'Daydreaming'),
('Wannabe', 'My Person'),
('Wannabe', 'Partyyyy');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cancion`
--
ALTER TABLE `cancion`
  ADD PRIMARY KEY (`titulo`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`correo`);

--
-- Indices de la tabla `cliente_playlist`
--
ALTER TABLE `cliente_playlist`
  ADD PRIMARY KEY (`correo_c`,`nombre_p`),
  ADD KEY `nombre_p` (`nombre_p`);

--
-- Indices de la tabla `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`nombre`);

--
-- Indices de la tabla `playlist_cancion`
--
ALTER TABLE `playlist_cancion`
  ADD PRIMARY KEY (`titulo_c`,`nombre_p`),
  ADD KEY `nombre_p` (`nombre_p`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cliente_playlist`
--
ALTER TABLE `cliente_playlist`
  ADD CONSTRAINT `cliente_playlist_ibfk_1` FOREIGN KEY (`correo_c`) REFERENCES `cliente` (`correo`),
  ADD CONSTRAINT `cliente_playlist_ibfk_2` FOREIGN KEY (`nombre_p`) REFERENCES `playlist` (`nombre`);

--
-- Filtros para la tabla `playlist_cancion`
--
ALTER TABLE `playlist_cancion`
  ADD CONSTRAINT `playlist_cancion_ibfk_1` FOREIGN KEY (`titulo_c`) REFERENCES `cancion` (`titulo`),
  ADD CONSTRAINT `playlist_cancion_ibfk_2` FOREIGN KEY (`nombre_p`) REFERENCES `playlist` (`nombre`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
