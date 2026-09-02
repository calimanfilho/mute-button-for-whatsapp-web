(() => {
if (globalThis.__codexWhatsappTabMuteLoaded) {
  return;
}

globalThis.__codexWhatsappTabMuteLoaded = true;

const BUTTON_ID = "codex-whatsapp-tab-mute";
const FALLBACK_ID = "codex-whatsapp-tab-mute-fallback";
const NAV_SELECTORS = [
  ".navbar-primary-section",
  "[data-testid='chatlist-header']",
  "[data-testid='chat-list-header']"
];
const WA_PLUS_SELECTORS = [
  ".wawp-toggle",
  "#wawp-app",
  "[class*='wawp' i]",
  "[id*='wawp' i]"
];

let lastMutedState = false;

function getIcon(muted) {
  return muted
    ? `<span class="codex-whatsapp-tab-mute-icon" aria-hidden="true">&#xF0581;</span>`
    : `<span class="codex-whatsapp-tab-mute-icon" aria-hidden="true">&#xF057E;</span>`;
}

function setButtonState(button, muted) {
  lastMutedState = Boolean(muted);
  button.classList.toggle("is-muted", lastMutedState);
  button.setAttribute("aria-pressed", String(lastMutedState));
  button.setAttribute("title", lastMutedState ? "Unmute WhatsApp tab" : "Mute WhatsApp tab");
  button.setAttribute("aria-label", lastMutedState ? "Unmute WhatsApp tab" : "Mute WhatsApp tab");
  button.innerHTML = getIcon(lastMutedState);
}

async function toggleMute(button) {
  button.disabled = true;

  try {
    const response = await chrome.runtime.sendMessage({ type: "WHATSAPP_TAB_MUTE_TOGGLE" });

    if (response && response.ok) {
      setButtonState(button, response.muted);
    } else {
      console.warn("[WhatsApp Tab Mute]", response && response.error ? response.error : "Unknown toggle error");
    }
  } finally {
    button.disabled = false;
  }
}

function createButton() {
  const button = document.createElement("button");
  button.id = BUTTON_ID;
  button.type = "button";
  button.className = "codex-whatsapp-tab-mute-button";
  button.addEventListener("click", () => toggleMute(button));
  setButtonState(button, lastMutedState);
  return button;
}

function findNavbar() {
  const waPlusTarget = document.querySelector("header hr");

  if (waPlusTarget && waPlusTarget.parentElement) {
    return waPlusTarget.parentElement;
  }

  for (const selector of WA_PLUS_SELECTORS) {
    const element = document.querySelector(selector);

    if (element && element.parentElement) {
      return element.parentElement;
    }
  }

  for (const selector of NAV_SELECTORS) {
    const element = document.querySelector(selector);

    if (element) {
      return element;
    }
  }

  return null;
}

function installButton() {
  const fallback = document.getElementById(FALLBACK_ID);

  if (fallback) {
    fallback.remove();
  }

  const nav = findNavbar();

  if (!nav) {
    return false;
  }

  const existing = document.getElementById(BUTTON_ID);

  if (existing && existing.parentElement === nav) {
    return true;
  }

  if (existing) {
    existing.remove();
  }

  nav.appendChild(createButton());
  console.info("[WhatsApp Tab Mute] Button installed in WhatsApp navbar.");
  return true;
}

installButton();

setTimeout(() => {
  installButton();
}, 5000);

const observer = new MutationObserver(() => {
  installButton();
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});

chrome.runtime.onMessage.addListener((message) => {
  if (!message || message.type !== "WHATSAPP_TAB_MUTE_STATE") {
    return;
  }

  const button = document.getElementById(BUTTON_ID);

  if (button) {
    setButtonState(button, message.muted);
  } else {
    lastMutedState = Boolean(message.muted);
  }
});
})();
