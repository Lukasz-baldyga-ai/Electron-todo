const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getTasks: () => ipcRenderer.invoke('get-tasks'),
  saveTasks: (tasks) => ipcRenderer.invoke('save-tasks', tasks),
  getShortcut: () => ipcRenderer.invoke('get-shortcut'),
  saveShortcut: (shortcut) => ipcRenderer.invoke('save-shortcut', shortcut),
  openSettings: () => ipcRenderer.invoke('open-settings')
});
