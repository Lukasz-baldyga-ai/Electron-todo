const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store');

const store = new Store();
let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 700,
    height: 700,
    frame: true,
    resizable: true,
    alwaysOnTop: true,
    skipTaskbar: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  mainWindow.loadFile('index.html');
  mainWindow.hide();

  mainWindow.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });
}

function toggleWindow() {
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    mainWindow.show();
    mainWindow.center();
    mainWindow.focus();
  }
}

function registerShortcut() {
  const shortcut = store.get('shortcut', 'CommandOrControl+Shift+T');
  
  globalShortcut.unregisterAll();
  
  const success = globalShortcut.register(shortcut, () => {
    toggleWindow();
  });

  if (!success) {
    console.error('Shortcut registration failed:', shortcut);
  }
}

app.whenReady().then(() => {
  createWindow();
  registerShortcut();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('before-quit', () => {
  app.isQuiting = true;
});

// IPC handlers
ipcMain.handle('get-tasks', () => {
  return store.get('tasks', []);
});

ipcMain.handle('save-tasks', (event, tasks) => {
  store.set('tasks', tasks);
  return true;
});

ipcMain.handle('get-shortcut', () => {
  return store.get('shortcut', 'CommandOrControl+Shift+T');
});

ipcMain.handle('save-shortcut', (event, shortcut) => {
  store.set('shortcut', shortcut);
  registerShortcut();
  return true;
});

ipcMain.handle('open-settings', () => {
  const settingsWindow = new BrowserWindow({
    width: 400,
    height: 300,
    parent: mainWindow,
    modal: true,
    frame: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  settingsWindow.loadFile('settings.html');
  settingsWindow.setMenuBarVisibility(false);
});
