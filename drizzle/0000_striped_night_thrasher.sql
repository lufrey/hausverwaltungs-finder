CREATE TABLE `address` (
	`id` integer PRIMARY KEY NOT NULL,
	`street` text,
	`city` text,
	`postalCode` text
);
--> statement-breakpoint
CREATE TABLE `district` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `flat` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text,
	`coldRentPrice` integer,
	`warmRentPrice` integer,
	`roomCount` integer,
	`usableArea` real,
	`floor` integer,
	`image` blob,
	`addressId` integer,
	`propertyManagementId` text
);
--> statement-breakpoint
CREATE TABLE `flatToTags` (
	`flatId` integer NOT NULL,
	`tagId` integer NOT NULL,
	PRIMARY KEY(`flatId`, `tagId`),
	FOREIGN KEY (`flatId`) REFERENCES `flat`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tagId`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `postalCode` (
	`code` text PRIMARY KEY NOT NULL,
	`districtId` integer
);
--> statement-breakpoint
CREATE TABLE `propertyManagement` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`website` text
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text
);
