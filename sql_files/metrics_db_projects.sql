-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 17, 2015 at 12:09 PM
-- Server version: 5.6.11
-- PHP Version: 5.5.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `metrics`
--
CREATE DATABASE IF NOT EXISTS `metrics` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `metrics`;

-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `project` (
  `project_id` int(10) NOT NULL,
  `project_name` varchar(300) CHARACTER SET latin1 DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `status` int(100) DEFAULT NULL,
  `version` int(100) DEFAULT NULL,
  `discription` varchar(500) CHARACTER SET latin1 DEFAULT NULL,
  `publicity` int(11) NOT NULL,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
