CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiration` timestamp NULL DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `price` varchar(60) NOT NULL,
  `description` varchar(500) NOT NULL,
  `image` varchar(200),
  `email` varchar(60) NOT NULL,
  `userId` varchar(60) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `users` (`id`, `email`, `password`) VALUES (UUID(), 'test@example.com', 'password123');


INSERT INTO `articles` (`title`,`price`,`description`,`image`,`email`,`userId`) VALUES ('Chair','10.99','Nice blue chair in good condition','https://t3.ftcdn.net/jpg/03/14/57/92/240_F_314579210_7Pzxxh7HCwXPz2XPRLawqVuj241h5II2.jpg','test@example.com',UUID());
INSERT INTO `articles` (`title`,`price`,`description`,`image`,`email`,`userId`) VALUES ('Table','50','Old wooden table','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrNScIhQ3DQ0o3FQrH4Du5jlhs6BknG2Gc7Q&usqp=CAU','test@example.com',UUID());
