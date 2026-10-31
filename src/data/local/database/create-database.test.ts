import { eq } from "drizzle-orm";
import { migrate } from "drizzle-orm/pglite/migrator";
import { describe, expect, it } from "vitest";
import { createDatabase } from "./create-database";
import { user } from "./schema";

describe("createDatabase", () => {
  it("applies the migrations and stores rows in an embedded database", async () => {
    const database = createDatabase("pglite://memory");
    await migrate(database as never, {
      migrationsFolder: "src/data/local/database/migrations",
    });

    await database
      .insert(user)
      .values({ id: "user-1", name: "Ada", email: "ada@example.com" });
    const rows = await database
      .select()
      .from(user)
      .where(eq(user.id, "user-1"));

    expect(rows).toHaveLength(1);
    expect(rows[0]?.email).toBe("ada@example.com");
  });
});
