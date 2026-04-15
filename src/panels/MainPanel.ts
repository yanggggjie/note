import * as vscode from "vscode";
import { MESSAGES } from "../constants.js";
import type { ExtensionMessage } from "../types/index.js";
import { buildWebviewHtml, handleWebviewMessage } from "./PanelUtils.js";

export class MainPanel {
	public static currentPanel: MainPanel | undefined;
	private readonly panel: vscode.WebviewPanel;
	private disposables: vscode.Disposable[] = [];

	private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		this.panel = panel;
		this.panel.webview.html = buildWebviewHtml(panel.webview, extensionUri);
		this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
		this.panel.webview.onDidReceiveMessage(
			(msg: unknown) => handleWebviewMessage(msg, (m) => this.post(m)),
			null,
			this.disposables,
		);
	}

	public static createOrShow = (extensionUri: vscode.Uri): void => {
		const column = vscode.window.activeTextEditor?.viewColumn ?? vscode.ViewColumn.One;

		if (MainPanel.currentPanel) {
			MainPanel.currentPanel.panel.reveal(column);
			return;
		}

		const panel = vscode.window.createWebviewPanel("stratumPanel", MESSAGES.PANEL_TITLE, column, {
			enableScripts: true,
			retainContextWhenHidden: true,
			localResourceRoots: [
				vscode.Uri.joinPath(extensionUri, "webview-ui", "dist"),
				vscode.Uri.joinPath(extensionUri, "assets"),
			],
		});

		MainPanel.currentPanel = new MainPanel(panel, extensionUri);
	};

	private post = (message: ExtensionMessage): void => {
		this.panel.webview.postMessage(message).then(undefined, () => {});
	};

	public dispose = (): void => {
		MainPanel.currentPanel = undefined;
		this.panel.dispose();
		for (const d of this.disposables) d.dispose();
		this.disposables = [];
	};
}
