chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || message.type !== "WHATSAPP_TAB_MUTE_TOGGLE") {
    return false;
  }

  const tabId = sender.tab && sender.tab.id;

  if (typeof tabId !== "number") {
    sendResponse({ ok: false, error: "No tab id available." });
    return false;
  }

  chrome.tabs.get(tabId, (tab) => {
    if (chrome.runtime.lastError) {
      sendResponse({ ok: false, error: chrome.runtime.lastError.message });
      return;
    }

    const muted = !(tab.mutedInfo && tab.mutedInfo.muted);

    chrome.tabs.update(tabId, { muted }, () => {
      if (chrome.runtime.lastError) {
        sendResponse({ ok: false, error: chrome.runtime.lastError.message });
        return;
      }

      sendResponse({ ok: true, muted });
    });
  });

  return true;
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab.url || !tab.url.startsWith("https://web.whatsapp.com/")) {
    return;
  }

  if (!changeInfo.mutedInfo) {
    return;
  }

  chrome.tabs.sendMessage(tabId, {
    type: "WHATSAPP_TAB_MUTE_STATE",
    muted: changeInfo.mutedInfo.muted
  }, () => {
    chrome.runtime.lastError;
  });
});
