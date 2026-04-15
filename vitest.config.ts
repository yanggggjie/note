import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["src/**/*.test.ts"],
		alias: {
			vscode: resolve(__dirname, "src/__mocks__/vscode.ts"),
		},
	},
});
