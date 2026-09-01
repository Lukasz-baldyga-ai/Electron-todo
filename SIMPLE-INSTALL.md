# 🚀 Simple Installation Guide
**For People Who Don't Use GitHub or Command Line**

## Quick Install (2 Minutes)

### Option 1: Download Portable Version (Easiest)

1. **Download the app folder**
   - Ask Łukasz for the `Quick-Tasks-Portable.zip` file
   - Or download from: [Releases page](https://github.com/Lukasz-baldyga-ai/Electron-todo/releases)

2. **Extract the ZIP file**
   - Right-click the ZIP file
   - Choose "Extract All..."
   - Pick a location (e.g., `C:\Program Files\QuickTasks` or your Desktop)

3. **Run the app**
   - Open the extracted folder
   - Double-click `Quick Tasks.exe`
   - Done! ✅

4. **Create a shortcut** (Optional)
   - Right-click `Quick Tasks.exe`
   - Choose "Create shortcut"
   - Drag the shortcut to your Desktop or Start Menu

### Option 2: Download Installer (Coming Soon)

1. Download `Quick-Tasks-Setup.exe`
2. Double-click to install
3. Follow the installation wizard
4. The app will be in your Start Menu

---

## 🎯 How to Use

### First Time Setup

1. **Launch the app** - It will appear on the right side of your screen

2. **The keyboard shortcut**
   - By default: Press `Ctrl+Shift+T` to show/hide the app
   - Or just press the `1` key (configured by Łukasz)

3. **Add your first task**
   - Type anything in the input box
   - Press `Enter` or click the `+` button

4. **Mark tasks as done**
   - Click the checkbox next to a task
   - It will hide automatically! ✨

5. **See completed tasks**
   - Click the "Show Completed" button
   - Click again to hide them

### Daily Use

- **Show app**: Press `1` (or `Ctrl+Shift+T`)
- **Add task**: Type + Enter
- **Check off task**: Click checkbox (it disappears!)
- **Delete task**: Hover over task, click "Delete"
- **Hide app**: Press `1` again (or `Ctrl+Shift+T`)

### Change Keyboard Shortcut

1. Click the ⚙️ (settings) icon
2. Type your preferred shortcut
   - Examples: `Alt+Space`, `Ctrl+T`, `CommandOrControl+K`
3. Click "Save Changes"
4. Restart the app

---

## 📁 Where Are My Tasks Saved?

Your tasks are automatically saved in:
```
C:\Users\[YourName]\AppData\Roaming\electron-todo\config.json
```

**To backup your tasks:**
1. Press `Win+R`
2. Type: `%APPDATA%\electron-todo`
3. Press Enter
4. Copy the `config.json` file somewhere safe

**To restore tasks:**
- Copy your backup `config.json` back to that folder

---

## ❓ Troubleshooting

### The app won't start
- **Windows Defender** might block it the first time
- Right-click the .exe → Properties → Check "Unblock" → Apply

### The keyboard shortcut doesn't work
- Another program might be using the same shortcut
- Change it in Settings to something else

### I lost my tasks
- Check: `%APPDATA%\electron-todo\config.json`
- If the file exists, your tasks are safe
- Just restart the app

### The app disappeared
- Press your keyboard shortcut again (default: `1` or `Ctrl+Shift+T`)
- The app hides itself, it's not closed!

---

## 🔄 Updates

To get updates:
1. Ask Łukasz for the latest version
2. Download the new ZIP file
3. Extract it to replace the old folder
4. Your tasks will remain (they're stored separately)

---

## 🆘 Need Help?

Contact: **Łukasz Baldyga**  
GitHub: https://github.com/Lukasz-baldyga-ai/Electron-todo

---

**That's it! Enjoy your quick task manager!** ⚡
