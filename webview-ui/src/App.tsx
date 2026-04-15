import { useEffect, useRef, useState } from "react";

export const App = (): React.ReactElement => {
	const [input, setInput] = useState<string>("");
	const [items, setItems] = useState<string[]>([]);
	const listRef = useRef<HTMLDivElement>(null);

	const submit = (): void => {
		const text = input.trim();
		if (!text) return;
		setItems((prev) => [...prev, text]);
		setInput("");
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		if (e.key === "Enter") submit();
	};

	useEffect(() => {
		const el = listRef.current;
		if (el) el.scrollTop = el.scrollHeight;
	}, [items]);

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="flex items-center gap-1.5 p-2 border-b border-vs-border shrink-0">
				<input
					className="flex-1 min-w-0 px-2 py-1 bg-vs-input-bg text-vs-input-fg border border-vs-input-border rounded-sm outline-none placeholder:text-vs-placeholder focus:border-vs-focus"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Type something and press Enter…"
					autoComplete="off"
					spellCheck={false}
				/>
				<button
					type="button"
					className="px-2.5 py-1 bg-vs-btn text-vs-btn-fg rounded-sm font-semibold cursor-pointer shrink-0 enabled:hover:bg-vs-btn-hover disabled:opacity-40 disabled:cursor-default"
					onClick={submit}
					disabled={!input.trim()}
				>
					↵
				</button>
			</div>

			<div className="flex-1 overflow-y-auto py-1" ref={listRef}>
				{items.length === 0 ? (
					<p className="px-3 py-3 text-vs-description">Results will appear here.</p>
				) : (
					items.map((item, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: order is stable
						<div key={i} className="px-3 py-1 leading-relaxed break-words border-b border-vs-border">
							{item}
						</div>
					))
				)}
			</div>
		</div>
	);
};
