import type { EmptyStateProps } from "../types/index";

export const EmptyState = ({ icon, title, description, action }: EmptyStateProps): React.ReactElement => (
	<div className="flex flex-col items-center justify-center gap-2 px-4 py-8 text-center text-vs-description">
		{icon && <span className={`codicon codicon-${icon} text-3xl opacity-50`} />}
		<p className="font-semibold text-vs-fg">{title}</p>
		{description && <p className="max-w-[280px] leading-relaxed">{description}</p>}
		{action && <div className="mt-2">{action}</div>}
	</div>
);
