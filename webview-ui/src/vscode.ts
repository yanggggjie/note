import type { VSCodeAPI } from "./types/index";

declare function acquireVsCodeApi(): VSCodeAPI;

const vscode: VSCodeAPI = acquireVsCodeApi();
export default vscode;
