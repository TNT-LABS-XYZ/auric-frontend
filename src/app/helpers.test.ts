import { describe, it, expect } from "vitest";
import {
  parseBalance,
  fmt6,
  formatRuleSummary,
  formatRuleDetail,
  isZeroBalance,
  type Strategy,
} from "./helpers";

// ─── parseBalance ─────────────────────────────────────────────────────────────
// Backend returns balances as strings — parseBalance must coerce to numbers.

describe("parseBalance", () => {
  it('converts string "0" to number 0', () => {
    const result = parseBalance({ xaut: "0", usdt: "0" });
    expect(result).toEqual({ xaut: 0, usdt: 0 });
    expect(typeof result.xaut).toBe("number");
    expect(typeof result.usdt).toBe("number");
  });

  it("converts non-zero string balances to numbers", () => {
    const result = parseBalance({ xaut: "1.5", usdt: "100.25" });
    expect(result).toEqual({ xaut: 1.5, usdt: 100.25 });
  });

  it("handles numeric inputs (already numbers)", () => {
    const result = parseBalance({ xaut: 0, usdt: 50 });
    expect(result).toEqual({ xaut: 0, usdt: 50 });
  });
});

// ─── isZeroBalance ────────────────────────────────────────────────────────────

describe("isZeroBalance", () => {
  it("returns true when both balances are 0", () => {
    expect(isZeroBalance({ xaut: 0, usdt: 0 })).toBe(true);
  });

  it("returns false when xaut > 0", () => {
    expect(isZeroBalance({ xaut: 0.5, usdt: 0 })).toBe(false);
  });

  it("returns false when usdt > 0", () => {
    expect(isZeroBalance({ xaut: 0, usdt: 10 })).toBe(false);
  });

  it("returns false when balance is null", () => {
    expect(isZeroBalance(null)).toBe(false);
  });

  // Regression: string "0" from API should NOT pass after parseBalance
  it("returns false for string zeros (unparsed API response)", () => {
    // @ts-expect-error — simulating raw API response before parseBalance
    expect(isZeroBalance({ xaut: "0", usdt: "0" })).toBe(false);
  });
});

// ─── fmt6 ─────────────────────────────────────────────────────────────────────

describe("fmt6", () => {
  it('returns "0" for undefined', () => {
    expect(fmt6(undefined)).toBe("0");
  });

  it('returns "0" for empty string', () => {
    expect(fmt6("")).toBe("0");
  });

  it("converts raw 6-decimal token amount", () => {
    expect(fmt6("5000000")).toBe("5");
  });

  it("handles fractional amounts", () => {
    expect(fmt6("1500000")).toBe("1.5");
  });
});

// ─── formatRuleSummary ────────────────────────────────────────────────────────
// These tests verify that the frontend uses the correct backend field names.

describe("formatRuleSummary", () => {
  it("formats DCA strategy", () => {
    const s: Strategy = {
      _id: "1",
      type: "dca",
      status: "active",
      amount: "10000000",
      frequency: "weekly",
    };
    expect(formatRuleSummary(s)).toBe("DCA — $10 weekly");
  });

  it("formats price_trigger using buy_below_usd (not buy_below)", () => {
    const s: Strategy = {
      _id: "2",
      type: "price_trigger",
      status: "active",
      buy_below_usd: 2900,
      amount: "5000000",
    };
    const result = formatRuleSummary(s);
    expect(result).toContain("2,900");
    expect(result).not.toContain("NaN");
  });

  it("does not produce NaN when buy_below_usd is missing", () => {
    const s: Strategy = { _id: "2", type: "price_trigger", status: "active" };
    expect(formatRuleSummary(s)).not.toContain("NaN");
  });

  it("formats goal using target_xaut (not target)", () => {
    const s: Strategy = {
      _id: "3",
      type: "goal",
      status: "active",
      target_xaut: 1.5,
      accumulated: "500000",
      amount: "10000000",
      frequency: "daily",
    };
    const result = formatRuleSummary(s);
    expect(result).toContain("1.5000");
    expect(result).not.toContain("NaN");
  });

  it("does not produce NaN when target_xaut is missing", () => {
    const s: Strategy = {
      _id: "3",
      type: "goal",
      status: "active",
      accumulated: "0",
    };
    expect(formatRuleSummary(s)).not.toContain("NaN");
  });
});

// ─── formatRuleDetail ─────────────────────────────────────────────────────────

describe("formatRuleDetail", () => {
  it("formats DCA detail", () => {
    const s: Strategy = {
      _id: "1",
      type: "dca",
      status: "active",
      amount: "10000000",
      frequency: "weekly",
    };
    expect(formatRuleDetail(s)).toBe("$10 weekly");
  });

  it("formats price_trigger detail", () => {
    const s: Strategy = {
      _id: "2",
      type: "price_trigger",
      status: "active",
      amount: "5000000",
    };
    expect(formatRuleDetail(s)).toBe("Buy $5 when triggered");
  });

  it("formats goal detail", () => {
    const s: Strategy = {
      _id: "3",
      type: "goal",
      status: "active",
      amount: "10000000",
      frequency: "daily",
    };
    expect(formatRuleDetail(s)).toBe("$10 daily");
  });
});
