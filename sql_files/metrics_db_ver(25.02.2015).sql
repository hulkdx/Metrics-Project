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

--
-- Table structure for table `facebook_group`
--

CREATE TABLE IF NOT EXISTS `facebook_group` (
  `group_id` int(20) NOT NULL AUTO_INCREMENT,
  `fgroup_id` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `group_name` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`group_id`),
  UNIQUE KEY `fgroup_id` (`fgroup_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `facebook_member`
--

CREATE TABLE IF NOT EXISTS `facebook_member` (
  `member_id` int(10) NOT NULL AUTO_INCREMENT,
  `member_name` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `fmember_id` varchar(30) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `fmember_id` (`fmember_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `individual_work`
--

CREATE TABLE IF NOT EXISTS `individual_work` (
  `work_id` int(10) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `project_id` int(10) DEFAULT NULL,
  `member_id` int(10) DEFAULT NULL,
  `description` varchar(300) CHARACTER SET latin1 DEFAULT NULL,
  `hours` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `date` TIMESTAMP,
  `issue_id` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`work_id`),
  KEY `project_id` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `link_table`
--

CREATE TABLE IF NOT EXISTS `link_table` (
  `link_id` int(20) NOT NULL AUTO_INCREMENT,
  `group_id` int(20) DEFAULT NULL,
  `member_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`link_id`),
  KEY `group_id` (`group_id`),
  KEY `member_id` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `member`
--

CREATE TABLE IF NOT EXISTS `member` (
  `member_id` int(10) NOT NULL AUTO_INCREMENT,
  `account` varchar(30) CHARACTER SET latin1 DEFAULT NULL,
  `password` varchar(30) CHARACTER SET latin1 DEFAULT NULL,
  `first_name` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `last_name` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `level_of_priviledges` int(4) DEFAULT NULL,
  `email` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `phonenumber` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `metrics`
--

CREATE TABLE IF NOT EXISTS `metrics` (
  `metric_id` int(10) NOT NULL,
  `metric_name` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `metric_descripition` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `value_type` int(10) DEFAULT NULL,
  PRIMARY KEY (`metric_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `metric_values`
--

CREATE TABLE IF NOT EXISTS `metric_values` (
  `value_id` int(10) NOT NULL,
  `project_id` int(10) DEFAULT NULL,
  `metric_id` int(10) DEFAULT NULL,
  `decimal_value` double(10,0) DEFAULT NULL,
  `other_value` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `date` TIMESTAMP,
  PRIMARY KEY (`value_id`),
  KEY `project_id` (`project_id`),
  KEY `metric_id` (`metric_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `participation`
--

CREATE TABLE IF NOT EXISTS `participation` (
  `participation_id` int(10) NOT NULL,
  `project_id` int(10) DEFAULT NULL,
  `member_id` int(10) DEFAULT NULL,
  `role` int(4) DEFAULT NULL,
  `starting_date` TIMESTAMP,
  `ending_date` TIMESTAMP,
  PRIMARY KEY (`participation_id`),
  KEY `project_id` (`project_id`),
  KEY `member_id` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `project`
--

CREATE TABLE IF NOT EXISTS `project` (
  `project_id` int(10) NOT NULL,
  `project_name` varchar(300) CHARACTER SET latin1 DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `status` int(100) DEFAULT NULL,
  `version` int(100) DEFAULT NULL,
  `discription` varchar(500) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `requirement`
--

CREATE TABLE IF NOT EXISTS `requirement` (
  `requirement_id` int(10) NOT NULL,
  `project_id` int(10) DEFAULT NULL,
  `description` varchar(30) DEFAULT NULL,
  `date` TIMESTAMP,
  `requirement_name` varchar(60) NOT NULL,
  `requirement_status` int(10) NOT NULL,
  PRIMARY KEY (`requirement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `weekly_report`
--

CREATE TABLE IF NOT EXISTS `weekly_report` (
  `report_id` int(50) NOT NULL,
  `project_id` int(10) DEFAULT NULL,
  `number_of_week` int(100) DEFAULT NULL,
  `project_phase` varchar(30) CHARACTER SET latin1 DEFAULT NULL,
  `completed_tasks` varchar(200) CHARACTER SET latin1 DEFAULT NULL,
  `task_for_nextweek` varchar(200) CHARACTER SET latin1 DEFAULT NULL,
  `schedule_status` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `next_milestone` varchar(500) CHARACTER SET latin1 DEFAULT NULL,
  `working_hours` varchar(1000) CHARACTER SET latin1 DEFAULT NULL,
  `passed_unit_testcases` int(50) DEFAULT NULL,
  `total_unit_testcases` int(50) DEFAULT NULL,
  `passed_other_testcases` int(50) DEFAULT NULL,
  `total_other_testcases` int(50) DEFAULT NULL,
  `code_revisions` varchar(200) DEFAULT NULL,
  `problems` varchar(500) CHARACTER SET latin1 DEFAULT NULL,
  `changes_in_project_plan` varchar(500) CHARACTER SET latin1 DEFAULT NULL,
  `things_to_mention` varchar(500) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`report_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `weekly_report_manager`
--

CREATE TABLE IF NOT EXISTS `weekly_report_manager` (
  `manager_id` int(50) NOT NULL AUTO_INCREMENT,
  `project_id` int(50) NOT NULL DEFAULT '0',
  `report_id` int(50) NOT NULL DEFAULT '0',
  `manager_name` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `manager_email` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`manager_id`,`project_id`,`report_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- Table structure for table `weekly_report_requirement`
--

CREATE TABLE IF NOT EXISTS `weekly_report_requirement` (
  `project_id` int(50) DEFAULT NULL,
  `report_id` int(50) DEFAULT NULL,
  `requirement_id` int(50) DEFAULT NULL,
  `requirement_name` varchar(60) CHARACTER SET latin1 DEFAULT NULL,
  `requirement_status` int(10) DEFAULT NULL,
  UNIQUE KEY `requirement_id` (`requirement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
