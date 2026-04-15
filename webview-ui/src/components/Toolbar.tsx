import type { ToolbarProps } from "../types/index";

export const Toolbar = ({ title, actions }: ToolbarProps): React.ReactElement => (
	<header className="flex items-center justify-between px-4 py-2 border-b border-vs-border shrink-0">
		<span className="font-semibold text-vs-fg">{title}</span>
		{actions && <div className="flex items-center gap-1.5">{actions}</div>}
	</header>
);
