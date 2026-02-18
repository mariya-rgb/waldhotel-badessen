import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the notification module
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// Mock the db module
vi.mock("./db", async (importOriginal) => {
  const original = await importOriginal<typeof import("./db")>();
  return {
    ...original,
    createContactMessage: vi.fn().mockResolvedValue({ success: true }),
  };
});

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("contact.submit", () => {
  it("submits a valid German contact message", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Max Mustermann",
      email: "max@example.com",
      phone: "+49 176 1234567",
      subject: "Zimmeranfrage",
      message: "Ich möchte gerne ein Doppelzimmer für den 15. März buchen.",
      lang: "de",
    });

    expect(result).toEqual({ success: true });
  });

  it("submits a valid English contact message without optional fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "John Doe",
      email: "john@example.com",
      message: "I would like to book a double room for March 15th.",
      lang: "en",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects a message with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "Max Mustermann",
        email: "not-an-email",
        message: "Test message that is long enough.",
        lang: "de",
      })
    ).rejects.toThrow();
  });

  it("rejects a message with too short name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "M",
        email: "max@example.com",
        message: "Test message that is long enough.",
        lang: "de",
      })
    ).rejects.toThrow();
  });

  it("rejects a message with too short message text", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "Max Mustermann",
        email: "max@example.com",
        message: "Kurz",
        lang: "de",
      })
    ).rejects.toThrow();
  });
});
