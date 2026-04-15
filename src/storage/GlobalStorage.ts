import type * as vscode from "vscode";
import { logger } from "../utils/logger.js";

let context: vscode.ExtensionContext | undefined;

export const initialize = (ctx: vscode.ExtensionContext): void => {
	context = ctx;
};

const getContext = (): vscode.ExtensionContext => {
	if (!context) throw new Error("GlobalStorage not initialized — call initialize() first.");
	return context;
};

export const get = <T>(key: string): T | undefined => getContext().globalState.get<T>(key);

export const set = async (key: string, value: unknown): Promise<void> => {
	try {
		await getContext().globalState.update(key, value);
		logger.info(`GlobalStorage.set: ${key}`);
	} catch (error) {
		logger.error(`GlobalStorage.set failed: ${key}`, error);
		throw error;
	}
};

export const deleteEntry = async (key: string): Promise<void> => {
	try {
		await getContext().globalState.update(key, undefined);
		logger.info(`GlobalStorage.delete: ${key}`);
	} catch (error) {
		logger.error(`GlobalStorage.delete failed: ${key}`, error);
		throw error;
	}
};

export const keys = (): readonly string[] => getContext().globalState.keys();
