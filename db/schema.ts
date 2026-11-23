import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const siteSnapshots = sqliteTable("site_snapshots", {
  key: text("key").primaryKey(),
  payload: text("payload").notNull(),
  updatedAt: integer("updated_at").notNull(),
  revision: integer("revision").notNull(),
});
