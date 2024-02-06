-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-02-2024 a las 05:23:51
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `rampa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `id` int(10) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`id`, `Nombre`, `correo`, `password`) VALUES
(1, 'alejandro', 'ale@gmail.com', '123456789');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `callcenter`
--

CREATE TABLE `callcenter` (
  `id` int(10) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` char(8) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `empresa` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `telefono` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `apellido`, `empresa`, `correo`, `password`, `telefono`) VALUES
('00000001', 'Maribel', 'Martinez hernandez', 'CJNG', 'alejavi568@gmail.com', '123456789', 2147483645),
('00000002', 'Maribel', 'Marinez cruz', 'JUMEX', 'alejavi568@gmail.com', '123456789', 2147483647),
('3', 'Daniel', 'Mayor', 'CDS', 'dani@gmail.com', '123456789', 2147483647);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `deudas`
--

CREATE TABLE `deudas` (
  `folio` char(8) NOT NULL,
  `cliente_id` char(8) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `vencimiento` date DEFAULT NULL,
  `adeudo` decimal(14,2) DEFAULT 0.00,
  `adeudo_restante` decimal(14,2) DEFAULT 0.00,
  `referencia` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `deudas`
--

INSERT INTO `deudas` (`folio`, `cliente_id`, `fecha_inicio`, `vencimiento`, `adeudo`, `adeudo_restante`, `referencia`) VALUES
('00000001', '00000001', '2023-04-20', '2025-01-20', 10000.75, 10000.75, NULL),
('00000002', '00000001', '2024-01-29', '2025-04-20', 10000.50, 10000.50, NULL),
('3', '3', '2024-02-05', '2024-02-24', 8000.00, 8000.00, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `id_historial` char(8) NOT NULL,
  `id_deuda` char(8) DEFAULT NULL,
  `fecha_pago` date DEFAULT NULL,
  `monto` decimal(14,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial`
--

INSERT INTO `historial` (`id_historial`, `id_deuda`, `fecha_pago`, `monto`) VALUES
('00000001', '00000001', '2024-01-19', 0.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas`
--

CREATE TABLE `notas` (
  `id_nota` int(11) NOT NULL,
  `folios` char(8) DEFAULT NULL,
  `fecha` date NOT NULL,
  `nota` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notas`
--

INSERT INTO `notas` (`id_nota`, `folios`, `fecha`, `nota`) VALUES
(1, '00000001', '2024-01-28', 'hooalllllaaaaa\r\nholisss a todos\r\nholllsls'),
(2, '00000001', '2024-01-06', 'el pepe jejejeje');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `deudas`
--
ALTER TABLE `deudas`
  ADD PRIMARY KEY (`folio`),
  ADD KEY `cliente_id` (`cliente_id`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`id_historial`),
  ADD KEY `id_deuda` (`id_deuda`);

--
-- Indices de la tabla `notas`
--
ALTER TABLE `notas`
  ADD PRIMARY KEY (`id_nota`),
  ADD KEY `folios` (`folios`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `notas`
--
ALTER TABLE `notas`
  MODIFY `id_nota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `deudas`
--
ALTER TABLE `deudas`
  ADD CONSTRAINT `deudas_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`);

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`id_deuda`) REFERENCES `deudas` (`folio`);

--
-- Filtros para la tabla `notas`
--
ALTER TABLE `notas`
  ADD CONSTRAINT `notas_ibfk_1` FOREIGN KEY (`folios`) REFERENCES `deudas` (`folio`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
