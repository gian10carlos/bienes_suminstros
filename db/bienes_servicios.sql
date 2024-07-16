-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-07-2024 a las 22:03:33
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bienes_servicios`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area`
--

CREATE TABLE `area` (
  `id_area` int(11) NOT NULL,
  `dependencia` int(11) DEFAULT NULL,
  `nombre` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `area`
--

INSERT INTO `area` (`id_area`, `dependencia`, `nombre`) VALUES
(1, NULL, 'Administración'),
(2, 1, 'Logística'),
(3, 1, 'Almacén'),
(4, 1, 'Patrimonio'),
(5, 1, 'Áreas usuarias');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bien`
--

CREATE TABLE `bien` (
  `id_bien` char(18) NOT NULL,
  `codigo_patrimonial` char(18) DEFAULT NULL,
  `id_item` char(10) DEFAULT NULL,
  `DNI` char(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bien`
--

INSERT INTO `bien` (`id_bien`, `codigo_patrimonial`, `id_item`, `DNI`) VALUES
('B001', 'CP001', 'I001', '12345678'),
('B002', 'CP002', 'I002', '87654321');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargo`
--

CREATE TABLE `cargo` (
  `id_cargo` int(11) NOT NULL,
  `descripcion` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cargo`
--

INSERT INTO `cargo` (`id_cargo`, `descripcion`) VALUES
(1, 'Gerente'),
(2, 'Asistente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `descripcion`) VALUES
(1, 'Electrónica'),
(2, 'Oficina'),
(3, 'Mantenimiento');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contrato`
--

CREATE TABLE `contrato` (
  `numero_contrato` char(10) NOT NULL,
  `fecha_contrato` datetime DEFAULT NULL,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_termino` datetime DEFAULT NULL,
  `sueldo_neto` float DEFAULT NULL,
  `DNI` char(8) DEFAULT NULL,
  `id_area` int(11) DEFAULT NULL,
  `id_cargo` int(11) DEFAULT NULL,
  `jefe_area` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contrato`
--

INSERT INTO `contrato` (`numero_contrato`, `fecha_contrato`, `fecha_inicio`, `fecha_termino`, `sueldo_neto`, `DNI`, `id_area`, `id_cargo`, `jefe_area`) VALUES
('C001', '2023-01-01 00:00:00', '2023-01-01 00:00:00', '2023-12-31 00:00:00', 3000, '12345678', 1, 1, NULL),
('C002', '2023-02-01 00:00:00', '2023-02-01 00:00:00', '2023-12-31 00:00:00', 1500, '87654321', 2, 1, 1),
('C003', '2024-07-16 14:47:52', '2024-07-17 14:47:52', '2024-11-21 14:47:52', 1200, '12345677', 3, 1, NULL),
('C004', '2024-07-16 14:49:06', '2024-07-17 14:49:06', '2024-11-30 14:49:06', 1430, '12345666', 5, 2, NULL),
('C005', '2024-07-16 14:50:51', '2024-07-17 14:50:51', '2024-10-31 14:50:51', 1500, '12345555', 5, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `item`
--

CREATE TABLE `item` (
  `id_item` char(10) NOT NULL,
  `descripcion_item` varchar(80) DEFAULT NULL,
  `stock` float DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `tipo` char(1) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `id_unidad_medida` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `item`
--

INSERT INTO `item` (`id_item`, `descripcion_item`, `stock`, `precio`, `tipo`, `id_categoria`, `id_unidad_medida`) VALUES
('I001', 'Laptop', 50, 1500, 'B', 1, 1),
('I002', 'Silla de Oficina', 100, 75, 'B', 2, 1),
('I003', 'Pintura', 200, 20, 'B', 3, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metas`
--

CREATE TABLE `metas` (
  `id_meta` int(11) NOT NULL,
  `descripcion_meta` varchar(80) DEFAULT NULL,
  `monto_asignado` float DEFAULT NULL,
  `anio_fiscal` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `metas`
--

INSERT INTO `metas` (`id_meta`, `descripcion_meta`, `monto_asignado`, `anio_fiscal`) VALUES
(1, 'Aumento de stock', 100000, 2024),
(2, 'Renovación de equipos', 50000, 2024);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden_compra`
--

CREATE TABLE `orden_compra` (
  `numero_orden_compra` char(10) NOT NULL,
  `fecha_orden_compra` datetime DEFAULT NULL,
  `fecha_entrega` datetime DEFAULT NULL,
  `RUC` char(11) DEFAULT NULL,
  `autoriza_administracion` int(11) DEFAULT NULL,
  `fecha_entregado` char(18) DEFAULT NULL,
  `numero_facura_entrega` char(18) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orden_compra`
--

INSERT INTO `orden_compra` (`numero_orden_compra`, `fecha_orden_compra`, `fecha_entrega`, `RUC`, `autoriza_administracion`, `fecha_entregado`, `numero_facura_entrega`) VALUES
('OC001', '2024-02-01 00:00:00', '2024-02-10 00:00:00', '20123456789', 1, '2024-02-11', 'F001'),
('OC002', '2024-07-15 22:46:47', '2024-07-31 00:00:00', '10865294620', 1, '2024-07-16 14:31:0', 'F003'),
('OC003', '2024-07-15 22:47:10', '2024-07-25 00:00:00', '10865294620', 1, '2024-07-16 14:29:1', 'F002');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden_compra_detalle`
--

CREATE TABLE `orden_compra_detalle` (
  `unidad` char(18) DEFAULT NULL,
  `cantidad_solicitado` char(18) DEFAULT NULL,
  `precio` char(18) DEFAULT NULL,
  `numero_orden_compra` char(10) NOT NULL,
  `id_item` char(10) NOT NULL,
  `cantidad_entregado` char(18) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orden_compra_detalle`
--

INSERT INTO `orden_compra_detalle` (`unidad`, `cantidad_solicitado`, `precio`, `numero_orden_compra`, `id_item`, `cantidad_entregado`) VALUES
('UND', '50', '1500', 'OC001', 'I001', '50'),
('UND', '7', '1500', 'OC002', 'I001', '12'),
('L', '8', '20', 'OC002', 'I003', '5'),
('UND', '5', '75', 'OC003', 'I002', '3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `RUC` char(11) NOT NULL,
  `nombre_proveedor` varchar(80) DEFAULT NULL,
  `direccion` varchar(80) DEFAULT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `correo` varchar(30) DEFAULT NULL,
  `representante_legal` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`RUC`, `nombre_proveedor`, `direccion`, `telefono`, `correo`, `representante_legal`) VALUES
('10137294290', 'George', 'Av. S/N 812', '987650028', 'lug@gmail.com', 'Luis Gonzales'),
('10865294620', 'Tomachito', 'Av. Laureles', '987654321', 'tom@gmail.com', 'Juan Perez'),
('20123456789', 'Jack', 'Calle Falsa 123', '777777777', 'contacto@proveedor1.com', 'Carlos Ruiz');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud`
--

CREATE TABLE `solicitud` (
  `numero_solicitud` char(18) NOT NULL,
  `responsable` char(8) DEFAULT NULL,
  `fecha_solicitud` char(18) DEFAULT NULL,
  `id_meta` int(11) DEFAULT NULL,
  `autorizacion_jefe_area` int(11) DEFAULT NULL,
  `autorizacion_administracion` int(11) DEFAULT NULL,
  `numero_pecosa` char(18) DEFAULT NULL,
  `fecha_salida` char(18) DEFAULT NULL,
  `fecha_entrega` char(18) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `solicitud`
--

INSERT INTO `solicitud` (`numero_solicitud`, `responsable`, `fecha_solicitud`, `id_meta`, `autorizacion_jefe_area`, `autorizacion_administracion`, `numero_pecosa`, `fecha_salida`, `fecha_entrega`) VALUES
('S001', '12345678', '2024-01-01', 1, 1, 1, 'P001', '2024-01-10', '2024-01-15'),
('S002', '12345678', '2024-07-22', 2, 1, 1, 'P004', NULL, '2024-07-16 01:01:2'),
('S003', '12345678', '2024-07-15', 1, 1, 1, 'P002', NULL, '2024-07-16 00:57:2'),
('S004', '12345678', '2024-07-24', 2, 1, 1, 'P003', '2024-07-15 00:24:5', '2024-07-16 00:58:1'),
('S005', '12345678', '2024-07-17', 2, 1, 1, NULL, '2024-07-15 00:25:4', NULL),
('S006', '12345678', '2024-07-30', 2, 1, 1, 'P006', '2024-07-15 22:12:0', '2024-07-16 12:31:0'),
('S007', '12345678', '2024-07-23', 2, NULL, NULL, NULL, NULL, NULL),
('S008', '12345678', '2024-07-24', 1, NULL, NULL, NULL, NULL, NULL),
('S009', '12345678', '2024-07-29', 1, NULL, NULL, NULL, NULL, NULL),
('S010', '12345678', '2024-07-25', 2, 1, NULL, NULL, NULL, NULL),
('S011', '12345678', '2024-07-31', 2, 1, 1, 'P005', '2024-07-15 22:50:5', '2024-07-16 12:29:0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud_detalle`
--

CREATE TABLE `solicitud_detalle` (
  `unidad` char(18) DEFAULT NULL,
  `cantidad_solicitado` char(18) DEFAULT NULL,
  `numero_solicitud` char(18) NOT NULL,
  `id_item` char(10) NOT NULL,
  `precio` char(18) DEFAULT NULL,
  `cantidad_entregado` char(18) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `solicitud_detalle`
--

INSERT INTO `solicitud_detalle` (`unidad`, `cantidad_solicitado`, `numero_solicitud`, `id_item`, `precio`, `cantidad_entregado`) VALUES
('UND', '10', 'S001', 'I002', '75', '10'),
('UND', '12', 'S002', 'I002', '75', NULL),
('L', '4', 'S002', 'I003', '20', '3'),
('UND', '7', 'S003', 'I001', '1500', NULL),
('L', '8', 'S003', 'I003', '20', '8'),
('UND', '5', 'S004', 'I001', '1500', NULL),
('L', '5', 'S004', 'I003', '20', '1'),
('UND', '5', 'S005', 'I002', '75', NULL),
('UND', '43', 'S006', 'I001', '1500', '5'),
('L', '4', 'S006', 'I003', '20', NULL),
('UND', '5', 'S007', 'I002', '75', NULL),
('UND', '1', 'S008', 'I001', '1500', NULL),
('UND', '1', 'S008', 'I002', '75', NULL),
('UND', '5', 'S009', 'I002', '75', NULL),
('UND', '4', 'S010', 'I001', '1500', NULL),
('UND', '2', 'S010', 'I002', '75', NULL),
('L', '7', 'S010', 'I003', '20', NULL),
('UND', '12', 'S011', 'I002', '75', '11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajador`
--

CREATE TABLE `trabajador` (
  `DNI` char(8) NOT NULL,
  `apellidos` varchar(50) DEFAULT NULL,
  `nombres` varchar(50) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `correo` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `trabajador`
--

INSERT INTO `trabajador` (`DNI`, `apellidos`, `nombres`, `direccion`, `telefono`, `correo`) VALUES
('12344444', 'Brito', 'Alan', 'Av. Manzanita', '90909090', 'Alan@gmail.com'),
('12345555', 'Neta', 'Mario', 'Av. Fresita', '90909090', 'Mario@gmail.com'),
('12345666', 'Nietales', 'Jorge', 'Av. Arbolito', '90909090', 'Jorge@gmail.com'),
('12345677', 'Fierro', 'Debora', 'Av. Limoncito', '90909090', 'deboraF@gmail.com'),
('12345678', 'Perez', 'Juan', 'Av. Lima 123', '999999999', 'jperez@mail.com'),
('87654321', 'Gomez', 'Ana', 'Av. Arequipa 456', '888888888', 'agomez@mail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidad_medida`
--

CREATE TABLE `unidad_medida` (
  `id_unidad_medida` int(11) NOT NULL,
  `descripcion` varchar(80) DEFAULT NULL,
  `abreviatura` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `unidad_medida`
--

INSERT INTO `unidad_medida` (`id_unidad_medida`, `descripcion`, `abreviatura`) VALUES
(1, 'Unidad', 'UND'),
(2, 'Kilogramo', 'KG'),
(3, 'Litro', 'L');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`id_area`),
  ADD KEY `id_area_dependencia` (`dependencia`);

--
-- Indices de la tabla `bien`
--
ALTER TABLE `bien`
  ADD PRIMARY KEY (`id_bien`),
  ADD KEY `R_16` (`id_item`),
  ADD KEY `R_17` (`DNI`);

--
-- Indices de la tabla `cargo`
--
ALTER TABLE `cargo`
  ADD PRIMARY KEY (`id_cargo`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `contrato`
--
ALTER TABLE `contrato`
  ADD PRIMARY KEY (`numero_contrato`),
  ADD KEY `R_3` (`DNI`),
  ADD KEY `R_4` (`id_area`),
  ADD KEY `R_5` (`id_cargo`);

--
-- Indices de la tabla `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id_item`),
  ADD KEY `R_6` (`id_categoria`),
  ADD KEY `R_18` (`id_unidad_medida`);

--
-- Indices de la tabla `metas`
--
ALTER TABLE `metas`
  ADD PRIMARY KEY (`id_meta`);

--
-- Indices de la tabla `orden_compra`
--
ALTER TABLE `orden_compra`
  ADD PRIMARY KEY (`numero_orden_compra`),
  ADD KEY `R_15` (`RUC`);

--
-- Indices de la tabla `orden_compra_detalle`
--
ALTER TABLE `orden_compra_detalle`
  ADD PRIMARY KEY (`numero_orden_compra`,`id_item`),
  ADD KEY `R_14` (`id_item`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`RUC`);

--
-- Indices de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD PRIMARY KEY (`numero_solicitud`),
  ADD KEY `R_7` (`responsable`),
  ADD KEY `R_8` (`id_meta`);

--
-- Indices de la tabla `solicitud_detalle`
--
ALTER TABLE `solicitud_detalle`
  ADD PRIMARY KEY (`numero_solicitud`,`id_item`),
  ADD KEY `R_12` (`id_item`);

--
-- Indices de la tabla `trabajador`
--
ALTER TABLE `trabajador`
  ADD PRIMARY KEY (`DNI`);

--
-- Indices de la tabla `unidad_medida`
--
ALTER TABLE `unidad_medida`
  ADD PRIMARY KEY (`id_unidad_medida`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `area`
--
ALTER TABLE `area`
  ADD CONSTRAINT `id_area_dependencia` FOREIGN KEY (`dependencia`) REFERENCES `area` (`id_area`);

--
-- Filtros para la tabla `bien`
--
ALTER TABLE `bien`
  ADD CONSTRAINT `R_16` FOREIGN KEY (`id_item`) REFERENCES `item` (`id_item`),
  ADD CONSTRAINT `R_17` FOREIGN KEY (`DNI`) REFERENCES `trabajador` (`DNI`);

--
-- Filtros para la tabla `contrato`
--
ALTER TABLE `contrato`
  ADD CONSTRAINT `R_3` FOREIGN KEY (`DNI`) REFERENCES `trabajador` (`DNI`),
  ADD CONSTRAINT `R_4` FOREIGN KEY (`id_area`) REFERENCES `area` (`id_area`),
  ADD CONSTRAINT `R_5` FOREIGN KEY (`id_cargo`) REFERENCES `cargo` (`id_cargo`);

--
-- Filtros para la tabla `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `R_18` FOREIGN KEY (`id_unidad_medida`) REFERENCES `unidad_medida` (`id_unidad_medida`),
  ADD CONSTRAINT `R_6` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`);

--
-- Filtros para la tabla `orden_compra`
--
ALTER TABLE `orden_compra`
  ADD CONSTRAINT `R_15` FOREIGN KEY (`RUC`) REFERENCES `proveedor` (`RUC`);

--
-- Filtros para la tabla `orden_compra_detalle`
--
ALTER TABLE `orden_compra_detalle`
  ADD CONSTRAINT `R_13` FOREIGN KEY (`numero_orden_compra`) REFERENCES `orden_compra` (`numero_orden_compra`),
  ADD CONSTRAINT `R_14` FOREIGN KEY (`id_item`) REFERENCES `item` (`id_item`);

--
-- Filtros para la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD CONSTRAINT `R_7` FOREIGN KEY (`responsable`) REFERENCES `trabajador` (`DNI`),
  ADD CONSTRAINT `R_8` FOREIGN KEY (`id_meta`) REFERENCES `metas` (`id_meta`);

--
-- Filtros para la tabla `solicitud_detalle`
--
ALTER TABLE `solicitud_detalle`
  ADD CONSTRAINT `R_11` FOREIGN KEY (`numero_solicitud`) REFERENCES `solicitud` (`numero_solicitud`),
  ADD CONSTRAINT `R_12` FOREIGN KEY (`id_item`) REFERENCES `item` (`id_item`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
