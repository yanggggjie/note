import type { ChatMessageProps } from "../types/index";

export const ChatMessage = ({ role, content, streaming }: ChatMessageProps): React.ReactElement => (
	<div
		className={`flex flex-col gap-1 px-3 py-2.5 border-b border-vs-border last:border-b-0 ${
			role === "user" ? "bg-vs-user-msg" : "bg-vs-assistant-msg"
		}`}
	>
		<span
			className={`text-[11px] font-semibold uppercase tracking-[0.06em] opacity-60 ${
				role === "user" ? "text-vs-link" : ""
			}`}
		>
			{role === "user" ? "You" : "Assistant"}
		</span>
		<div className="leading-relaxed whitespace-pre-wrap break-words">
			{content}
			{streaming && (
				<span className="inline-block w-0.5 h-[1em] bg-vs-fg align-text-bottom ml-px animate-blink" />
			)}
		</div>
	</div>
);
