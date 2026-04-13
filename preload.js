const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openLauncher:   ()          => ipcRenderer.send('open-launcher'),
  closeWindow:    ()          => ipcRenderer.send('close-window'),
  minimizeWindow: ()          => ipcRenderer.send('minimize-window'),
  launchClient:   (exePath)   => ipcRenderer.send('launch-client', exePath),
  getClients:     ()          => ipcRenderer.invoke('get-clients'),  // Returns a Promise
  onLaunchError:  (cb)        => ipcRenderer.on('launch-error', (_, msg) => cb(msg)),
});