document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["ip", "port"], (data) => {
    document.getElementById("ip").value = data.ip || "localhost";
    document.getElementById("port").value = data.port || "5000";
    updateEndpointPreview();
  });

  // Convenience: Ctrl+S in the popup saves too.
  document.addEventListener("keydown", (e) => {
    const key = (e && typeof e.key === "string") ? e.key.toLowerCase() : "";
    if ((e.ctrlKey || e.metaKey) && key === "s") {
      e.preventDefault();
      document.getElementById("save").click();
    }
  });

  document.getElementById("ip").addEventListener("input", updateEndpointPreview);
  document.getElementById("port").addEventListener("input", updateEndpointPreview);
});

document.getElementById("save").addEventListener("click", () => {
  const ip = document.getElementById("ip").value.trim();
  const port = document.getElementById("port").value.trim();

  chrome.storage.sync.set({ ip, port }, () => {
    const status = document.getElementById("status");
    status.textContent = "Saved.";
    setTimeout(() => (status.textContent = ""), 1500);
  });
});

function updateEndpointPreview() {
  const ip = document.getElementById("ip").value.trim() || "localhost";
  const port = document.getElementById("port").value.trim() || "5000";
  const el = document.getElementById("endpoint");
  if (!el) return;
  el.textContent = `http://${ip}:${port}`;
}
