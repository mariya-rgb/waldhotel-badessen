CREATE TABLE `extras` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lang` varchar(5) NOT NULL,
	`serviceName` varchar(255) NOT NULL,
	`price` varchar(128) NOT NULL,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `extras_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `hotel_info` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lang` varchar(5) NOT NULL,
	`hotelName` varchar(255) NOT NULL,
	`tagline` text,
	`heroTitle` varchar(255),
	`heroSubtitle` text,
	`heroCta` varchar(128),
	`aboutLabel` varchar(128),
	`aboutTitle` varchar(255),
	`aboutText1` text,
	`aboutText2` text,
	`aboutCta` varchar(128),
	`address` varchar(255),
	`phone` varchar(64),
	`email` varchar(255),
	`latitude` varchar(32),
	`longitude` varchar(32),
	`instagramUrl` varchar(512),
	`facebookUrl` varchar(512),
	`bookingComUrl` varchar(512),
	`tripadvisorUrl` varchar(512),
	`agodaUrl` varchar(512),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hotel_info_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `location_sections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lang` varchar(5) NOT NULL,
	`slug` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`items` text,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `location_sections_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pages_meta` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lang` varchar(5) NOT NULL,
	`pageSlug` varchar(64) NOT NULL,
	`metaTitle` varchar(512),
	`metaDescription` text,
	`heroTitle` varchar(255),
	`heroSubtitle` text,
	`introText` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pages_meta_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `room_notes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lang` varchar(5) NOT NULL,
	`noteText` text NOT NULL,
	`iconName` varchar(64),
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `room_notes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rooms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lang` varchar(5) NOT NULL,
	`slug` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`priceFrom` decimal(10,2),
	`priceLabel` varchar(128),
	`imageUrl` varchar(1024),
	`amenities` text,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rooms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wellness_hours` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lang` varchar(5) NOT NULL,
	`dayName` varchar(64) NOT NULL,
	`timeRange` varchar(128) NOT NULL,
	`note` varchar(255),
	`dayIndex` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `wellness_hours_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wellness_offerings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lang` varchar(5) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`iconName` varchar(64),
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `wellness_offerings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wellness_prices` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lang` varchar(5) NOT NULL,
	`label` varchar(255) NOT NULL,
	`price` varchar(128) NOT NULL,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `wellness_prices_id` PRIMARY KEY(`id`)
);
