ALTER TABLE propertyManagement ADD `slug` text;--> statement-breakpoint
CREATE UNIQUE INDEX `propertyManagement_slug_unique` ON `propertyManagement` (`slug`);