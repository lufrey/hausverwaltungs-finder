CREATE TABLE `address` (
	`id` text PRIMARY KEY NOT NULL,
	`street` text NOT NULL,
	`city` text NOT NULL,
	`streetNumber` text NOT NULL,
	`postalCode` text NOT NULL,
	`longitude` real,
	`latitude` real
);
--> statement-breakpoint
CREATE TABLE `flat` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`coldRentPrice` integer NOT NULL,
	`warmRentPrice` integer,
	`roomCount` integer,
	`usableArea` real,
	`floor` integer,
	`image` blob,
	`addressId` text NOT NULL,
	`propertyManagementId` text,
	`firstSeen` integer NOT NULL,
	`lastSeen` integer NOT NULL,
	`url` text NOT NULL,
	`tags` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `propertyManagement` (
	`slug` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`website` text
);
