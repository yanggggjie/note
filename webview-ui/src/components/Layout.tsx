import type { LayoutProps } from "../types/index";

export const Layout = ({ header, children, footer }: LayoutProps): React.ReactElement => (
	<div className="flex flex-col h-full overflow-hidden">
		{header && <div className="shrink-0">{header}</div>}
		<main className="flex-1 overflow-y-auto overflow-x-hidden">{children}</main>
		{footer && <div className="shrink-0 border-t border-vs-border">{footer}</div>}
	</div>
);
