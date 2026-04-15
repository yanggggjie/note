import * as vscode from "vscode";
import { MESSAGES } from "../constants.js";
import { logger } from "../utils/logger.js";

export const helloWorldCommand = (): void => {
	logger.info("helloWorld command executed");
	vscode.window.showInformationMessage(MESSAGES.HELLO_WORLD);
};
