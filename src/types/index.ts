export interface ExtensionMessage {
	type: string;
	payload?: unknown;
}

export interface StorageWriteRequest {
	path: string;
	content: string;
}

export interface StorageReadRequest {
	path: string;
}

export interface StorageReadResponse {
	content: string | null;
}

export interface WebviewOptions {
	enableScripts: boolean;
	localResourceRoots: import("vscode").Uri[];
}
