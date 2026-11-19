# Corporate Tragedy EXT

A Manifest V3 Chrome extension prototype for adding a VS Code-inspired workspace skin to websites without replacing their apps, sessions, or authentication.

## v0.1

- Popup toggle for the current website (uses Chrome's active-tab permission)
- Dark workspace palette, scrollbar and selection styling
- Floating workspace toggle widget
- Per-domain enable preference
- No account credentials or page content collected

## Install locally

1. Clone/download this repository.
2. Open `chrome://extensions`.
3. Enable **Developer mode**.
4. Select **Load unpacked** and choose this repository folder.
5. Open a website, click the extension icon, then **Enable Workspace**.

## Scope and next iteration

This first pass is a lightweight theme overlay, not yet a full site restructuring. Next work will add site adapters, starting with WhatsApp Web and ChatGPT, including workspace layout, tabs and explorer behavior. Those integrations will be developed against real page DOMs and tested incrementally.

## Permissions

- `activeTab`: access only the tab after the user invokes the extension
- `scripting`: inject the workspace script on demand
- `storage`: remember the per-site toggle

No broad host permissions are requested.
