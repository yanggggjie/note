import * as vscode from "vscode";
import { COMMANDS, EXTENSION_DISPLAY_NAME } from "../constants.js";

let statusBarItem: vscode.StatusBarItem | undefined;

export const createStatusBarItem = (context: vscode.ExtensionContext): vscode.StatusBarItem => {
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.text = `$(layout-panel) ${EXTENSION_DISPLAY_NAME}`;
	statusBarItem.tooltip = `Open ${EXTENSION_DISPLAY_NAME} Panel`;
	statusBarItem.command = COMMANDS.OPEN_PANEL;
	statusBarItem.show();
	context.subscriptions.push(statusBarItem);
	return statusBarItem;
};

export const setStatusBarText = (text: string): void => {
	if (statusBarItem) {
		statusBarItem.text = `$(layout-panel) ${text}`;
	}
};

export const setStatusBarLoading = (): void => {
	if (statusBarItem) {
		statusBarItem.text = `$(sync~spin) ${EXTENSION_DISPLAY_NAME}`;
	}
};

export const resetStatusBar = (): void => {
	if (statusBarItem) {
		statusBarItem.text = `$(layout-panel) ${EXTENSION_DISPLAY_NAME}`;
	}
};
