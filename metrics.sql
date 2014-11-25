-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- 主机: 127.0.0.1
-- 生成日期: 2014 �?11 �?25 �?12:27
-- 服务器版本: 5.6.11
-- PHP 版本: 5.5.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `metrics`
--
CREATE DATABASE IF NOT EXISTS `metrics` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `metrics`;

-- --------------------------------------------------------

--
-- 表的结构 `individual_work`
--

CREATE TABLE IF NOT EXISTS `individual_work` (
  `work_id` int(10) NOT NULL,
  `project_id` int(10) DEFAULT NULL,
  `member_id` int(10) DEFAULT NULL,
  `description` varchar(30) CHARACTER SET latin1 DEFAULT NULL,
  `hours` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  `issue_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`work_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `member`
--

CREATE TABLE IF NOT EXISTS `member` (
  `member_id` int(10) NOT NULL,
  `account` varchar(30) CHARACTER SET latin1 DEFAULT NULL,
  `password` varchar(30) CHARACTER SET latin1 DEFAULT NULL,
  `first_name` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `last_name` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `level_of_priviledges` int(4) DEFAULT NULL,
  `email` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `phonenumber` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `metrics`
--

CREATE TABLE IF NOT EXISTS `metrics` (
  `metric_id` int(10) NOT NULL,
  `metric_name` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `metric_descripition` varchar(30) CHARACTER SET latin1 DEFAULT NULL,
  `value_type` int(10) DEFAULT NULL,
  PRIMARY KEY (`metric_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `metric_values`
--

CREATE TABLE IF NOT EXISTS `metric_values` (
  `value_id` int(10) NOT NULL,
  `project_id` int(10) DEFAULT NULL,
  `metric_id` int(10) DEFAULT NULL,
  `decimal_value` double(10,0) DEFAULT NULL,
  `other_value` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`value_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `participation`
--

CREATE TABLE IF NOT EXISTS `participation` (
  `participation_id` int(10) NOT NULL,
  `project_id` int(10) DEFAULT NULL,
  `member_id` int(10) DEFAULT NULL,
  `role` int(4) DEFAULT NULL,
  `starting_date` datetime(6) DEFAULT NULL,
  `ending_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`participation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `project`
--

CREATE TABLE IF NOT EXISTS `project` (
  `project_id` varchar(10) CHARACTER SET latin1 NOT NULL,
  `project_name` varchar(30) CHARACTER SET latin1 DEFAULT NULL,
  `created_on` datetime(6) DEFAULT NULL,
  `updated_on` datetime(6) DEFAULT NULL,
  `status` int(10) DEFAULT NULL,
  `version` int(10) DEFAULT NULL,
  `discription` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `project`
--

INSERT INTO `project` (`project_id`, `project_name`, `created_on`, `updated_on`, `status`, `version`, `discription`) VALUES
('18', 'Majava', '2012-09-13 07:27:31.000000', '2012-09-13 07:27:31.000000', 0, 0, ''),
('56', 'Metrics Monitoring Tool', '2014-10-04 07:02:50.000000', '2014-10-04 07:02:50.000000', 0, 0, '');

-- --------------------------------------------------------

--
-- 表的结构 `requirement`
--

CREATE TABLE IF NOT EXISTS `requirement` (
  `requirement_id` int(10) NOT NULL,
  `project_id` int(10) DEFAULT NULL,
  `description` varchar(30) CHARACTER SET latin1 DEFAULT NULL,
  `required_working_hours` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`requirement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `requirement`
--

INSERT INTO `requirement` (`requirement_id`, `project_id`, `description`, `required_working_hours`, `date`) VALUES
(1028, 18, '', '', '2012-09-19 00:00:00.000000'),
(1057, 18, '', '', '2012-09-18 00:00:00.000000'),
(1059, 18, '', '', '2012-09-22 00:00:00.000000'),
(1076, 18, '', '', '2012-09-18 00:00:00.000000'),
(1161, 18, '', '', '2012-10-09 00:00:00.000000'),
(1328, 18, 'sekÃ¤ opettajien nÃ¤kymÃ¤stÃ¤ ', '', '2012-11-19 00:00:00.000000'),
(1405, 18, 'KÃ¤yttÃ¶tapausten kirjaaminen ', '', '2012-12-14 00:00:00.000000'),
(2422, 56, 'The selected data for a projec', '', '2014-10-15 00:00:00.000000'),
(2423, 56, 'A FB-group(s) could be added t', '', '2014-10-15 00:00:00.000000'),
(2429, 56, '', '', '2014-10-20 00:00:00.000000'),
(2434, 56, 'A FB-group(s) could be added t', '', '2014-10-23 00:00:00.000000'),
(2436, 56, 'The selected data for a projec', '', '2014-10-23 00:00:00.000000'),
(2438, 56, 'Make a database to store the d', '', '2014-10-23 00:00:00.000000'),
(2440, 56, 'Create interactive charts by u', '', '2014-10-23 00:00:00.000000'),
(2441, 56, 'Define a format for weekly rep', '', '2014-10-23 00:00:00.000000'),
(2476, 56, '', '', '2014-10-26 00:00:00.000000'),
(2491, 56, '', '', '2014-11-02 00:00:00.000000'),
(2492, 56, '', '', '2014-11-02 00:00:00.000000'),
(2495, 56, '', '', '2014-11-03 00:00:00.000000'),
(2511, 56, '', '', '2014-11-13 00:00:00.000000'),
(2512, 56, '', '', '2014-11-16 00:00:00.000000'),
(2518, 56, '', '', '2014-11-20 00:00:00.000000');

-- --------------------------------------------------------

--
-- 表的结构 `weekly_report`
--

CREATE TABLE IF NOT EXISTS `weekly_report` (
  `report_id` int(10) NOT NULL,
  `project_id` int(10) DEFAULT NULL,
  `number_of_week` int(10) DEFAULT NULL,
  `project_manager` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `project_phase` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `completed_tasks` varchar(30) CHARACTER SET latin1 DEFAULT NULL,
  `task_for_nextweek` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `schedule_status` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `next_milestone` varchar(30) CHARACTER SET latin1 DEFAULT NULL,
  `working_hours` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `requirements` varchar(30) CHARACTER SET latin1 DEFAULT NULL,
  `unit_testcases` int(10) DEFAULT NULL,
  `other_testcases` int(10) DEFAULT NULL,
  `code_revisions` int(10) DEFAULT NULL,
  `problems` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `changes_in_project_plan` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `things_to_mention` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`report_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
