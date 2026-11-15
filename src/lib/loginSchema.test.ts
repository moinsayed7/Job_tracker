import { describe, it, expect } from "vitest";
import { schemaLogin, createdRegistrationSchema } from "./registerValidation";

describe("Login schema", () => {
  it("accepts valid credentials", () => {
    expect(
      schemaLogin.safeParse({
        email: "test@example.com",
        password: "password123",
      }).success,
    ).toBe(true);
  });

  it("rejects an empty password", () => {
    const result = schemaLogin.safeParse({
      email: "test@example.com",
      password: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a missing password field", () => {
    const result = schemaLogin.safeParse({ email: "test@example.com" });
    expect(result.success).toBe(false);
  });

  it("accepts a short password (login only checks it's non-empty)", () => {
    const result = schemaLogin.safeParse({
      email: "test@example.com",
      password: "abc",
    });
    expect(result.success).toBe(true);
  });

  it("rejects number as email", () => {
    const result = schemaLogin.safeParse({
      email: 123456789,
      password: "password123",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = schemaLogin.safeParse({
      email: "invalid-email",
      password: "password123",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(["email"]);
  });
});

describe("Registration schema", () => {
  it("accepts valid registration data", () => {
    expect(
      createdRegistrationSchema.safeParse({
        email: "test@example.com",
        password: "password123",
      }).success,
    ).toBe(true);
  });

  it("accepts exactly 9 characters", () => {
    const result = createdRegistrationSchema.safeParse({
      email: "test@example.com",
      password: "123456789",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    expect(
      createdRegistrationSchema.safeParse({
        email: "invalid-email",
        password: "password123",
      }).success,
    ).toBe(false);
  });

  it("rejects password shorter than 9 characters", () => {
    expect(
      createdRegistrationSchema.safeParse({
        email: "test@example.com",
        password: "12345678",
      }).success,
    ).toBe(false);
  });
});
