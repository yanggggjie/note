import { useRef } from "react";
import type { ChatInputProps } from "../types/index";

export const ChatInput = ({ value, onChange, onSubmit, disabled }: ChatInputProps): React.ReactElement => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			onSubmit();
		}
	};

	const handleInput = (): void => {
		const el = textareaRef.current;
		if (!el) return;
		el.style.height = "auto";
		el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
	};

	return (
		<div className="flex flex-col gap-1 px-2.5 pt-2 pb-1.5 border-t border-vs-border bg-vs-bg">
			<div className="flex items-end gap-1.5 bg-vs-input-bg border border-vs-input-border rounded pl-2.5 pr-1.5 py-1.5 transition-colors focus-within:border-vs-focus">
				<textarea
					ref={textareaRef}
					className="flex-1 bg-transparent border-none outline-none resize-none text-vs-input-fg leading-relaxed min-h-5 max-h-40 overflow-y-auto placeholder:text-vs-placeholder disabled:opacity-50"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onKeyDown={handleKeyDown}
					onInput={handleInput}
					placeholder="Message… (Enter to send, Shift+Enter for newline)"
					rows={1}
					disabled={disabled}
				/>
				<button
					type="button"
					className="flex items-center justify-center w-[26px] h-[26px] p-0 bg-vs-btn text-vs-btn-fg border-none rounded-sm cursor-pointer shrink-0 transition-colors enabled:hover:bg-vs-btn-hover disabled:opacity-40 disabled:cursor-not-allowed"
					onClick={onSubmit}
					disabled={disabled || !value.trim()}
					title="Send"
				>
					<SendIcon />
				</button>
			</div>
			<p className="text-[11px] text-vs-description opacity-70 px-0.5">
				Enter ↵ to send · Shift+Enter for newline
			</p>
		</div>
	);
};

const SendIcon = (): React.ReactElement => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="14"
		height="14"
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
	>
		<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
	</svg>
);
