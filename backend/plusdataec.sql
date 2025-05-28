-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-05-2025 a las 20:14:33
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
(1, 1, 1, 1000.00, 0.12, 'Fernando Alvarez Jacobo', 'desarrollador2@sistemasicong.com', '0123456789', 'Fernando Alvarez', '0123456789012', '2025-05-28 15:13:57'),
(2, 3, 1, 60000.00, 0.07, 'Fernando Alvarez Jacobo', 'desarrolaldor2@sistemasicong.com', '0123456789', 'Fernando Alvarez Jacobo', '0123456789012', '2025-05-28 16:04:57');

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
(7, 'asd', 'fernando@ittec.mx', '0123456789', 'sdasd'),
(8, 'Fernando Alvarez Jacobo', 'fernandojacobo54@gmail.com', '0123456789', 'Este es un mensaje de prueba.'),
(9, 'Fernando Alvarez Jacobo', 'desarrollador2@sistemasicong.com', '0123456789', 'Este es un mensaje de prueba'),
(10, 'Fernando Alvarez Jacobo', 'desarrolladro2@sistemasicong.com', '0123456789', 'Este es un mensaje de prueba'),
(11, 'Fernando Alvarez Jacobo', 'desarrollador2@sistemasicong.com', '0123456789', 'ESTE ES UN MENSAJE DE PRUEBA'),
(12, 'Fernando Alvarez Jacobo', 'desarrollador2@sistemasicong.com', '0123456789', 'PRUEBA');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
