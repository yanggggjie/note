export const EXTENSION_ID = "stratum";
export const EXTENSION_DISPLAY_NAME = "Stratum";

export const COMMANDS = {
	OPEN_PANEL: "stratum.openPanel",
	HELLO_WORLD: "stratum.helloWorld",
} as const;

export const VIEWS = {
	SIDEBAR: "stratum.sidebarView",
} as const;

export const MESSAGES = {
	PANEL_TITLE: "Stratum",
	STORAGE_ERROR: "Storage operation failed. Check the Output panel for details.",
	HELLO_WORLD: "Hello from Stratum!",
} as const;

// When forking this template, rename this to match your extension (e.g. ".myext").
export const STORAGE_DIR = ".stratum";
