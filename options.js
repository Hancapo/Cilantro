document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["ip", "port"], (data) => {
    document.getElementById("ip").value = data.ip || "localhost";
    document.getElementById("port").value = data.port || "5000";
  });
});

document.getElementById("save").addEventListener("click", () => {
  const ip = document.getElementById("ip").value.trim();
  const port = document.getElementById("port").value.trim();

  chrome.storage.sync.set({ ip, port }, () => {
    const status = document.getElementById("status");
    status.textContent = "Saved Configuration ✔️";
    setTimeout(() => (status.textContent = ""), 1500);
  });
});
