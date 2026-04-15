import { useEffect, useState } from "react";
import type { ThemeKind } from "../types/index";

const detectTheme = (): ThemeKind => {
	const body = document.body;
	if (body.classList.contains("vscode-high-contrast")) return "high-contrast";
	if (body.classList.contains("vscode-dark")) return "dark";
	return "light";
};

export const useTheme = (): ThemeKind => {
	const [theme, setTheme] = useState<ThemeKind>(detectTheme);

	useEffect(() => {
		const observer = new MutationObserver((): void => {
			setTheme(detectTheme());
		});
		observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
		return () => observer.disconnect();
	}, []);

	return theme;
};
