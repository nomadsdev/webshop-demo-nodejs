-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 06, 2024 at 04:52 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webshop_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `detail` text DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `image`, `name`, `detail`, `token`, `created_at`) VALUES
(2, 'https://cdn.discordapp.com/attachments/1176760844495888384/1270152040655618149/valo.jpg?ex=66b35184&is=66b20004&hm=2f3b2e7d26643fd4b4a0be99353c6faf66b5f414cc324594c85c89d5f4170f30&', 'Valorant', 'valorant', 'M3HXYRUI83', '2024-08-05 22:49:57'),
(3, 'https://cdn.discordapp.com/attachments/1176760844495888384/1270152922151387217/steam.jpg?ex=66b35256&is=66b200d6&hm=b40cc519d7b73280ed5ce584c15f133ea383a0ed139f0850a97a7846ba4c6bee&', 'Steam', 'steam', 'DD4T1GD6G0', '2024-08-05 22:53:41'),
(4, 'https://media.discordapp.net/attachments/1176760844495888384/1270152922558103582/discord.jpg?ex=66b35257&is=66b200d7&hm=a8b2585f3d302ed719380470292e6c26073cabcc756a931c3ef299976f8ec91a&=&format=webp&width=1246&height=701', 'Discord', 'discord', '0AAEO9NK5A', '2024-08-05 22:54:11'),
(5, 'https://cdn.discordapp.com/attachments/1176760844495888384/1270152922893652079/roblox.png?ex=66b35257&is=66b200d7&hm=9f3acbf25147e39a20fa118659dbf42b4ee546000fbae13301544078c30a961b&', 'Roblox', 'roblox', 'MD76C1AFQ0', '2024-08-05 22:54:41');

-- --------------------------------------------------------

--
-- Table structure for table `codes`
--

CREATE TABLE `codes` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `points` int(11) NOT NULL,
  `status` tinyint(4) DEFAULT 0,
  `prefer_token` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `codes`
--

INSERT INTO `codes` (`id`, `code`, `points`, `status`, `prefer_token`, `token`, `created_at`) VALUES
(23, 'de5ca42b363c91f193a41aa5a8c82b67', 200, 1, '7U3UG0G5PP', 'C079QBQSOO', '2024-08-06 01:05:09'),
(24, 'dd9cf7785abd221e2b7abe20444eb38e', 150, 1, '7U3UG0G5PP', 'CF20MCBZZD', '2024-08-06 12:02:52');

-- --------------------------------------------------------

--
-- Table structure for table `config`
--

CREATE TABLE `config` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `fb` varchar(255) DEFAULT NULL,
  `dis` varchar(255) DEFAULT NULL,
  `color` char(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `config`
--

INSERT INTO `config` (`id`, `image`, `name`, `description`, `fb`, `dis`, `color`) VALUES
(1, 'https://static.vecteezy.com/system/resources/thumbnails/012/986/755/small/abstract-circle-logo-icon-free-png.png', 'web shop', 'Web Shop Good', 'facebook.com', 'discord.gg', '#f4a261');

-- --------------------------------------------------------

--
-- Table structure for table `image_slider`
--

CREATE TABLE `image_slider` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `image_slider`
--

INSERT INTO `image_slider` (`id`, `image`, `token`, `created_at`) VALUES
(1, 'https://placehold.co/1280x400/ed9e13/fff', 'ASUV3ZVD8Z', '2024-08-06 12:24:11'),
(2, 'https://placehold.co/1280x400/ed9e13/fff', 'VHBNO45387', '2024-08-06 12:24:21'),
(3, 'https://placehold.co/1280x400/ed9e13/fff', 'L2CVPV6P5H', '2024-08-06 12:24:22');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `prefer_token` varchar(255) NOT NULL,
  `urefer_token` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `srefer_token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `prefer_token`, `urefer_token`, `quantity`, `token`, `created_at`, `srefer_token`) VALUES
(1, '2X04317NOR', '7U3UG0G5PP', 1, 'JLAR4UYFXG', '2024-08-06 14:12:49', 'AFA30QO7LU');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `detail` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` tinyint(4) DEFAULT 0,
  `crefer_token` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `image`, `name`, `detail`, `price`, `status`, `crefer_token`, `token`, `created_at`) VALUES
(1, 'https://media.discordapp.net/attachments/1176760844495888384/1270152923229454438/fandom_skin.webp?ex=66b2a997&is=66b15817&hm=ce1b4b77d576ab19cbf8d57b98e5254b1c82e9fc9ea57497756b23fbab3a149f&=&format=webp&width=1436&height=701', 'Dexerto', 'Dexerto Skin Valorant ID', 299.00, 0, 'M3HXYRUI83', '2X04317NOR', '2024-08-05 23:01:40'),
(3, 'https://cdn.discordapp.com/attachments/1176760844495888384/1270152921333501972/discord_nitro.jpg?ex=66b35256&is=66b200d6&hm=d51000410c8a96961496c11322ae60c95ce74446df459713dc756b0e67ec57f8&', 'Discord Nitro', 'Discord Nitro ID Pass', 159.00, 0, '0AAEO9NK5A', 'JEAZV8UPDY', '2024-08-06 14:50:05');

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `id` int(11) NOT NULL,
  `prefer_token` varchar(255) NOT NULL,
  `data` text NOT NULL,
  `urefer_token` varchar(255) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`id`, `prefer_token`, `data`, `urefer_token`, `status`, `token`, `created_at`) VALUES
(1, '2X04317NOR', 'Username Password', '7U3UG0G5PP', 1, 'AFA30QO7LU', '2024-08-06 10:30:09');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `points` decimal(10,2) DEFAULT 0.00,
  `role` tinyint(4) DEFAULT 0,
  `status` tinyint(4) DEFAULT 0,
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `points`, `role`, `status`, `token`, `created_at`, `updated_at`) VALUES
(1, 'nomadsdeveloper', 'nomads@dev.com', '$2b$10$eb6lyODWH1OppddKjqUaVeJJsD6flZXIyeWYF9clq.IwA6hEuO55G', 51.00, 1, 0, '7U3UG0G5PP', '2024-08-05 21:56:24', '2024-08-06 14:12:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `codes`
--
ALTER TABLE `codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image_slider`
--
ALTER TABLE `image_slider`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `codes`
--
ALTER TABLE `codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `config`
--
ALTER TABLE `config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `image_slider`
--
ALTER TABLE `image_slider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
