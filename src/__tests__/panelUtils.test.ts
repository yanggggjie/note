import { describe, expect, it } from "vitest";
import { getNonce } from "../panels/PanelUtils.js";

describe("getNonce", () => {
	it("returns a 32-character hex string", () => {
		expect(getNonce()).toMatch(/^[0-9a-f]{32}$/);
	});

	it("returns a unique value on each call", () => {
		expect(getNonce()).not.toBe(getNonce());
	});
});
