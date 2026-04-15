import * as vscode from "vscode";
import { EXTENSION_DISPLAY_NAME } from "../constants.js";

let outputChannel: vscode.OutputChannel | undefined;

const getChannel = (): vscode.OutputChannel => {
	if (!outputChannel) {
		outputChannel = vscode.window.createOutputChannel(EXTENSION_DISPLAY_NAME);
	}
	return outputChannel;
};

const redact = (message: string): string =>
	message.replace(/(sk-[A-Za-z0-9\-_]{10,})/g, "[REDACTED]");

const timestamp = (): string => new Date().toISOString();

export const logger = {
	info: (message: string): void => {
		getChannel().appendLine(`[${timestamp()}] INFO  ${redact(message)}`);
	},
	warn: (message: string): void => {
		getChannel().appendLine(`[${timestamp()}] WARN  ${redact(message)}`);
	},
	error: (message: string, error?: unknown): void => {
		const errStr = error instanceof Error ? ` — ${error.message}` : "";
		getChannel().appendLine(`[${timestamp()}] ERROR ${redact(message)}${errStr}`);
	},
	show: (): void => {
		getChannel().show();
	},
	dispose: (): void => {
		outputChannel?.dispose();
		outputChannel = undefined;
	},
};
