import { useCallback, useEffect } from "react";
import type { MessageHandler } from "../types/index";
import vscode from "../vscode";

export const useVSCode = (): { sendMessage: (type: string, payload?: unknown) => void } => {
	const sendMessage = useCallback((type: string, payload?: unknown): void => {
		vscode.postMessage({ type, payload });
	}, []);

	return { sendMessage };
};

export const useMessageListener = (type: string, handler: MessageHandler): void => {
	useEffect(() => {
		const listener = (event: MessageEvent<unknown>): void => {
			const data = event.data;
			if (
				typeof data === "object" &&
				data !== null &&
				"type" in data &&
				(data as { type: unknown }).type === type
			) {
				handler((data as { type: string; payload?: unknown }).payload);
			}
		};
		window.addEventListener("message", listener);
		return () => window.removeEventListener("message", listener);
	}, [type, handler]);
};
