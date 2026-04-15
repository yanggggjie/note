export const workspace = {
	getConfiguration: () => ({ get: () => undefined }),
	workspaceFolders: undefined,
	onDidChangeConfiguration: () => ({ dispose: () => {} }),
};

export const window = {
	createOutputChannel: () => ({
		appendLine: () => {},
		show: () => {},
		dispose: () => {},
	}),
	showErrorMessage: () => {},
};

export const Uri = {
	joinPath: (..._args: unknown[]) => ({}),
};
