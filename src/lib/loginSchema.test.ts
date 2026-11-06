
import { describe, it, expect } from "vitest";
import {
  schemaLogin,
  createdRegistrationSchema,
} from "./registerValidation";

describe("Login schema", () => {
  it("accepts valid credentials", () => {
    expect(
      schemaLogin.safeParse({
        email: "test@example.com",
        password: "password123",
      }).success
    ).toBe(true);
  });

  it("rejects invalid email", () => {
    expect(
      schemaLogin.safeParse({
        email: "invalid-email",
        password: "password123",
      }).success
    ).toBe(false);
  });

  it("rejects password shorter than 9 characters", () => {
    expect(
      schemaLogin.safeParse({
        email: "test@example.com",
        password: "12345678",
      }).success
    ).toBe(false);
  });
});

describe("Registration schema", () => {
  it("accepts valid registration data", () => {
    expect(
      createdRegistrationSchema.safeParse({
        email: "test@example.com",
        password: "password123",
      }).success
    ).toBe(true);
  });

  it("rejects invalid email", () => {
    expect(
      createdRegistrationSchema.safeParse({
        email: "invalid-email",
        password: "password123",
      }).success
    ).toBe(false);
  });

  it("rejects password shorter than 9 characters", () => {
    expect(
      createdRegistrationSchema.safeParse({
        email: "test@example.com",
        password: "12345678",
      }).success
    ).toBe(false);
  });
});
