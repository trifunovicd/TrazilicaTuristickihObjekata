-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 26, 2019 at 12:06 AM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mojelokacije`
--

-- --------------------------------------------------------

--
-- Table structure for table `komentari`
--

DROP TABLE IF EXISTS `komentari`;
CREATE TABLE IF NOT EXISTS `komentari` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_korisnika` int(11) NOT NULL,
  `id_lokacije` varchar(100) NOT NULL,
  `naziv` varchar(100) NOT NULL,
  `mjesto` varchar(100) NOT NULL,
  `ocjena` decimal(2,1) DEFAULT NULL,
  `lat` float(18,15) NOT NULL,
  `lng` float(18,15) NOT NULL,
  `komentar` varchar(500) NOT NULL,
  `vrijeme` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk5` (`id_korisnika`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `komentari`
--

INSERT INTO `komentari` (`id`, `id_korisnika`, `id_lokacije`, `naziv`, `mjesto`, `ocjena`, `lat`, `lng`, `komentar`, `vrijeme`) VALUES
(20, 2, 'ChIJ896453yKZ0cRUbpyMjIv2xE', 'Bistro Pizzeria Ivona', 'Ulica Vladimira Nazora 45, Slatina', '4.5', 45.706260681152344, 17.703260421752930, 'Super hrana, sve 5!', '2019-08-19 13:18:02'),
(21, 2, 'ChIJ896453yKZ0cRUbpyMjIv2xE', 'Bistro Pizzeria Ivona', 'Ulica Vladimira Nazora 45, Slatina', '4.5', 45.706260681152344, 17.703260421752930, 'Dobra atmosfera', '2019-08-19 13:18:20'),
(27, 2, 'ChIJaQixPXqKZ0cR7WrDsDMBKis', 'Restoran Stari podrum', 'Ulica kralja Zvonimira 6, Slatina', '4.3', 45.700672149658200, 17.703592300415040, 'Odlična hrana, brza usluga. Topla preporuka svima koji se nađete u Slatini.', '2019-09-10 16:24:48'),
(28, 5, 'ChIJaQixPXqKZ0cR7WrDsDMBKis', 'Restoran Stari podrum', 'Ulica kralja Zvonimira 6, Slatina', '4.3', 45.700672149658200, 17.703592300415040, 'Hrana odlična. Brza posluga, ljubazni domaćini. Savršeno sve. Tople preporuke', '2019-09-11 19:20:31'),
(29, 5, 'ChIJ896453yKZ0cRUbpyMjIv2xE', 'Bistro Pizzeria Ivona', 'Ulica Vladimira Nazora 45, Slatina', '4.5', 45.706260681152344, 17.703260421752930, 'Nista posebno.', '2019-09-11 19:21:33'),
(30, 27, 'ChIJ0zOBaHuKZ0cRbAw-pMBNgp8', 'Sandwich bar \'Pajo\'', 'Ulica Vladimira Nazora 18, Slatina', '4.4', 45.703941345214844, 17.701871871948242, 'Ukusna hrana, brza dostava', '2019-09-11 19:23:39'),
(31, 27, 'ChIJ896453yKZ0cRUbpyMjIv2xE', 'Bistro Pizzeria Ivona', 'Ulica Vladimira Nazora 45, Slatina', '4.5', 45.706260681152344, 17.703260421752930, 'Velik restoran s osiguranim parkingom iza lokala. Osoblje jako ljubazno i nasmjeseno. Bili smo na gablecu, jako fina teletina ispod peke i pohani som. Fine palacinke. Sve u svemu hranu dobili jako brzo, bilo sve ukusno i fino! Moja preporuka za gablec ako ste u Slatini', '2019-09-11 19:25:11'),
(32, 27, 'ChIJaQixPXqKZ0cR7WrDsDMBKis', 'Restoran Stari podrum', 'Ulica kralja Zvonimira 6, Slatina', '4.3', 45.700672149658200, 17.703592300415040, 'Ok', '2019-09-11 19:31:18'),
(33, 2, 'ChIJkz8M2XmKZ0cRMEfAaV5t8Fs', 'Lidl', 'Ulica kralja Zvonimira 14, Slatina', '4.4', 45.699542999267580, 17.706899642944336, 'Bogata ponuda svježeg mesa, voća i povrća. Pristupačne cijene. Ljubazno osoblje.', '2019-09-11 19:33:19');

-- --------------------------------------------------------

--
-- Table structure for table `korisnici`
--

DROP TABLE IF EXISTS `korisnici`;
CREATE TABLE IF NOT EXISTS `korisnici` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ime` varchar(100) NOT NULL,
  `prezime` varchar(100) NOT NULL,
  `korisnicko_ime` varchar(100) NOT NULL,
  `lozinka` varchar(100) NOT NULL,
  `putanja_slike` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `korisnici`
--

INSERT INTO `korisnici` (`id`, `ime`, `prezime`, `korisnicko_ime`, `lozinka`, `putanja_slike`) VALUES
(2, 'Pero', 'Perić', 'pero', '123', 'img/korisnici/pero.jpg'),
(5, 'Marko', 'Marković', 'marko', '123', 'img/korisnici/marko.jpg'),
(26, 'Ivan', 'Horvat', 'ivan', '123', 'img/korisnici/ivan.jpg'),
(27, 'Ivo', 'Ivić', 'ivo', '123', 'img/korisnici/ivo.jpg'),
(28, 'Josip', 'Marić', 'josip', '123', 'img/korisnici/josip.jpg'),
(30, 'Nikola', 'Matić', 'nikola', '123', 'img/korisnici/nikola.jpg'),
(31, 'Petar', 'Kovač', 'petar', '123', 'img/korisnici/petar.jpg'),
(32, 'Luka', 'Grgić', 'luka', '123', 'img/korisnici/luka.jpg'),
(33, 'Damir', 'Božić', 'damir', '123', 'img/korisnici/damir.jpg'),
(34, 'Goran', 'Šarić', 'goran', '123', 'img/korisnici/goran.jpg'),
(35, 'Zoran', 'Lovrić', 'zoran', '123', 'img/korisnici/zoran.jpg'),
(36, 'Franjo', 'Zebec', 'franjo', '123', 'img/korisnici/franjo.jpg'),
(37, 'Mario', 'Pavić', 'mario', '123', 'img/korisnici/mario.jpg'),
(39, 'Igor', 'Jukić', 'igor', '123', 'img/korisnici/igor.jpg'),
(40, 'Slavko', 'Novak', 'slavko', '123', 'img/korisnici/slavko.jpg'),
(41, 'Darko', 'Marić', 'darko', '123', 'img/korisnici/darko.jpg'),
(42, 'Ante', 'Novak', 'ante', '123', 'img/korisnici/ante.jpg'),
(43, 'Mirko', 'Šarić', 'mirko', '123', 'img/korisnici/mirko.jpg'),
(44, 'Ivan', 'Marijanović', 'maki', 'maki1234', 'img/korisnici/maki.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `moje_lokacije`
--

DROP TABLE IF EXISTS `moje_lokacije`;
CREATE TABLE IF NOT EXISTS `moje_lokacije` (
  `id` varchar(100) NOT NULL,
  `id_korisnika` int(11) NOT NULL,
  `naziv` varchar(100) NOT NULL,
  `mjesto` varchar(100) NOT NULL,
  `ocjena` decimal(2,1) DEFAULT NULL,
  `lat` float(18,15) NOT NULL,
  `lng` float(18,15) NOT NULL,
  `vrijeme` datetime NOT NULL,
  `vidljivost` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`,`id_korisnika`),
  KEY `fk1` (`id_korisnika`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `moje_lokacije`
--

INSERT INTO `moje_lokacije` (`id`, `id_korisnika`, `naziv`, `mjesto`, `ocjena`, `lat`, `lng`, `vrijeme`, `vidljivost`) VALUES
('ChIJ0zOBaHuKZ0cRbAw-pMBNgp8', 2, 'Sandwich bar \'Pajo\'', 'Ulica Vladimira Nazora 18, Slatina', '4.4', 45.703941345214844, 17.701871871948242, '2019-08-19 20:43:20', 0),
('ChIJ0zOBaHuKZ0cRbAw-pMBNgp8', 27, 'Sandwich bar \'Pajo\'', 'Ulica Vladimira Nazora 18, Slatina', '4.4', 45.703941345214844, 17.701871871948242, '2019-08-20 17:36:05', 0),
('ChIJ1YqMbGfqZ0cReg2pyBBlOG0', 2, 'Restoran Škola', 'Ulica Matije Gupca 78, Virovitica', '4.4', 45.841819763183594, 17.388465881347656, '2019-08-19 21:00:43', 1),
('ChIJ1YqMbGfqZ0cReg2pyBBlOG0', 27, 'Restoran Škola', 'Ulica Matije Gupca 78, Virovitica', '4.4', 45.841819763183594, 17.388465881347656, '2019-08-20 17:37:58', 1),
('ChIJ2QZOdTpawokRU_eN_EPJaX8', 2, 'The River Café', '1 Water Street, New York', '4.4', 40.703685760498050, -73.994857788085940, '2019-08-19 21:15:05', 1),
('ChIJ2SZLBypawokR5g0jFxaMY10', 2, 'Doughnut Plant', '379 Grand Street, New York', '4.5', 40.716335296630860, -73.988533020019530, '2019-08-19 21:14:30', 0),
('ChIJ3blcJRRawokRex4mbeb9Ix4', 2, 'Beckett\'s Bar & Grill', '81 Pearl Street, New York', '4.0', 40.704128265380860, -74.010337829589840, '2019-08-19 21:14:49', 0),
('ChIJ3blcJRRawokRex4mbeb9Ix4', 27, 'Beckett\'s Bar & Grill', '81 Pearl Street, New York', '4.0', 40.704128265380860, -74.010337829589840, '2019-08-21 01:31:05', 1),
('ChIJ896453yKZ0cRUbpyMjIv2xE', 2, 'Bistro Pizzeria Ivona', 'Ulica Vladimira Nazora 45, Slatina', '4.5', 45.706260681152344, 17.703260421752930, '2019-09-12 09:21:04', 1),
('ChIJ896453yKZ0cRUbpyMjIv2xE', 5, 'Bistro Pizzeria Ivona', 'Ulica Vladimira Nazora 45, Slatina', '4.5', 45.706260681152344, 17.703260421752930, '2019-09-11 19:20:45', 0),
('ChIJ896453yKZ0cRUbpyMjIv2xE', 27, 'Bistro Pizzeria Ivona', 'Ulica Vladimira Nazora 45, Slatina', '4.5', 45.706260681152344, 17.703260421752930, '2019-09-11 19:27:21', 1),
('ChIJaQixPXqKZ0cR7WrDsDMBKis', 2, 'Restoran Stari podrum', 'Ulica kralja Zvonimira 6, Slatina', '4.3', 45.700672149658200, 17.703592300415040, '2019-08-19 20:43:10', 1),
('ChIJaQixPXqKZ0cR7WrDsDMBKis', 5, 'Restoran Stari podrum', 'Ulica kralja Zvonimira 6, Slatina', '4.3', 45.700672149658200, 17.703592300415040, '2019-09-11 19:20:42', 1),
('ChIJaQixPXqKZ0cR7WrDsDMBKis', 27, 'Restoran Stari podrum', 'Ulica kralja Zvonimira 6, Slatina', '4.3', 45.700672149658200, 17.703592300415040, '2019-09-11 19:27:23', 1),
('ChIJaQixPXqKZ0cR7WrDsDMBKis', 44, 'Restoran Stari podrum', 'Ulica kralja Zvonimira 6, Slatina', '4.3', 45.700672149658200, 17.703592300415040, '2019-09-12 17:07:51', 0),
('ChIJax3BM_MDZ0cRTFLQuVWXAcE', 2, 'GREPO d.o.o.', 'Ulica Vladimira Nazora 45, Slatina', '4.6', 45.706260681152344, 17.703260421752930, '2019-08-19 20:43:52', 1),
('ChIJax3BM_MDZ0cRTFLQuVWXAcE', 27, 'GREPO d.o.o.', 'Ulica Vladimira Nazora 45, Slatina', '4.6', 45.706260681152344, 17.703260421752930, '2019-08-21 12:06:53', 1),
('ChIJD-yast_SZ0cR3gcu1jNvEtc', 2, 'Hrvatska poštanska banka - ATM/Bankomat', 'Ulica Stjepana Radića 3, Đurđevac', NULL, 45.834934234619140, 17.383010864257812, '2019-09-11 12:43:51', 1),
('ChIJdZ0CHXuKZ0cRTSQd0iGHjvE', 2, 'OTP banka', 'Trg Svetog Josipa 1, Slatina', '3.0', 45.702365875244140, 17.701324462890625, '2019-08-19 20:08:43', 0),
('ChIJD_NJIrDHwoARFPtDsW4E8t8', 2, 'ATM Global', '1055 Wilshire Boulevard #1940, Los Angeles', '5.0', 34.052562713623050, -118.262718200683600, '2019-08-19 21:23:33', 0),
('ChIJf7i_EkRyXUcRoHFfprfTGOA', 2, 'PBZ Feričanci', 'Ulica Dore Pejačević 2, Feričanci', '4.3', 45.524131774902344, 17.977764129638672, '2019-09-11 12:43:27', 0),
('ChIJF7vjdMvHwoAR6G3_3XZsE9g', 2, 'Up & Away', '122 East 7th Street #601, Los Angeles', NULL, 34.043231964111330, -118.250854492187500, '2019-08-19 21:49:54', 1),
('ChIJF7vjdMvHwoARuzdvj1U3d5Y', 2, 'HAB Bank', '# A10, 110 East 9th Street, Los Angeles', '3.0', 34.040710449218750, -118.254524230957030, '2019-08-19 21:21:27', 0),
('ChIJH8Pll4pZwokRUyQh1WPYego', 2, 'Gilligan\'s', '310 West Broadway, New York', '4.1', 40.722145080566406, -74.004623413085940, '2019-08-19 21:15:25', 0),
('ChIJhRkn3rTHwoAR_1g9G597R9E', 2, 'MJ Wilman', '606 South Olive Street, Los Angeles', NULL, 34.047653198242190, -118.254135131835940, '2019-09-10 17:44:35', 0),
('ChIJhRkn3rTHwoAR_1g9G597R9E', 31, 'MJ Wilman', '606 South Olive Street, Los Angeles', NULL, 34.047653198242190, -118.254135131835940, '2019-08-29 12:04:26', 1),
('ChIJJzGXMABbwokRj-eKPiyfITM', 2, 'TD Bank', '269 5th Avenue, Brooklyn', '3.5', 40.674076080322266, -73.981910705566400, '2019-08-23 22:00:17', 0),
('ChIJK46NJrHHwoAR6d-BJvFcdKY', 2, 'DBS Bank', '725 South Figueroa Street # 2000, Los Angeles', '5.0', 34.049468994140625, -118.260787963867190, '2019-08-19 21:23:16', 1),
('ChIJK46NJrHHwoAR6d-BJvFcdKY', 27, 'DBS Bank', '725 South Figueroa Street # 2000, Los Angeles', '5.0', 34.049468994140625, -118.260787963867190, '2019-08-21 12:24:02', 1),
('ChIJkz8M2XmKZ0cRMEfAaV5t8Fs', 2, 'Lidl', 'Ulica kralja Zvonimira 14, Slatina', '4.4', 45.699542999267580, 17.706899642944336, '2019-09-11 19:32:46', 1),
('ChIJl09iB9lhXUcRaOYoOeyy2L8', 2, 'Chucky Haus Restoran', 'Brune Bušića 78, Slatina', '3.8', 45.695564270019530, 17.712379455566406, '2019-08-19 20:46:15', 1),
('ChIJLamruLrHwoARu-7WB7PURKU', 2, 'U.S. Bank ATM', 'U.S. Bank Tower, 633 West 5th Street #2500, Los Angeles', '4.1', 34.051101684570310, -118.254386901855470, '2019-08-19 21:24:59', 0),
('ChIJm29D3rqLZ0cRZ1FS8xVzxnY', 2, 'Burger caffe', 'Ulica Braće Radić 1, Slatina', '4.5', 45.701732635498050, 17.700666427612305, '2019-08-19 20:43:49', 0),
('ChIJnUODF3uKZ0cRbFKD4H0G3wc', 2, 'Hrvatska poštanska banka', 'Ulica Vladimira Nazora 1, Slatina', '1.8', 45.702884674072266, 17.701158523559570, '2019-08-19 20:07:58', 1),
('ChIJnwnxEObqZ0cRZCCgC_bWVd8', 2, 'KTC Restoran i catering \'Luka\'', 'Vukovarska cesta 3/3, Virovitica', '4.4', 45.821533203125000, 17.389358520507812, '2019-08-19 21:00:49', 1),
('ChIJNyYB20zGwoARilchsDXicdE', 2, 'Wells Fargo Bank', '333 South Grand Avenue Fl 1, Los Angeles', '3.5', 34.052932739257810, -118.251876831054690, '2019-08-19 21:21:23', 0),
('ChIJo2G05nqKZ0cR7dkmG2RGYSU', 2, 'Erste banka - Filijala Slatina', 'Trg Svetog Josipa 1, Slatina', '1.7', 45.702365875244140, 17.701324462890625, '2019-08-19 20:07:53', 0),
('ChIJO4apirPHwoARwctaJrbezdw', 2, 'Wells Fargo Bank', '707 Wilshire Boulevard Fl 1, Los Angeles', '4.0', 34.049217224121094, -118.257003784179690, '2019-08-19 21:23:28', 1),
('ChIJoWrrI_XqZ0cRJ6PzEWuKpbo', 2, 'Restoran Flora', 'Ulica Matije Gupca 5, Virovitica', '4.4', 45.835601806640625, 17.385047912597656, '2019-08-19 21:08:25', 0),
('ChIJp-cWE4pZwokRmUI8_BIF8dg', 2, 'Lombardi\'s', '32 Spring Street, New York', '4.1', 40.721569061279300, -73.995635986328120, '2019-08-19 21:15:41', 1),
('ChIJT2XaHnuKZ0cR3WboP0js9NQ', 2, 'Zagrebačka banka d.d.', 'Ulica Vladimira Nazora 1, Slatina', '1.0', 45.702533721923830, 17.700992584228516, '2019-08-19 20:07:55', 1),
('ChIJt7fMLIlZwokRCRtM9bNDg78', 2, 'Balthazar', '80 Spring Street, New York', '4.4', 40.722602844238280, -73.998222351074220, '2019-08-19 21:15:34', 0),
('ChIJU7Q2jnqKZ0cRW6U4omHVbUY', 2, 'PEKARA CEZAR', 'Ulica Ante Kovačića 3, Slatina', '3.6', 45.701187133789060, 17.700645446777344, '2019-09-10 17:07:23', 0),
('ChIJV6TqCYqKZ0cRaH-4bdv5BVg', 2, 'KTC Restoran', 'Industrijska ulica 7/3, Slatina', '4.1', 45.710460662841800, 17.695991516113280, '2019-08-19 20:46:18', 1),
('ChIJVeXRdylawokRKRKea_O_4p8', 2, 'ATM Services NY, Inc.', '169 East Broadway, New York', NULL, 40.713836669921875, -73.989761352539060, '2019-08-21 20:45:06', 1),
('ChIJwdWiXGOKZ0cR9qjN3oevzoI', 2, 'PAPIZZA Snack bar', 'Trg Ruđera Boškovića 2, Slatina', '3.8', 45.705482482910156, 17.699552536010742, '2019-08-19 20:43:24', 0),
('ChIJxRGIvkzGwoARwNJ4EW4Ty4w', 2, 'Bank Sino Pac', '355 South Grand Avenue #4168, Los Angeles', '5.0', 34.052223205566406, -118.252822875976560, '2019-08-19 21:24:37', 1),
('ChIJY_PFZJ6LZ0cRijQICcTEq_w', 2, 'Caffe Bar LOPTA', 'Ulica bana Josipa Jelačića, Slatina', '4.2', 45.702114105224610, 17.702838897705078, '2019-09-12 17:08:50', 0);

-- --------------------------------------------------------

--
-- Table structure for table `preporuke`
--

DROP TABLE IF EXISTS `preporuke`;
CREATE TABLE IF NOT EXISTS `preporuke` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `preporucitelj_id` int(11) NOT NULL,
  `komentar` varchar(500) NOT NULL,
  `lokacija_id` varchar(100) NOT NULL,
  `naziv` varchar(100) NOT NULL,
  `mjesto` varchar(100) NOT NULL,
  `ocjena` decimal(2,1) DEFAULT NULL,
  `lat` float(18,15) NOT NULL,
  `lng` float(18,15) NOT NULL,
  `vrijeme` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk2` (`preporucitelj_id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `preporuke`
--

INSERT INTO `preporuke` (`id`, `preporucitelj_id`, `komentar`, `lokacija_id`, `naziv`, `mjesto`, `ocjena`, `lat`, `lng`, `vrijeme`) VALUES
(35, 5, 'pizza je vrh!', 'ChIJ896453yKZ0cRUbpyMjIv2xE', 'Bistro Pizzeria Ivona', 'Ulica Vladimira Nazora 45, Slatina', '4.5', 45.706260681152344, 17.703260421752930, '2019-08-19 18:55:12'),
(37, 27, 'Evo Igore, nećeš požaliti.', 'ChIJ0zOBaHuKZ0cRbAw-pMBNgp8', 'Sandwich bar \'Pajo\'', 'Ulica Vladimira Nazora 18, Slatina', '4.4', 45.703941345214844, 17.701871871948242, '2019-08-21 12:27:38'),
(54, 2, 'Evo dečki tu je super kebab.', 'ChIJ0zOBaHuKZ0cRbAw-pMBNgp8', 'Sandwich bar \'Pajo\'', 'Ulica Vladimira Nazora 18, Slatina', '4.4', 45.703941345214844, 17.701871871948242, '2019-08-29 21:38:06'),
(61, 27, 'preporucam da odeš', 'ChIJ3blcJRRawokRex4mbeb9Ix4', 'Beckett\'s Bar & Grill', '81 Pearl Street, New York', '4.0', 40.704128265380860, -74.010337829589840, '2019-09-12 09:26:25'),
(62, 27, 'Super lokacija za nešto pojest i popit.', 'ChIJ1YqMbGfqZ0cReg2pyBBlOG0', 'Restoran Škola', 'Ulica Matije Gupca 78, Virovitica', '4.4', 45.841819763183594, 17.388465881347656, '2019-09-12 09:27:52'),
(63, 2, 'Dobri sendviči.', 'ChIJwdWiXGOKZ0cR9qjN3oevzoI', 'PAPIZZA Snack bar', 'Trg Ruđera Boškovića 2, Slatina', '3.8', 45.705482482910156, 17.699552536010742, '2019-09-12 09:28:50'),
(64, 5, 'Preporučam ti da posjetiš.', 'ChIJY_PFZJ6LZ0cRijQICcTEq_w', 'Caffe Bar LOPTA', 'Ulica bana Josipa Jelačića, Slatina', '4.2', 45.702114105224610, 17.702838897705078, '2019-09-12 09:30:55'),
(65, 2, 'xcbxcbxvb', 'ChIJ896453yKZ0cRUbpyMjIv2xE', 'Bistro Pizzeria Ivona', 'Ulica Vladimira Nazora 45, Slatina', '4.5', 45.706260681152344, 17.703260421752930, '2019-09-12 14:55:01'),
(66, 2, 'dfg', 'ChIJ896453yKZ0cRUbpyMjIv2xE', 'Bistro Pizzeria Ivona', 'Ulica Vladimira Nazora 45, Slatina', '4.5', 45.706260681152344, 17.703260421752930, '2019-09-12 14:55:26'),
(67, 44, 'fdgdf', 'ChIJowuICMfnZ0cRzguET5tImO4', 'Csillag Étterem', 'Barcs, Bajcsy-Zsilinszky utca 80', '4.4', 45.959125518798830, 17.467145919799805, '2019-09-12 17:06:56');

-- --------------------------------------------------------

--
-- Table structure for table `primatelji`
--

DROP TABLE IF EXISTS `primatelji`;
CREATE TABLE IF NOT EXISTS `primatelji` (
  `preporuka_id` int(11) NOT NULL,
  `primatelj_id` int(11) NOT NULL,
  `primljeno` tinyint(1) NOT NULL,
  PRIMARY KEY (`preporuka_id`,`primatelj_id`),
  KEY `fk4` (`primatelj_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `primatelji`
--

INSERT INTO `primatelji` (`preporuka_id`, `primatelj_id`, `primljeno`) VALUES
(35, 2, 1),
(37, 39, 0),
(54, 5, 0),
(54, 26, 0),
(61, 2, 0),
(61, 5, 0),
(62, 2, 0),
(62, 5, 0),
(63, 5, 0),
(64, 2, 1),
(64, 27, 0),
(65, 5, 1),
(66, 27, 1),
(67, 5, 0),
(67, 26, 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `komentari`
--
ALTER TABLE `komentari`
  ADD CONSTRAINT `fk5` FOREIGN KEY (`id_korisnika`) REFERENCES `korisnici` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `moje_lokacije`
--
ALTER TABLE `moje_lokacije`
  ADD CONSTRAINT `fk1` FOREIGN KEY (`id_korisnika`) REFERENCES `korisnici` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `preporuke`
--
ALTER TABLE `preporuke`
  ADD CONSTRAINT `fk2` FOREIGN KEY (`preporucitelj_id`) REFERENCES `korisnici` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `primatelji`
--
ALTER TABLE `primatelji`
  ADD CONSTRAINT `fk3` FOREIGN KEY (`preporuka_id`) REFERENCES `preporuke` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk4` FOREIGN KEY (`primatelj_id`) REFERENCES `korisnici` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
