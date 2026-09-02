const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store');

const store = new Store();
let mainWindow = null;
let settingsWindow = null;

function createWindow() {
  const { screen } = require('electron');
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  
  mainWindow = new BrowserWindow({
    width: 500,
    height: height,
    x: width - 500,
    y: 0,
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
  // Close settings window if it's open
  if (settingsWindow && !settingsWindow.isDestroyed()) {
    settingsWindow.close();
  }
  
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    const { screen } = require('electron');
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;
    mainWindow.setBounds({ x: width - 500, y: 0, width: 500, height: height });
    mainWindow.show();
    mainWindow.focus();
  }
}

function registerShortcut() {
  const shortcut = store.get('shortcut', 'CommandOrControl+Shift+T');
  
  // Unregister all previous shortcuts first
  globalShortcut.unregisterAll();
  
  // Add a small delay to ensure unregister completes
  setTimeout(() => {
    const success = globalShortcut.register(shortcut, () => {
      if (mainWindow) {
        toggleWindow();
      }
    });

    if (!success) {
      console.error('Shortcut registration failed:', shortcut);
      // Retry after a longer delay
      setTimeout(() => {
        registerShortcut();
      }, 2000);
    } else {
      console.log('Shortcut registered successfully:', shortcut);
      // Notify all windows that shortcut was updated
      if (mainWindow) {
        mainWindow.webContents.send('shortcut-updated', shortcut);
      }
    }
  }, 100);
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
  // Don't quit the app on Windows - keep it running for the global shortcut
  // Only quit on macOS when all windows are closed
  if (process.platform === 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('before-quit', () => {
  app.isQuiting = true;
});

// Keep the app running and re-register shortcut if needed
app.on('focus', () => {
  if (mainWindow && !mainWindow.isVisible()) {
    registerShortcut();
  }
});

// Handle app relaunch - make sure shortcut is registered
if (process.platform === 'win32') {
  app.setLoginItemSettings({
    openAtLogin: true,
    openAsHidden: true,
    path: app.getPath('exe'),
    args: ['--hidden']
  });
}

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
  if (!shortcut || typeof shortcut !== 'string' || shortcut.trim() === '') {
    console.error('Invalid shortcut format');
    return { success: false, error: 'Invalid shortcut format' };
  }

  const trimmedShortcut = shortcut.trim();
  
  try {
    // Test if the shortcut is valid by trying to register it temporarily
    const testSuccess = globalShortcut.register(trimmedShortcut, () => {});
    
    if (testSuccess) {
      // It's valid, so unregister the test registration
      globalShortcut.unregister(trimmedShortcut);
      
      // Now save it and re-register
      store.set('shortcut', trimmedShortcut);
      
      // Small delay to ensure proper re-registration
      setTimeout(() => {
        registerShortcut();
      }, 200);
      
      return { success: true, shortcut: trimmedShortcut };
    } else {
      console.error('Shortcut validation failed:', trimmedShortcut);
      return { success: false, error: 'This shortcut is already in use or invalid' };
    }
  } catch (error) {
    console.error('Error saving shortcut:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('open-settings', () => {
  // Close existing settings window if open
  if (settingsWindow && !settingsWindow.isDestroyed()) {
    settingsWindow.close();
  }
  
  settingsWindow = new BrowserWindow({
    width: 450,
    height: 490,
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
  
  // Clean up the reference when window is closed
  settingsWindow.on('closed', () => {
    settingsWindow = null;
  });
});

ipcMain.handle('quit-app', () => {
  app.isQuiting = true;
  app.quit();
  return true;
});
