CREATE TABLE `site_snapshots` (
	`key` text PRIMARY KEY NOT NULL,
	`payload` text NOT NULL,
	`updated_at` integer NOT NULL,
	`revision` integer NOT NULL
);
