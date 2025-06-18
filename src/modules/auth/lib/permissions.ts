import { createAccessControl } from "better-auth/plugins/access";

export const statement = {
  post: ["create", "read", "update", "delete"],
  comment: ["create", "read", "update", "delete", "update:own", "delete:own"],
} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({
  post: ["read"],
  comment: ["create", "read", "update:own", "delete:own"],
});

export const admin = ac.newRole({
  post: ["create", "read", "update", "delete"],
  comment: ["create", "read", "update", "delete", "update:own", "delete:own"],
});
