-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Palvelin: 127.0.0.1
-- Luontiaika: 10.10.2014 klo 09:06
-- Palvelimen versio: 5.5.27
-- PHP:n versio: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Tietokanta: `metrics`
--

-- --------------------------------------------------------

--
-- Rakenne taululle `mockup`
--

CREATE TABLE IF NOT EXISTS `mockup` (
  `time` varchar(20) NOT NULL,
  `from` varchar(100) NOT NULL,
  `heading` varchar(200) NOT NULL,
  `body` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Vedos taulusta `mockup`
--

INSERT INTO `mockup` (`time`, `from`, `heading`, `body`) VALUES
('dd', 'dd', 'dd', 'dd'),
('09.10.2014', 'User name', 'Weekly report', 'This'),
('09.10.2014', 'User name', 'Weekly report', 'This'),
('09.10.2014', 'User name', 'Weekly report', 'This'),
('09.10.2014', 'User name', 'Weekly report', 'This'),
('09.10.2014', 'fasfsajfasnkjfa', 'Weekly report', 'asddsdsdssdds');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
