# Publishing to the VS Code Marketplace

---

## Prerequisites

- A [Microsoft account](https://account.microsoft.com)
- A [Visual Studio Marketplace publisher](https://marketplace.visualstudio.com/manage)
- `@vscode/vsce` installed globally:

  ```bash
  npm install -g @vscode/vsce
  ```

---

## Step 1 — Create a Publisher

1. Go to [marketplace.visualstudio.com/manage](https://marketplace.visualstudio.com/manage)
2. Sign in with your Microsoft account
3. Click **Create publisher**
4. Choose a publisher ID (e.g. `yourname`) — this cannot be changed later
5. Update `package.json` to match:

   ```json
   "publisher": "yourname"
   ```

---

## Step 2 — Create a Personal Access Token (PAT)

1. Go to [dev.azure.com](https://dev.azure.com) and sign in
2. Click your profile icon → **Personal access tokens**
3. Click **New Token** and configure:
   - **Name**: anything (e.g. `vsce-publish`)
   - **Organization**: All accessible organizations
   - **Expiration**: your preference
   - **Scopes**: select **Custom defined** → check **Marketplace → Manage**
4. Click **Create** and **copy the token** — you won't see it again

---

## Step 3 — Authenticate vsce

```bash
vsce login <publisher-id>
```

Paste your PAT when prompted. Your credentials are stored locally and reused for future publishes.

---

## Step 4 — Prepare package.json

Before publishing, make sure these fields are set:

```json
{
  "name": "your-extension-id",
  "displayName": "Your Extension",
  "description": "A short description shown on the marketplace page.",
  "version": "1.0.0",
  "publisher": "yourname",
  "icon": "assets/icon.png",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourname/your-extension"
  },
  "license": "MIT",
  "categories": ["Other"],
  "engines": {
    "vscode": "^1.85.0"
  }
}
```

> **Note:** The marketplace requires a `icon` that is a **PNG**, minimum 128×128px. The current `assets/icon.svg` must be replaced with a PNG before publishing.

---

## Step 5 — Build

Always build before packaging to make sure the output is fresh:

```bash
npm run build
```

---

## Step 6 — Package

Creates a `.vsix` file you can inspect before publishing:

```bash
vsce package
```

This produces `your-extension-1.0.0.vsix` in the project root.

To test the package locally before publishing:

```bash
code --install-extension your-extension-1.0.0.vsix
```

---

## Step 7 — Publish

```bash
vsce publish
```

Or combine packaging and publishing in one command:

```bash
vsce publish --no-dependencies
```

Once published, your extension will be live at:
`https://marketplace.visualstudio.com/items?itemName=yourname.your-extension-id`

> It can take a few minutes for the listing to appear.

---

## Updating a Published Extension

Bump the version using semver, then publish:

```bash
# patch — bug fixes (1.0.0 → 1.0.1)
vsce publish patch

# minor — new features (1.0.0 → 1.1.0)
vsce publish minor

# major — breaking changes (1.0.0 → 2.0.0)
vsce publish major
```

This automatically updates `version` in `package.json`, commits the change, and publishes.

---

## What Gets Included in the Package

`vsce` packages everything not excluded by `.vscodeignore`. Create one to keep the package lean:

```
.gitignore
.github/
src/
webview-ui/src/
webview-ui/node_modules/
node_modules/
*.ts
!dist/**
!webview-ui/dist/**
!assets/**
commit.md
PUBLISHING.md
```

Only `dist/`, `webview-ui/dist/`, `assets/`, `package.json`, and `README.md` need to be in the final package.

---

## Common Issues

**`vsce` says the icon must be a PNG**
Replace `assets/icon.svg` with `assets/icon.png` (min 128×128px) and update `package.json`.

**Publisher not found**
Make sure the `publisher` field in `package.json` exactly matches your publisher ID on the marketplace.

**PAT expired or invalid**
Run `vsce logout <publisher-id>` then `vsce login <publisher-id>` and create a new PAT.

**Extension not showing in search immediately**
Indexing can take up to 10 minutes. Visit the direct URL to confirm it is live.

**`Missing field in package.json: repository`**
Add a `repository` field — the marketplace shows a warning without it and may reject the submission.
