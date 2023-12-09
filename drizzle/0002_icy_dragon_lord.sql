CREATE TABLE `signups` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`createdAt` integer NOT NULL,
	`districts` text,
	`maxPrice` integer NOT NULL,
	`minRooms` integer NOT NULL
);
