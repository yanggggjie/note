import * as vscode from "vscode";
import { STORAGE_DIR } from "../constants.js";
import { deleteFile, ensureDir, fileExists, listFiles, readFile, writeFile } from "../utils/fsUtils.js";
import { logger } from "../utils/logger.js";

const getRoot = (): vscode.Uri | null => {
	const folders = vscode.workspace.workspaceFolders;
	if (!folders || folders.length === 0) return null;
	return vscode.Uri.joinPath(folders[0].uri, STORAGE_DIR);
};

export const write = async (relativePath: string, content: string): Promise<void> => {
	const root = getRoot();
	if (!root) {
		throw new Error("No workspace folder open. Open a folder to use workspace storage.");
	}
	try {
		const uri = vscode.Uri.joinPath(root, relativePath);
		await writeFile(uri, content);
		logger.info(`WorkspaceStorage.write: ${relativePath}`);
	} catch (error) {
		logger.error(`WorkspaceStorage.write failed: ${relativePath}`, error);
		throw error;
	}
};

export const read = async (relativePath: string): Promise<string | null> => {
	const root = getRoot();
	if (!root) return null;
	try {
		const uri = vscode.Uri.joinPath(root, relativePath);
		if (!(await fileExists(uri))) return null;
		return await readFile(uri);
	} catch (error) {
		logger.error(`WorkspaceStorage.read failed: ${relativePath}`, error);
		return null;
	}
};

export const list = async (subdir?: string): Promise<string[]> => {
	const root = getRoot();
	if (!root) return [];
	try {
		const base = subdir ? vscode.Uri.joinPath(root, subdir) : root;
		await ensureDir(base);
		return await listFiles(base);
	} catch (error) {
		logger.error("WorkspaceStorage.list failed", error);
		return [];
	}
};

export const exists = async (relativePath: string): Promise<boolean> => {
	const root = getRoot();
	if (!root) return false;
	const uri = vscode.Uri.joinPath(root, relativePath);
	return fileExists(uri);
};

export const deleteEntry = async (relativePath: string): Promise<void> => {
	const root = getRoot();
	if (!root) {
		throw new Error("No workspace folder open. Open a folder to use workspace storage.");
	}
	try {
		const uri = vscode.Uri.joinPath(root, relativePath);
		await deleteFile(uri);
		logger.info(`WorkspaceStorage.delete: ${relativePath}`);
	} catch (error) {
		logger.error(`WorkspaceStorage.delete failed: ${relativePath}`, error);
		throw error;
	}
};
