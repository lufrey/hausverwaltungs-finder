CREATE TABLE `flatToTag` (
	`flatId` text NOT NULL,
	`tagId` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tag` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
