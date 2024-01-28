-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-01-2024 a las 19:51:22
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `eventcanvas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  `all_day` tinyint(1) NOT NULL DEFAULT 0,
  `description` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `color` varchar(7) DEFAULT NULL,
  `state` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `events`
--

INSERT INTO `events` (`id`, `title`, `start_date`, `end_date`, `all_day`, `description`, `location`, `color`, `state`, `createdAt`, `updatedAt`) VALUES
(1, 'Hacienda', '2024-02-06 09:00:00', '2024-02-05 23:00:00', 1, 'Solicitar certificado electrónico', 'Barcelona', '#198754', 1, '2024-01-27 21:57:18', '2024-01-27 21:57:18'),
(2, 'Ayuntamiento', '2024-02-16 09:00:00', '2024-02-15 23:00:00', 1, 'Solicitar padrón', 'Barcelona', '#FFC107', 1, '2024-01-27 21:39:02', '2024-01-27 21:39:02'),
(3, 'Oftalmólogo', '2024-02-19 15:00:00', '2024-02-18 23:00:00', 1, 'Oftalmólogo', 'Barcelona', '#0DCAF0', 1, '2024-01-27 21:39:36', '2024-01-27 21:39:36'),
(4, 'Odontólogo ', '2024-02-22 17:00:00', '2024-02-21 23:00:00', 1, 'Odontólogo ', 'Barcelona', '#0DCAF0', 1, '2024-01-27 21:41:13', '2024-01-27 21:41:13'),
(5, 'Barcelona Activa', '2024-01-31 09:00:00', '2024-01-30 23:00:00', 1, 'Clases de GitHub', 'Barcelona', '#0DCAF0', 1, '2024-01-27 21:42:59', '2024-01-27 21:42:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `markers`
--

CREATE TABLE `markers` (
  `id` int(11) NOT NULL,
  `category` varchar(30) NOT NULL,
  `color` varchar(255) NOT NULL,
  `lng` varchar(30) NOT NULL,
  `lat` varchar(30) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `markers`
--

INSERT INTO `markers` (`id`, `category`, `color`, `lng`, `lat`, `createdAt`, `updatedAt`) VALUES
(1, 'info points', '#0000FF', '-76.57639583587701', '39.36263234745428', '2024-01-26 12:18:45', '2024-01-26 12:18:45'),
(2, 'parkings', '#FF0000', '-76.55056079864593', '39.33435736442303', '2024-01-26 12:18:43', '2024-01-26 12:18:43'),
(3, 'garages', '#008000', '-76.61047061920267', '39.32831592037198', '2024-01-26 12:18:42', '2024-01-26 12:18:42'),
(4, 'info points', '#0000FF', '-76.60986980438334', '39.348429912771394', '2024-01-26 12:18:52', '2024-01-26 12:18:52'),
(5, 'parkings', '#FF0000', '-76.63218578338557', '39.337344698814746', '2024-01-26 13:26:46', '2024-01-26 13:26:46'),
(6, 'info points', '#0000FF', '-76.58420642852828', '39.321078778357446', '2024-01-26 19:58:16', '2024-01-26 19:58:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `colorcode` varchar(10) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sales`
--

INSERT INTO `sales` (`id`, `year`, `amount`, `colorcode`, `state`, `createdAt`, `updatedAt`) VALUES
(1, 2015, '5000.00', 'green', 1, '2024-01-28 16:00:16', '2024-01-28 16:00:16'),
(2, 2016, '6000.00', 'yellow', 1, '2024-01-28 16:00:34', '2024-01-28 16:00:34'),
(3, 2017, '2000.00', 'red', 1, '2024-01-28 16:00:49', '2024-01-28 16:00:49'),
(4, 2018, '6500.00', 'blue', 1, '2024-01-28 16:00:59', '2024-01-28 16:00:59'),
(5, 2019, '4000.00', 'grey', 1, '2024-01-28 16:01:10', '2024-01-28 16:01:10'),
(6, 2020, '7000.00', 'orange', 1, '2024-01-28 16:01:20', '2024-01-28 16:01:20'),
(7, 2021, '17000.00', 'pink', 1, '2024-01-28 16:01:30', '2024-01-28 16:01:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `location` text NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `phone`, `location`, `state`, `createdAt`, `updatedAt`) VALUES
(1, 'Yuli', 'Rivero', 'yulibeth.rivero@gmail.com', '123456789', 'Barcelona', 1, '2024-01-21 19:30:22', '2024-01-21 19:30:22'),
(2, 'Maria', 'Perez', 'maria@gmail.com', '987654321', 'Madrid', 0, '2024-01-23 07:45:02', '2024-01-23 07:45:02'),
(3, 'Manuel', 'Tovar', 'manuel@gmail.com', '654123987', 'Malaga', 0, '2024-01-23 10:35:52', '2024-01-23 10:35:52'),
(4, 'Luis', 'Capel', 'joaquingmail.com', '9876554', 'Girona', 0, '2024-01-23 20:56:03', '2024-01-23 20:56:03'),
(5, 'Raul', 'Perez', 'raul@gmail.com', '987654321', 'Barcelona', 0, '2024-01-23 19:27:56', '2024-01-23 19:27:56'),
(6, 'Luisa', 'Perez', 'luisa@gmail.com', '87654321', 'Girona', 1, '2024-01-23 12:07:50', '2024-01-23 12:07:50'),
(7, 'Manuel', 'Oliva', 'predo@gmail.com', '987654321', 'Malaga', 1, '2024-01-24 12:44:04', '2024-01-24 12:44:04'),
(8, 'Marlene', 'Brito', 'marlene@gmailc.om', '87436464364', 'Barcelona', 1, '2024-01-23 12:14:15', '2024-01-23 12:14:15'),
(9, 'Lisbeth', 'Tovar', 'lisbeth@gmail.com', '987654321', 'Barcelona', 0, '2024-01-23 12:38:30', '2024-01-23 12:38:30'),
(10, 'Jose', 'Perez', 'eduardo@gmail.com', '87649828', 'Barcelona', 0, '2024-01-23 19:38:20', '2024-01-23 19:38:20'),
(11, 'Felipe', 'Ceballos', 'felipe@gmail.com', '546789321', 'Barcelona', 0, '2024-01-25 18:00:30', '2024-01-25 18:00:30'),
(12, 'Yolanda', 'Tovar', 'yolanda@gmail.com', 'tytyty', 'tytytyty', 1, '2024-01-25 18:00:53', '2024-01-25 18:00:53'),
(13, 'eduardo', 'Brito', 'tyytty', 'tytyyt', 'tytyty', 0, '2024-01-24 15:50:31', '2024-01-24 15:50:31'),
(14, 'Edwar', 'segovia', 'dffd', 'fdfdfdfd', 'dffdfd', 1, '2024-01-23 20:39:32', '2024-01-23 20:39:32'),
(15, 'Luis', 'perez', 'luis@gmail.com', '987456321', 'barcelona', 1, '2024-01-23 19:42:20', '2024-01-23 19:42:20'),
(16, 'Arelis', 'Virguez', 'arelis@gmail.com', '987456321', 'Barcelona', 1, '2024-01-23 19:43:01', '2024-01-23 19:43:01'),
(17, 'Luisa', 'Garcia', 'cristina@gmail.com', '987456321', 'Barcelona', 0, '2024-01-24 10:06:15', '2024-01-24 10:06:15'),
(18, 'Anna', 'Ortiz', 'anna@gmail.com', '987456321', 'Barcelona', 1, '2024-01-27 17:21:34', '2024-01-27 17:21:34');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `markers`
--
ALTER TABLE `markers`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `markers`
--
ALTER TABLE `markers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
