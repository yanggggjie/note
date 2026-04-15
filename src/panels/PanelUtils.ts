import * as crypto from "node:crypto";
import * as vscode from "vscode";
import { MESSAGES } from "../constants.js";
import { read, write } from "../storage/WorkspaceStorage.js";
import type { ExtensionMessage, StorageReadRequest, StorageWriteRequest } from "../types/index.js";
import { logger } from "../utils/logger.js";

const DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;

export const getNonce = (): string => crypto.randomBytes(16).toString("hex");

export const getWebviewUri = (
	webview: vscode.Webview,
	extensionUri: vscode.Uri,
	...pathSegments: string[]
): vscode.Uri => webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, ...pathSegments));

export const buildWebviewHtml = (webview: vscode.Webview, extensionUri: vscode.Uri): string => {
	const nonce = getNonce();

	if (DEV_SERVER_URL) {
		const csp = [
			`default-src 'none'`,
			`script-src 'nonce-${nonce}' ${DEV_SERVER_URL}`,
			`style-src 'unsafe-inline' ${DEV_SERVER_URL}`,
			`connect-src ${DEV_SERVER_URL} ${DEV_SERVER_URL.replace("http", "ws")}`,
			`img-src data:`,
		].join("; ");
		return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Security-Policy" content="${csp}" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Stratum</title>
</head>
<body>
  <div id="root"></div>
  <script nonce="${nonce}" type="module" src="${DEV_SERVER_URL}/@vite/client"></script>
  <script nonce="${nonce}" type="module" src="${DEV_SERVER_URL}/src/main.tsx"></script>
</body>
</html>`;
	}

	const scriptUri = getWebviewUri(webview, extensionUri, "webview-ui", "dist", "assets", "main.js");
	const styleUri = getWebviewUri(webview, extensionUri, "webview-ui", "dist", "assets", "main.css");

	const csp = [
		`default-src 'none'`,
		`script-src 'nonce-${nonce}'`,
		`style-src ${webview.cspSource} 'unsafe-inline'`,
		`img-src ${webview.cspSource} data:`,
		`font-src ${webview.cspSource}`,
	].join("; ");

	return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Security-Policy" content="${csp}" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="${styleUri}" />
  <title>Stratum</title>
</head>
<body>
  <div id="root"></div>
  <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
};

export const handleWebviewMessage = (
	raw: unknown,
	post: (msg: ExtensionMessage) => void,
): void => {
	if (typeof raw !== "object" || raw === null) return;
	const msg = raw as ExtensionMessage;

	switch (msg.type) {
		case "storage.write":
			void handleStorageWrite(msg.payload as StorageWriteRequest, post);
			break;
		case "storage.read":
			void handleStorageRead(msg.payload as StorageReadRequest, post);
			break;
		default:
			logger.warn(`Unhandled webview message type: "${msg.type}"`);
	}
};

const handleStorageWrite = async (
	req: StorageWriteRequest,
	post: (msg: ExtensionMessage) => void,
): Promise<void> => {
	try {
		await write(req.path, req.content);
		post({ type: "storage.write.done", payload: { path: req.path } });
	} catch (error) {
		logger.error("handleStorageWrite", error);
		const message = MESSAGES.STORAGE_ERROR;
		vscode.window.showErrorMessage(message);
		post({ type: "storage.write.error", payload: { message } });
	}
};

const handleStorageRead = async (
	req: StorageReadRequest,
	post: (msg: ExtensionMessage) => void,
): Promise<void> => {
	try {
		const content = await read(req.path);
		post({ type: "storage.read.response", payload: { content } });
	} catch (error) {
		logger.error("handleStorageRead", error);
		post({ type: "storage.read.response", payload: { content: null } });
	}
};
