import type { ReactNode } from "react";

export type VSCodeAPI = {
	postMessage(message: unknown): void;
	getState(): unknown;
	setState(state: unknown): void;
};

export type MessageHandler = (payload: unknown) => void;

export type ThemeKind = "dark" | "light" | "high-contrast";

export type MessageRole = "user" | "assistant";

export interface LayoutProps {
	header?: ReactNode;
	children: ReactNode;
	footer?: ReactNode;
}

export interface ToolbarProps {
	title: string;
	actions?: ReactNode;
}

export interface EmptyStateProps {
	icon?: string;
	title: string;
	description?: string;
	action?: ReactNode;
}

export interface ChatMessageProps {
	role: MessageRole;
	content: string;
	streaming?: boolean;
}

export interface ChatInputProps {
	value: string;
	onChange: (value: string) => void;
	onSubmit: () => void;
	disabled?: boolean;
}
