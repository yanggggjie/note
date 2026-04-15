<p align="center">
  <img src="logo.svg" alt="Stratum Logo" width="120">
</p>

# Stratum 🪨

![Node.js Version](https://img.shields.io/badge/Node.js-22%2B-339933?logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18%2B-61DAFB?logo=react&logoColor=white)
![VSCode](https://img.shields.io/badge/VSCode-1.85%2B-007ACC?logo=visualstudiocode&logoColor=white)
![Vitest](https://img.shields.io/badge/Tested%20with-Vitest-6E9F18?logo=vitest&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?logo=open-source-initiative&logoColor=white)

**Stratum** is a production-grade scaffold for building VSCode extensions with a React webview. Built once, forked forever — every extension you ship is a new stratum on top of this foundation.

---

## Features 🌟

- **React Webview**: Full React 18 app embedded inside the VSCode sidebar and panel, built with Vite.
- **Webview Messaging**: Type-safe message passing between the extension host and the React UI.
- **Workspace Storage**: Read/write files in a workspace-scoped `.stratum/` directory via `WorkspaceStorage`.
- **Global Storage**: Persist key-value data across workspaces via VSCode's `globalState`.
- **Developer Experience**: esbuild for fast extension bundling, Vite HMR for webview development.
- **Code Quality**: Biome for linting and formatting, Husky + commitlint for git hooks.
- **Testing**: Vitest with a vscode module mock — unit-testable without launching VSCode.
- **TypeScript Strict Mode**: Full strict TypeScript across both the extension host and webview.

---

## Getting Started 🚀

### Prerequisites

Ensure you have the following installed:

- **Node.js**: v22 or later
- **npm**: v11 or later
- **VSCode**: v1.85 or later

---

### Installation ⚙️

1. Clone the repository:

   ```bash
   git clone https://github.com/Kosha-Nirman/stratum my-extension
   cd my-extension
   ```

2. Install all dependencies (extension + webview):

   ```bash
   npm run install:all
   ```

3. Build the project:

   ```bash
   npm run build
   ```

4. Press **F5** in VSCode to launch the Extension Development Host.

   The Stratum panel will appear in the Activity Bar. You can also open it via `Cmd+Shift+P → Stratum: Open Panel`.

---

### Development 🛠️

Run the extension host and webview in watch mode simultaneously:

```bash
npm run watch
```

The webview supports **Vite HMR** — changes to React components reflect instantly without reloading the extension.

---

## How to Fork for a New Extension 🍴

1. Clone or copy this repo:

   ```bash
   cp -r stratum my-ext && cd my-ext
   ```

2. Search-replace across all files (case-sensitive):
   - `stratum` → `my-ext`
   - `Stratum` → `MyExt`

3. Update `package.json`: `name`, `displayName`, `description`, `publisher`

4. Rename the storage directory in `src/constants.ts`:

   ```ts
   export const STORAGE_DIR = ".my-ext";
   ```

5. Replace `assets/icon.svg` with your own icon.

6. Delete `src/commands/helloWorld.ts` (example only).

7. Update `CHANGELOG.md` and this `README.md`.

8. Verify everything works:

   ```bash
   npm run install:all && npm run build
   ```

---

## Project Structure 📂

```
stratum/
├── src/                        # Extension host (Node.js, bundled via esbuild)
│   ├── extension.ts            # activate() / deactivate() entry points
│   ├── commands/               # VSCode command handlers
│   ├── panels/                 # MainPanel (hosts the React webview)
│   ├── providers/              # SidebarProvider, StatusBarItem
│   ├── storage/                # WorkspaceStorage + GlobalStorage
│   ├── utils/                  # logger, fsUtils
│   └── types/                  # Shared TypeScript interfaces
│
├── webview-ui/                 # React 18 app (Vite, served inside the panel)
│   └── src/
│       ├── App.tsx
│       ├── vscode.ts           # acquireVsCodeApi() singleton
│       ├── hooks/              # useVSCode, useTheme
│       ├── components/         # Layout, Toolbar, ChatInput, EmptyState
│       └── styles/             # VSCode-token CSS, CSS Modules
│
├── esbuild.config.mjs          # Extension bundler config
├── vitest.config.ts            # Test runner config
├── biome.json                  # Linter and formatter config
├── tsconfig.json               # Extension TypeScript config
├── tsconfig.webview.json       # Webview TypeScript config
├── .commitlintrc.yml           # Commit message conventions
├── .nvmrc                      # Node version pin
└── package.json                # Scripts and dependencies
```

---

## Adding a New Command 🔧

1. Create `src/commands/myCommand.ts`:

   ```typescript
   import * as vscode from "vscode";

   export function myCommand(): void {
     vscode.window.showInformationMessage("My command ran!");
   }
   ```

2. Add the command ID to `src/constants.ts` under `COMMANDS`:

   ```typescript
   export const COMMANDS = {
     MY_COMMAND: "stratum.myCommand",
   } as const;
   ```

3. Register it in `src/commands/index.ts`:

   ```typescript
   context.subscriptions.push(
     vscode.commands.registerCommand(COMMANDS.MY_COMMAND, myCommand),
   );
   ```

4. Add the contribution entry to `package.json` under `contributes.commands`.

---

## Adding a Webview Message Type 📨

**Extension → Webview** (post from `PanelUtils.ts` or a provider):

```typescript
post({ type: "my.event", payload: { data: "..." } });
```

**Webview → Extension** (handle in `handleWebviewMessage`):

```typescript
case "my.request": {
  const req = msg.payload as MyRequest;
  // process...
  post({ type: "my.response", payload: result });
  break;
}
```

**React side** (in `App.tsx` or a feature component):

```typescript
useMessageListener("my.event", (payload) => {
  // handle message from extension host
});

sendMessage("my.request", { data: "..." });
```

---

## Scripts 📋

| Script | Description |
|--------|-------------|
| `npm run install:all` | Install extension + webview dependencies |
| `npm run build` | Build extension and webview for production |
| `npm run watch` | Watch mode for both extension and webview |
| `npm run test` | Run unit tests with Vitest |
| `npm run typecheck` | TypeScript type check (extension) |
| `npm run typecheck:webview` | TypeScript type check (webview) |
| `npm run lint` | Lint with Biome |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run format` | Format all files with Biome |

---

## License 📜

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.
