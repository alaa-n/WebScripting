-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Erstellungszeit: 26. Apr 2023 um 20:07
-- Server-Version: 5.7.39
-- PHP-Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `bif2webscriptinguser`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `appointments`
--

CREATE TABLE `appointments` (
  `appointment_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `location` varchar(200) NOT NULL,
  `date` date NOT NULL,
  `voting_expiry_date` date NOT NULL,
  `status` tinyint(1) NOT NULL,
  `description` text NOT NULL,
  `duration` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `appointments`
--

INSERT INTO `appointments` (`appointment_id`, `title`, `location`, `date`, `voting_expiry_date`, `status`, `description`, `duration`) VALUES
(1, 'Zoom Meeting', 'Online', '2023-05-27', '2023-05-25', 1, 'Meeting to discuss new topics.', '40mins'),
(2, 'Brunch', 'Cafe', '2023-04-15', '2023-04-13', 1, 'Let me know when you will be available :)', '1h30'),
(3, 'Birthday Dinner', 'Restaurant', '2023-04-05', '2023-03-31', 0, 'Partyyyyyy', '3h'),
(4, 'VIP Invitation', 'Top Secret', '2023-06-30', '2023-06-01', 1, 'rsvp asap!', '5h'),
(5, 'Study sesh', 'Library', '2023-05-02', '2023-05-01', 1, 'Preparation for finals', '7h'),
(6, 'Trip to Prague', 'Prague', '2023-03-08', '2023-03-01', 0, 'We\'re leaving by cars. Choose when you would like to leave so that you go with the right car.', '10h'),
(7, 'Delete', 'Trash bin', '2023-04-11', '2023-04-10', 0, 'Delete me', '0');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `options`
--

CREATE TABLE `options` (
  `option_id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time_from` time NOT NULL,
  `time_till` time NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `options`
--

INSERT INTO `options` (`option_id`, `appointment_id`, `date`, `time_from`, `time_till`, `status`) VALUES
(1, 1, '2023-05-27', '10:30:00', '11:10:00', 1),
(2, 1, '2023-05-27', '10:00:00', '10:40:00', 1),
(3, 1, '2023-05-27', '13:20:00', '14:00:00', 1),
(4, 2, '2023-04-15', '11:30:00', '13:00:00', 1),
(5, 2, '2023-04-15', '12:30:00', '14:00:00', 1),
(6, 3, '2023-04-05', '18:30:00', '21:00:00', 0),
(7, 3, '2023-04-08', '19:00:00', '22:00:00', 0),
(8, 5, '2023-05-02', '09:00:00', '16:00:00', 1),
(9, 4, '2023-06-30', '18:00:00', '23:00:00', 1),
(10, 5, '2023-05-02', '10:30:00', '17:30:00', 1),
(12, 7, '2023-04-10', '22:03:00', '22:03:00', 0),
(13, 6, '2023-03-08', '08:00:00', '18:00:00', 0),
(14, 6, '2023-03-08', '10:00:00', '20:00:00', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `selection`
--

CREATE TABLE `selection` (
  `selection_id` int(11) NOT NULL,
  `option_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `comment` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `selection`
--

INSERT INTO `selection` (`selection_id`, `option_id`, `username`, `comment`) VALUES
(1, 6, 'Simba', 'Happy Birthday!'),
(2, 7, 'Bueno', NULL),
(3, 7, 'Lala', 'Can be there on the weekend only '),
(11, 4, 'Yummy', 'Can\'t wait to eat :P'),
(12, 4, 'Early Bird', 'Let\'s get the worm'),
(15, 1, 'Kollege Brav', 'Available at any time!'),
(16, 2, 'Kollege Brav', 'Available at any time!'),
(17, 3, 'Kollege Brav', 'Available at any time!'),
(18, 1, 'Herr Frühmann', 'Leaving at noon..'),
(19, 2, 'Herr Frühmann', 'Leaving at noon..'),
(20, 2, 'Mr NoTalking', ''),
(21, 2, 'Frau Termin', 'Will have to leave 10 mins early'),
(22, 3, 'Sleepy', 'I\'m not here in the morning'),
(23, 5, 'Ms Sporty', 'Got yoga class in the morning, won\'t manage before 12:30 :('),
(24, 5, 'Friend', 'Exciiiitinggg'),
(25, 4, 'Another Friend', ''),
(26, 5, 'Another Friend', ''),
(27, 9, 'Anonymous #1', ''),
(28, 9, 'Anonymous #2', ''),
(29, 9, 'Anonymous #3', ''),
(30, 9, 'Anonymous #4', ''),
(31, 8, 'AllDayAllNight', 'gonna be there from 9-17:30 anyways'),
(32, 10, 'AllDayAllNight', 'gonna be there from 9-17:30 anyways'),
(33, 10, 'Procrastinator', 'the later the better'),
(34, 1, 'usserrr', 'coommm');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointment_id`);

--
-- Indizes für die Tabelle `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`option_id`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- Indizes für die Tabelle `selection`
--
ALTER TABLE `selection`
  ADD PRIMARY KEY (`selection_id`),
  ADD KEY `option_id` (`option_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT für Tabelle `options`
--
ALTER TABLE `options`
  MODIFY `option_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT für Tabelle `selection`
--
ALTER TABLE `selection`
  MODIFY `selection_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `options_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`appointment_id`);

--
-- Constraints der Tabelle `selection`
--
ALTER TABLE `selection`
  ADD CONSTRAINT `selection_ibfk_1` FOREIGN KEY (`option_id`) REFERENCES `options` (`option_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
