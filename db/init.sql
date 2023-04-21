CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `price` varchar(60) NOT NULL,
  `image` varchar(200),
  `email` varchar(60) NOT NULL,
  `userId` varchar(60) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `articles` (`title`,`price`,`image`,`email`,`userId`) VALUES ('Chair','10.99','https://t3.ftcdn.net/jpg/03/14/57/92/240_F_314579210_7Pzxxh7HCwXPz2XPRLawqVuj241h5II2.jpg','john@wick.com','9d92a963-b40b-4821-ab16-1b34b0309329');
INSERT INTO `articles` (`title`,`price`,`image`,`email`,`userId`) VALUES ('Table','50','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrNScIhQ3DQ0o3FQrH4Du5jlhs6BknG2Gc7Q&usqp=CAU','tony@stark.com','5e3f94f5-96b2-499b-bede-903e3a203e52');
