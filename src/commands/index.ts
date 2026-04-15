import * as vscode from "vscode";
import { COMMANDS } from "../constants.js";
import { MainPanel } from "../panels/MainPanel.js";
import { helloWorldCommand } from "./helloWorld.js";

export const registerCommands = (context: vscode.ExtensionContext): void => {
	context.subscriptions.push(
		vscode.commands.registerCommand(COMMANDS.HELLO_WORLD, helloWorldCommand),
		vscode.commands.registerCommand(COMMANDS.OPEN_PANEL, () => {
			MainPanel.createOrShow(context.extensionUri);
		}),
	);
};
