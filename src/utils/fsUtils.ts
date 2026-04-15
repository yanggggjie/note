import * as vscode from "vscode";

export const fileExists = async (uri: vscode.Uri): Promise<boolean> => {
	try {
		await vscode.workspace.fs.stat(uri);
		return true;
	} catch {
		return false;
	}
};

export const readFile = async (uri: vscode.Uri): Promise<string> => {
	const bytes = await vscode.workspace.fs.readFile(uri);
	return Buffer.from(bytes).toString("utf8");
};

export const writeFile = async (uri: vscode.Uri, content: string): Promise<void> => {
	const bytes = Buffer.from(content, "utf8");
	await ensureParentDir(uri);
	await vscode.workspace.fs.writeFile(uri, bytes);
};

export const deleteFile = async (uri: vscode.Uri): Promise<void> => {
	await vscode.workspace.fs.delete(uri);
};

export const listFiles = async (uri: vscode.Uri): Promise<string[]> => {
	const entries = await vscode.workspace.fs.readDirectory(uri);
	return entries.filter(([, type]) => type === vscode.FileType.File).map(([name]) => name);
};

export const ensureDir = async (uri: vscode.Uri): Promise<void> => {
	try {
		await vscode.workspace.fs.createDirectory(uri);
	} catch {
		// already exists
	}
};

const ensureParentDir = async (uri: vscode.Uri): Promise<void> => {
	const parent = vscode.Uri.joinPath(uri, "..");
	await ensureDir(parent);
};
