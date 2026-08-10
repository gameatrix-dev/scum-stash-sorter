const { app, BrowserWindow, protocol, net } = require("electron");
const path = require("path");
const url = require("url");

// Serve the built SPA over a custom scheme: file:// blocks ES modules (CORS).
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { standard: true, secure: true, supportFetchAPI: true } },
]);

const ROOT = path.join(__dirname, "..", "dist-desktop");

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    backgroundColor: "#12140f",
    autoHideMenuBar: true,
    title: "SCUM Skup — Cennik",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadURL("app://local/index.html");
}

app.whenReady().then(() => {
  protocol.handle("app", (request) => {
    const { pathname } = new URL(request.url);
    const rel = decodeURIComponent(pathname).replace(/^\/+/, "") || "index.html";
    let filePath = path.join(ROOT, rel);
    if (!filePath.startsWith(ROOT)) filePath = path.join(ROOT, "index.html");
    return net.fetch(url.pathToFileURL(filePath).toString());
  });

  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
