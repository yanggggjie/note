import * as vscode from "vscode";
import { buildWebviewHtml, handleWebviewMessage } from "../panels/PanelUtils.js";
import type { ExtensionMessage } from "../types/index.js";

export class SidebarProvider implements vscode.WebviewViewProvider {
	public static readonly viewId = "stratum.sidebarView";

	constructor(private readonly extensionUri: vscode.Uri) {}

	resolveWebviewView = (
		webviewView: vscode.WebviewView,
		_context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	): void => {
		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [
				vscode.Uri.joinPath(this.extensionUri, "webview-ui", "dist"),
				vscode.Uri.joinPath(this.extensionUri, "assets"),
			],
		};
		webviewView.webview.html = buildWebviewHtml(webviewView.webview, this.extensionUri);
		webviewView.webview.onDidReceiveMessage((msg: unknown) =>
			handleWebviewMessage(msg, (m: ExtensionMessage) => {
				webviewView.webview.postMessage(m).then(undefined, () => {});
			}),
		);
	};
}
