import { describe, it, expect } from "vitest";

import { statusSchema, createdJobSchema, updatedJobSchema } from "./validation";

describe("Status schema", () => {
  it("accepts all four valid statuses", () => {
    const statuses = ["applied", "rejected", "offer", "interview"];

    statuses.forEach((status) => {
      expect(statusSchema.safeParse(status).success).toBe(true);
    });
  });
});

describe("Create job schema", () => {
  it("accepts valid job data", () => {
    const result = createdJobSchema.safeParse({
      company: "Google",
      role: "Frontend Developer",
      status: "applied",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an empty company name", () => {
    const result = createdJobSchema.safeParse({
      company: "",
      role: "Frontend Developer",
      status: "applied",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an empty role", () => {
    const result = createdJobSchema.safeParse({
      company: "Google",
      role: "",
      status: "applied",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an invalid status", () => {
    const result = createdJobSchema.safeParse({
      company: "Google",
      role: "Developer",
      status: "pending",
    });

    expect(result.success).toBe(false);
  });
});

describe("Update job schema", () => {
  it("accepts a valid status update", () => {
    const result = updatedJobSchema.safeParse({
      status: "interview",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an invalid status update", () => {
    const result = updatedJobSchema.safeParse({
      status: "pending",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a missing status", () => {
    const result = updatedJobSchema.safeParse({});

    expect(result.success).toBe(false);
  });
});
