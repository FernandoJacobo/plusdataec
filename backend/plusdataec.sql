-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-05-2025 a las 08:40:03
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `plusdataec`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contribuyentes`
--

CREATE TABLE `contribuyentes` (
  `id` int(11) NOT NULL,
  `idEstatus` int(11) NOT NULL,
  `ruc` varchar(13) NOT NULL,
  `nombreORazonSocial` varchar(250) NOT NULL,
  `correo` varchar(250) NOT NULL,
  `celular` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cotizaciones`
--

CREATE TABLE `cotizaciones` (
  `id` int(11) NOT NULL,
  `idEstatus` int(11) NOT NULL,
  `idTiposImpuesto` int(11) NOT NULL,
  `valorASolicitar` decimal(13,2) NOT NULL,
  `honorarios` decimal(3,2) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `correo` varchar(250) NOT NULL,
  `celular` varchar(10) NOT NULL,
  `nombreBeneficiario` varchar(250) NOT NULL,
  `rucBeneficiario` varchar(13) NOT NULL,
  `ultimaActualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cotizaciones`
--

INSERT INTO `cotizaciones` (`id`, `idEstatus`, `idTiposImpuesto`, `valorASolicitar`, `honorarios`, `nombre`, `correo`, `celular`, `nombreBeneficiario`, `rucBeneficiario`, `ultimaActualizacion`) VALUES
(1, 3, 1, 1000000.00, 0.02, 'Fernando Alvarez Jacobo', 'fernandojacobo54@gmail.com', '0123456789', 'Fernando Alvarez Jacobo', '0123456789012', '2025-05-09 03:05:13'),
(2, 3, 1, 100.00, 0.12, 'Fernando Alvarez Jacobo', 'fernandojacobo54@gmail.com', '0123456789', 'Fernando Alvarez Jacobo', '0123456789012', '2025-05-09 03:05:13'),
(3, 3, 2, 500.00, 0.12, 'Juan Carlos', 'fernandojacobo54@gmail.com', '0123456798', 'Juan Carlos', '0123456798012', '2025-05-09 03:12:11'),
(4, 3, 2, 1000.00, 0.12, 'Fernando', 'fernandoajcobo54@gmail.com', '0123456789', 'Fernando', '0123456789012', '2025-05-09 03:27:37'),
(5, 3, 2, 1000.00, 0.12, 'Fernando', 'fernandoalvarezjacobo@hotmail.com', '0123456789', 'Fernando', '0123456789012', '2025-05-09 03:28:08'),
(6, 3, 2, 12312.00, 0.12, 'Fernando', 'fernando@ittec.mx', '0123456789', '0123456789', '0123456789145', '2025-05-09 03:53:06'),
(7, 3, 2, 12312.00, 0.12, 'Fernando', 'fernando@ittec.mx', '0123456789', '0123456789', '0123456789145', '2025-05-09 04:33:56'),
(8, 3, 2, 12312.00, 0.12, 'Fernando', 'fernando@ittec.mx', '0123456789', '0123456789', '0123456789145', '2025-05-09 04:40:00'),
(9, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 04:59:15'),
(10, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:01:05'),
(11, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:01:39'),
(12, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:02:22'),
(13, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:03:04'),
(14, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:04:36'),
(15, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:10:09'),
(16, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:16:13'),
(17, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:16:39'),
(18, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:18:53'),
(19, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:19:48'),
(20, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:20:00'),
(21, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:20:12'),
(22, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:21:02'),
(23, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:21:39'),
(24, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:22:00'),
(25, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:32:38'),
(26, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:32:44'),
(27, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:32:59'),
(28, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:33:15'),
(29, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:33:39'),
(30, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:34:17'),
(31, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:34:39'),
(32, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:34:51'),
(33, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:35:08'),
(34, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:35:17'),
(35, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:35:44'),
(36, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:36:02'),
(37, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:36:42'),
(38, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:36:54'),
(39, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:39:33'),
(40, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:39:52'),
(41, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:40:01'),
(42, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:41:11'),
(43, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:41:52'),
(44, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:42:03'),
(45, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:44:27'),
(46, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:45:04'),
(47, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:46:49'),
(48, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:46:56'),
(49, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:47:13'),
(50, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:47:30'),
(51, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:48:31'),
(52, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:49:21'),
(53, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:49:55'),
(54, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:50:07'),
(55, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:51:52'),
(56, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:52:12'),
(57, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:52:20'),
(58, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:53:13'),
(59, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:54:16'),
(60, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:55:01'),
(61, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:56:10'),
(62, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:56:56'),
(63, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:58:02'),
(64, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 05:59:13'),
(65, 3, 2, 500.00, 0.12, 'FER', 'fernando@ittec.mx', '0123456789', 'fer', '0123456789012', '2025-05-09 06:00:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estatus`
--

CREATE TABLE `estatus` (
  `id` int(11) NOT NULL,
  `estatus` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estatus`
--

INSERT INTO `estatus` (`id`, `estatus`) VALUES
(1, 'Borrador'),
(2, 'Pendiente'),
(3, 'Aceptado'),
(4, 'Eliminado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `honorarios`
--

CREATE TABLE `honorarios` (
  `id` int(11) NOT NULL,
  `rango` int(11) NOT NULL,
  `desde` decimal(13,2) NOT NULL,
  `hasta` decimal(13,2) NOT NULL,
  `honorario` decimal(13,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `honorarios`
--

INSERT INTO `honorarios` (`id`, `rango`, `desde`, `hasta`, `honorario`) VALUES
(1, 2, 0.00, 1000.00, 0.12),
(2, 2, 10000.00, 20000.00, 0.12),
(3, 3, 20001.00, 30000.00, 0.10),
(4, 4, 30001.00, 50000.00, 0.08),
(5, 6, 50001.00, 80000.00, 0.07),
(6, 7, 80001.00, 150000.00, 0.06),
(7, 8, 150001.00, 300000.00, 0.05),
(8, 9, 300001.00, 500000.00, 0.04),
(9, 10, 500001.00, 800000.00, 0.03),
(10, 10, 800001.00, 99999999999.00, 0.02);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `correo` varchar(250) NOT NULL,
  `celular` varchar(10) NOT NULL,
  `mensaje` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`id`, `nombre`, `correo`, `celular`, `mensaje`) VALUES
(1, 'Fernando', 'fernandojacobo54@gmail.com', '0123456789', 'Test'),
(2, 'Fernando', 'fernandoalvarezjacobo54@gmail.com', '0123456798', 'test'),
(3, 'fer', 'fernando@ittec.mx', '0123456798', 'test'),
(4, 'Fernando', 'fernando@ittex.mx', '0123456789', 'test'),
(5, 'Fernando', 'fernando@ittec.mx', '0123456789', 'fer'),
(6, 'fer', 'fernando@ittec.mx', '0123456798', 'sasd'),
(7, 'asd', 'fernando@ittec.mx', '0123456789', 'sdasd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiposimpuesto`
--

CREATE TABLE `tiposimpuesto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tiposimpuesto`
--

INSERT INTO `tiposimpuesto` (`id`, `nombre`) VALUES
(1, 'Retenciones de Impuesto a la Renta'),
(2, 'Retenciones de IVA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `idEstatus` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `celular` varchar(10) NOT NULL,
  `correo` varchar(250) NOT NULL,
  `contrasena` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contribuyentes`
--
ALTER TABLE `contribuyentes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cotizaciones`
--
ALTER TABLE `cotizaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estatus`
--
ALTER TABLE `estatus`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `honorarios`
--
ALTER TABLE `honorarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tiposimpuesto`
--
ALTER TABLE `tiposimpuesto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contribuyentes`
--
ALTER TABLE `contribuyentes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cotizaciones`
--
ALTER TABLE `cotizaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de la tabla `estatus`
--
ALTER TABLE `estatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `honorarios`
--
ALTER TABLE `honorarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tiposimpuesto`
--
ALTER TABLE `tiposimpuesto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
