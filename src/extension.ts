import * as vscode from "vscode";
import { registerCommands } from "./commands/index.js";
import { EXTENSION_DISPLAY_NAME } from "./constants.js";
import { SidebarProvider } from "./providers/SidebarProvider.js";
import { initialize as initializeGlobalStorage } from "./storage/GlobalStorage.js";
import { logger } from "./utils/logger.js";

export const activate = (context: vscode.ExtensionContext): void => {
	logger.info(`${EXTENSION_DISPLAY_NAME} activating`);

	initializeGlobalStorage(context);
	registerCommands(context);

	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(SidebarProvider.viewId, sidebarProvider),
	);

	logger.info(`${EXTENSION_DISPLAY_NAME} activated`);
};

export const deactivate = (): void => {
	logger.dispose();
};
