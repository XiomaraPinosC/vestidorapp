-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-09-2021 a las 11:08:50
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prendasdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prendas`
--

CREATE TABLE `prendas` (
  `id_prenda` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `id_genero` int(11) NOT NULL,
  `id_talla` int(11) NOT NULL,
  `id_marca` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `tags` text NOT NULL,
  `color` varchar(10) DEFAULT NULL,
  `precio` double NOT NULL,
  `likes` int(11) DEFAULT 0,
  `stock` int(11) DEFAULT 0,
  `foto` text DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `prendas`
--

INSERT INTO `prendas` (`id_prenda`, `id_categoria`, `id_genero`, `id_talla`, `id_marca`, `nombre`, `tags`, `color`, `precio`, `likes`, `stock`, `foto`, `direccion`, `fecha_creacion`) VALUES
(1, 1, 2, 1, 2, 'camisa blanca logo', 'camisa logotipo blanco blanca', 'blanca', 12, 8, 5, NULL, NULL, '2021-07-22 04:44:58'),
(2, 1, 1, 1, 1, 'Camiseta Blanca', 'deportiva sport camisa blaco blanca', 'blanca', 15, 0, 0, NULL, NULL, '2021-08-20 20:35:28'),
(3, 1, 1, 4, 1, 'Camiseta Negra', 'deportiva sport camisa', 'negra', 18, 0, 0, NULL, NULL, '2021-08-20 20:35:28'),
(4, 1, 1, 4, 1, 'Camiseta Roja', 'deportiva sport camisa rojo roja', 'roja', 15, 9, 0, NULL, NULL, '2021-08-20 20:37:50'),
(5, 1, 2, 2, 1, 'Vestido 2', 'vestido falda ', 'verde', 35, 0, 0, NULL, NULL, '2021-08-20 20:37:50'),
(6, 1, 2, 1, 1, 'Vestido Largo', 'vestido falda', NULL, 40, 0, 0, NULL, NULL, '2021-08-20 20:37:50'),
(7, 1, 2, 3, 1, 'Dividi', 'camisa sudadera deportiva sport', NULL, 5, 0, 0, NULL, NULL, '2021-08-20 20:37:50'),
(8, 1, 2, 2, 2, 'Vestido Coloreado', 'vestido verde falda', 'Varios', 85, 0, 5, NULL, NULL, '2021-09-13 06:53:50'),
(9, 1, 1, 2, 2, 'Camisa Ajustada', 'Camiseta al cuerpo ajuste ajustada', 'Cafe', 15, 0, 7, NULL, NULL, '2021-09-13 07:05:34'),
(10, 1, 2, 4, 0, 'Vestido Floreado', 'vestido flores floreado', NULL, 60, 0, 5, NULL, NULL, '2021-09-13 08:06:09'),
(11, 1, 2, 5, 0, 'Vestido Turquesa', 'Vestido Turquesa tiras', NULL, 100, 0, 1, NULL, NULL, '2021-09-13 08:06:09'),
(12, 1, 2, 2, 1, 'Gala Chino', 'vestido noche gala largo negro', 'Varios', 150, 0, 1, NULL, NULL, '2021-09-13 08:49:42');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `prendas`
--
ALTER TABLE `prendas`
  ADD PRIMARY KEY (`id_prenda`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `prendas`
--
ALTER TABLE `prendas`
  MODIFY `id_prenda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
