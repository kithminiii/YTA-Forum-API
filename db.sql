CREATE TABLE `comments` (
  `commentId` int(11) NOT NULL AUTO_INCREMENT,
  `comment` varchar(250) NOT NULL,
  `commentedDate` datetime NOT NULL,
  `postId` int(11) NOT NULL,
  PRIMARY KEY (`commentId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

INSERT INTO `comments`(`commentId`,`comment`,`commentedDate`,`postId`) VALUES
('1','I have 2 bengal cats','2022-10-30 09:06:07','1'),
('2','gjjhjh','2022-10-30 09:07:16','1'),
('3','Nice','2022-10-30 09:15:27','1');


CREATE TABLE `posts` (
  `postId` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `isDraft` int(11) NOT NULL,
  `createdDate` datetime NOT NULL,
  PRIMARY KEY (`postId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

INSERT INTO `posts`(`postId`,`title`,`description`,`isDraft`,`createdDate`) VALUES
('2','Scottish Fold (Highland Fold)','Scottish fold cats make great, affectionate pets that thrive on human interaction without being too demanding for your constant attention. They have a charmingly unique appearance due to their ear carriage, round heads and eyes, and thick legs and tail.','0','2022-10-27 11:54:16'),
('3','Savannah Cat','Savannah cats are a large, athletic breed that’s especially affectionate with their owners, but can be a bit standoffish with strangers. Learn more about this highly intelligent cat.','0','2022-10-30 01:28:25'),
('4','Siamese','Siamese cats are social, affectionate, clever animals who make loving and loyal pets. Described as being \"dog-like,\" these kitties mesh well into most families.','0','2022-10-30 01:47:48'),
('5','Persian','Sweet tempered and loving, Persian cats are famous for their long, flowing coats and round, pansy-like faces. Find out everything you need to know about the Persian cat breed.','0','2022-10-30 01:57:48');




CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(45) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;


INSERT INTO `users` (`userId`, `userName`, `firstName`, `lastName`, `email`, `password`) VALUES
('1', 'bhagya', 'Bhagya', 'Kithmini', 'bkithmini@gmail.com', '$2b$10$nhi8UDU/dhj1uMoy4gSy1.t740oxTYeItFJLGZBUJbAo1KMaC/SBm'),
('2', 'bhagyak', 'Bhagya', 'Kithmini', 'Bk@gmail.com', '$2b$10$nhi8UDU/dhj1uMoy4gSy1.t740oxTYeItFJLGZBUJbAo1KMaC/SBm');

