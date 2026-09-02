# Store submission metadata

## Extension name

Mute Button for WhatsApp Web

## Short description

Add a quick mute/unmute button inside WhatsApp Web using the browser's native tab mute.

## Full description

Mute Button for WhatsApp Web adds a small mute/unmute button inside the WhatsApp Web interface.

It is useful when you keep WhatsApp Web open as an app window and want a quick way to silence or re-enable notification sounds without muting the entire browser or changing system audio settings.

Features:

- Adds a compact mute/unmute button to WhatsApp Web.
- Uses the browser's native tab mute behavior.
- Works locally in the browser.
- Does not collect, store, transmit, or analyze messages, contacts, media, account data, browsing history, or clipboard content.
- Does not use analytics, ads, tracking, or external servers.

This extension is an independent utility and is not affiliated with, endorsed by, sponsored by, or officially connected to WhatsApp LLC or Meta Platforms, Inc.

## Category

Productivity

## Permission justification

### `tabs`

Required to read and change the muted state of the current WhatsApp Web tab when the user clicks the mute/unmute button.

### `*://web.whatsapp.com/*`

Required to add the mute/unmute button only on WhatsApp Web.

## Data collection disclosure

This extension does not collect or transmit user data.

Data not collected:

- personally identifiable information
- health information
- financial/payment information
- authentication information
- personal communications
- location
- web history
- user activity
- website content

## Privacy policy

Use `PRIVACY_POLICY.md` as the privacy policy text or publish that text at a public URL and use the URL in the store dashboard.

## Files prepared for upload

### Extension package

`dist/mute-button-for-whatsapp-web-1.0.0.zip`

### Icon

`icons/icon-128.png`

### Screenshots

`store-assets/screenshot-main-1280x800.png`

Original source screenshot:

`store-assets/screenshot-main.png`

## Suggested support text

If the button does not appear, reload WhatsApp Web or disable other WhatsApp Web extensions temporarily to check for interface conflicts.
