const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { execFile } = require('child_process');
const fs = require('fs');

let bootstrapWindow = null;
let launcherWindow = null;

// ← ADD THIS FUNCTION
function getBasePath() {
  return app.isPackaged
    ? path.dirname(process.execPath)
    : __dirname;
}

function createBootstrap() {
  bootstrapWindow = new BrowserWindow({
    width: 900,
    height: 600,
    frame: false,
    resizable: false,
    icon: path.join(__dirname, 'renderer/t3x2.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  });
  bootstrapWindow.loadFile('renderer/bootstrap.html');
  bootstrapWindow.on('closed', () => { bootstrapWindow = null; });
}

function createLauncher() {
  launcherWindow = new BrowserWindow({
    width: 900,
    height: 600,
    frame: false,
    resizable: false,
    show: false,
    icon: path.join(__dirname, 'renderer/t3x2.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  });
  launcherWindow.loadFile('renderer/launcher.html');
  launcherWindow.on('closed', () => { launcherWindow = null; });
  launcherWindow.once('ready-to-show', () => {
    if (bootstrapWindow) bootstrapWindow.close();
    launcherWindow.show();
  });
}

ipcMain.handle('get-clients', () => {
  const clientsDir = path.join(getBasePath(), 'clients'); // ← CHANGED
  if (!fs.existsSync(clientsDir)) return [];
  return fs.readdirSync(clientsDir)
    .filter(name => fs.statSync(path.join(clientsDir, name)).isDirectory())
    .map(name => {
      const folderPath = path.join(clientsDir, name);
      const exe = fs.readdirSync(folderPath).find(f => f.endsWith('.exe'));
      return {
        name,
        folderPath,
        exePath: exe ? path.join(folderPath, exe) : null,
        hasExe: !!exe,
      };
    });
});

ipcMain.on('launch-client', (event, relativePath) => {
  const exePath = path.join(getBasePath(), 'clients', relativePath); // ← CHANGED
  console.log('Trying to launch:', exePath);
  execFile(exePath, { cwd: path.dirname(exePath) }, (err) => {
    if (err) {
      console.log('Launch error:', err.message);
      event.reply('launch-error', err.message);
    } else {
      console.log('Launched successfully!');
    }
  });
});

ipcMain.on('open-launcher', () => createLauncher());

ipcMain.on('close-window', () => {
  if (bootstrapWindow) bootstrapWindow.close();
  if (launcherWindow) launcherWindow.close();
});

ipcMain.on('minimize-window', () => {
  if (bootstrapWindow) bootstrapWindow.minimize();
  if (launcherWindow) launcherWindow.minimize();
});

app.whenReady().then(createBootstrap);

ipcMain.on('open-home', () => {
  createBootstrap();
  if (launcherWindow) launcherWindow.close();
});