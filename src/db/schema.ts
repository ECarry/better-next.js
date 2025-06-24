import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  uuid,
  uniqueIndex,
  index,
  PgColumn,
  integer,
  bigint,
  pgEnum,
  foreignKey,
  primaryKey,
} from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";

// Role enum definition
export const roleEnum = pgEnum("user_role", ["admin", "user", "plus"]);

// ⌚️ Reusable timestamps - Define once, use everywhere!
export const timestamps = {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
};

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  role: roleEnum("role").notNull().default("user"),
  banned: boolean("banned").notNull().default(false),
  banReason: text("ban_reason").notNull().default(""),
  banExpires: bigint("ban_expires", { mode: "number" }),

  ...timestamps,
});

export const userRelations = relations(user, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
}));

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  impersonatedBy: text("impersonated_by"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const categories = pgTable(
  "category",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").unique().notNull(),
    slug: text("slug").unique().notNull(),
    description: text("description"),

    ...timestamps,
  },
  (t) => [
    uniqueIndex("category_name_idx").on(t.name),
    uniqueIndex("category_slug_idx").on(t.slug),
  ]
);

export const categoryRelations = relations(categories, ({ many }) => ({
  posts: many(posts),
}));

export const posts = pgTable(
  "posts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").unique().notNull(),
    title: text("title").notNull(),
    content: text("content"),
    description: text("description"),
    coverImage: text("cover_image"),
    published: boolean("published").default(false),
    likes: integer("likes").default(0).notNull(),
    views: integer("views").default(0).notNull(),
    readingTime: integer("reading_time"),
    featured: boolean("featured").default(false),
    categoryId: uuid("category_id").references(() => categories.id, {
      onDelete: "set null",
    }),

    ...timestamps,
  },
  (t) => [
    uniqueIndex("post_slug_idx").on(t.slug),
    index("post_title_idx").on(t.title),
    index("post_category_idx").on(t.categoryId),
  ]
);

export const postRelations = relations(posts, ({ one, many }) => ({
  category: one(categories, {
    fields: [posts.categoryId],
    references: [categories.id],
  }),
  comments: many(comments),
}));

export const comments = pgTable(
  "comments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    text: text("text").notNull(),
    postSlug: text("post_slug")
      .notNull()
      .references(() => posts.slug, {
        onDelete: "cascade",
      }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),
    parentId: uuid("parent_id").references((): PgColumn => comments.id, {
      onDelete: "cascade",
    }),

    ...timestamps,
  },
  (t) => [
    foreignKey({
      columns: [t.parentId],
      foreignColumns: [t.id],
      name: "comments_parent_id_fkey",
    }).onDelete("cascade"),
  ]
);

export const commentRelations = relations(comments, ({ one, many }) => ({
  user: one(user, {
    fields: [comments.userId],
    references: [user.id],
  }),
  post: one(posts, {
    fields: [comments.postSlug],
    references: [posts.slug],
  }),
  parentId: one(comments, {
    fields: [comments.parentId],
    references: [comments.id],
    relationName: "comments_parent_id_fkey",
  }),

  replies: many(comments, { relationName: "comments_replies_fkey" }),
}));

export const commentsInsertSchema = createInsertSchema(comments);
export const commentsSelectSchema = createSelectSchema(comments);
export const commentsUpdateSchema = createUpdateSchema(comments);

export const reactionTypes = pgEnum("reaction_type", ["like", "dislike"]);

export const commentsReactions = pgTable(
  "comments_reactions",
  {
    userId: text("user_id")
      .references(() => user.id, { onDelete: "cascade" })
      .notNull(),
    commentId: uuid("comment_id")
      .references(() => comments.id, { onDelete: "cascade" })
      .notNull(),
    type: reactionTypes("type").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    primaryKey({
      name: "comments_reactions_pk",
      columns: [t.userId, t.commentId],
    }),
  ]
);

export const commentsReactionsRelations = relations(
  commentsReactions,
  ({ one }) => ({
    user: one(user, {
      fields: [commentsReactions.userId],
      references: [user.id],
    }),
    comment: one(comments, {
      fields: [commentsReactions.commentId],
      references: [comments.id],
    }),
  })
);
