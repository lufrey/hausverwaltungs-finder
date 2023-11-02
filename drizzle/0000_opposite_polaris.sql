CREATE TABLE `address` (
	`id` text PRIMARY KEY NOT NULL,
	`street` text,
	`city` text,
	`streetNumber` text,
	`postalCode` text,
	`longitude` real,
	`latitude` real
);
--> statement-breakpoint
CREATE TABLE `district` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `flat` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text,
	`coldRentPrice` integer,
	`warmRentPrice` integer,
	`roomCount` integer,
	`usableArea` real,
	`floor` integer,
	`image` blob,
	`addressId` text,
	`propertyManagementId` text,
	`firstSeen` integer,
	`lastSeen` integer,
	`tags` text
);
--> statement-breakpoint
CREATE TABLE `postalCode` (
	`code` text PRIMARY KEY NOT NULL,
	`districtId` integer
);
--> statement-breakpoint
CREATE TABLE `propertyManagement` (
	`slug` text PRIMARY KEY NOT NULL,
	`name` text,
	`website` text
);
