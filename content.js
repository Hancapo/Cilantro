const btn = document.createElement("button");
btn.textContent = "Send to Blender 🌵";
btn.type = "button";
btn.id = "cilantro";
btn.classList.add(
  "v-btn", "v-btn--block", "v-btn--elevated",
  "bg-primary", "v-btn--density-default", "v-btn-size-default"
);

btn.style.height = "36px"

const div1 = document.createElement("div")
div1.classList.add('v-list-item', 'v-theme--plebMastersDarkTheme',
  'v-list-item--density-default', 'v-list-item--two-line',
  'rounded-0', 'v-list-item--variant-tex');

const spanProxy = document.createElement("span")
spanProxy.className = "v-list-item__underlay"

const divItemContent = document.createElement("div");
divItemContent.className = "v-list-item__content"
divItemContent.setAttribute("data-no-activator", "")

const divPa0 = document.createElement("div");
divPa0.className = "pa-0"

const divItemSub = document.createElement("div");
divItemSub.className = "v-list-item-subtitle"
divItemSub.style.opacity = 1;

div1.appendChild(spanProxy)
div1.appendChild(divItemContent)

divItemContent.appendChild(divPa0)

divPa0.appendChild(divItemSub)

divItemSub.appendChild(btn)

let archetypeName = ''

const observer = new MutationObserver(() => {
  const containers = document.getElementsByClassName("v-overlay-container");
  if (containers.length > 0) {
    const cilantroGaming = containers[0]
    if (cilantroGaming) {
      const _dialog = cilantroGaming.querySelector('[role="dialog"]')
      if (_dialog) {
        archetypeName = cilantroGaming.querySelector('[class="v-card-title text-h5"]').textContent
        let kodoku = _dialog.querySelector('[class="v-col-lg-4 v-col pt-0"]')
        if (kodoku) {
          let snow = kodoku.querySelector('[id="cilantro"')
          if (!snow) {
            kodoku.appendChild(div1)
          }
        }
      }
    }
  }
});

setTimeout(() => {
  observer.observe(document.body, { childList: true, subtree: true });
}, 1000);

function sendAssetName(assetName) {
  fetch("http://localhost:5000", {
    method: "POST",
    body: assetName
  })
    .then(res => res.text())
    .then(_ => alert(assetName + " entity was successfully sent to Blender!"))
    .catch(err => alert("Error: " + err));

}

btn.onclick = () => sendAssetName(archetypeName)


