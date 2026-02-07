chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  const url = details && typeof details.url === "string" ? details.url : "";

  // Avoid internal pages (edge://, chrome://) and pages we don't have host permissions for.
  if (!url.startsWith("https://forge.plebmasters.de/objects/")) {
    return;
  }

  chrome.scripting.executeScript(
    {
      target: { tabId: details.tabId },
      files: ["content.js"]
    },
    () => {
      // Swallow injection errors (tab closed, navigation race, etc.).
      // Content script itself is idempotent, so re-injection is safe.
      void chrome.runtime.lastError;
    }
  );
});


chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});
