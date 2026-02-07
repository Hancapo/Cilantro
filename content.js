(() => {
  // This script may be injected multiple times (SPA navigation, webNavigation listener).
  // Guard so we don't redeclare top-level consts or attach duplicate observers.
  if (globalThis.__cilantroAssetImporterInjected) {
    return;
  }
  globalThis.__cilantroAssetImporterInjected = true;

  const btn = document.createElement("button");
  btn.textContent = "Send to Blender 🌵";
  btn.type = "button";
  btn.id = "cilantro";
  btn.classList.add(
    "v-btn", "v-btn--block", "v-btn--elevated",
    "bg-primary", "v-btn--density-default", "v-btn-size-default"
  );

  btn.style.height = "36px";

  const div1 = document.createElement("div");
  div1.classList.add('v-list-item', 'v-theme--plebMastersDarkTheme',
    'v-list-item--density-default', 'v-list-item--two-line',
    'rounded-0', 'v-list-item--variant-tex');

  const spanProxy = document.createElement("span");
  spanProxy.className = "v-list-item__underlay";

  const divItemContent = document.createElement("div");
  divItemContent.className = "v-list-item__content";
  divItemContent.setAttribute("data-no-activator", "");

  const divPa0 = document.createElement("div");
  divPa0.className = "pa-0";

  const divItemSub = document.createElement("div");
  divItemSub.className = "v-list-item-subtitle";
  divItemSub.style.opacity = 1;

  div1.appendChild(spanProxy);
  div1.appendChild(divItemContent);

  divItemContent.appendChild(divPa0);
  divPa0.appendChild(divItemSub);
  divItemSub.appendChild(btn);

  let archetypeName = "";

  const observer = new MutationObserver(() => {
    const containers = document.getElementsByClassName("v-overlay-container");
    if (containers.length === 0) {
      return;
    }

    const cilantroGaming = containers[0];
    if (!cilantroGaming) {
      return;
    }

    const dialog = cilantroGaming.querySelector('[role="dialog"]');
    if (!dialog) {
      return;
    }

    const titleEl = dialog.querySelector(".v-card-title.text-h5");
    if (titleEl) {
      archetypeName = titleEl.textContent.trim();
    }

    const kodoku = dialog.querySelector(".v-col-lg-4.v-col.pt-0");
    if (!kodoku) {
      return;
    }

    const snow = kodoku.querySelector("#cilantro");
    if (!snow) {
      kodoku.appendChild(div1);
    }
  });

  setTimeout(() => {
    observer.observe(document.body, { childList: true, subtree: true });
  }, 1000);

  function getActiveDialog() {
    const containers = document.getElementsByClassName("v-overlay-container");
    if (containers.length === 0) {
      return null;
    }

    const overlay = containers[0];
    return overlay ? overlay.querySelector('[role="dialog"]') : null;
  }

  function readArchetypeName(dialog) {
    const titleEl = dialog ? dialog.querySelector(".v-card-title.text-h5") : null;
    const name = titleEl ? titleEl.textContent.trim() : "";
    return name || "";
  }

  function readCategoriesValue(dialog) {
    // The Categories input id is dynamic, but it uses a stable prefix:
    //   detail-input-Categories-...
    const input = dialog ? dialog.querySelector('input[id^="detail-input-Categories-"]') : null;
    const value = input && typeof input.value === "string" ? input.value.trim() : "";
    return value || "";
  }

  function sendAssetName(assetName, categories) {
    chrome.storage.sync.get({ ip: "localhost", port: "5000" }, (data) => {
      const ip = (data.ip || "localhost").trim();
      const port = (data.port || "5000").trim();
      const url = `http://${ip}:${port}`;

      // Encode each field so we can safely use ';' as a delimiter.
      // Server should split on ';' and URL-decode each side.
      const payload = `${encodeURIComponent(assetName || "")};${encodeURIComponent(categories || "")}`;

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=UTF-8"
        },
        body: payload
      })
        .then(res => res.text())
        .then(_ => alert(assetName + " entity was successfully sent to Blender!"))
        .catch(err => alert("Error: " + err));
    });
  }

  btn.onclick = () => {
    const dialog = getActiveDialog();
    const name = readArchetypeName(dialog) || archetypeName;
    const categories = readCategoriesValue(dialog);
    sendAssetName(name, categories);
  };
})();
