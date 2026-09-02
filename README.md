# ⚡ Electron Todo - Quick Task Manager

A beautiful, keyboard-driven todo app that appears with a single shortcut. Perfect for quickly capturing tasks without leaving your workflow.

![Quick Tasks App](https://img.shields.io/badge/electron-28.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green)

---

## 🎁 For Non-Technical Users

**Don't know GitHub or programming? No problem!**

👉 **[Read the Simple Installation Guide](SIMPLE-INSTALL.md)** - No command line needed!

**Quick summary:**
1. Download `Electron-v1.1.0.zip` from the [Releases](https://github.com/Lukasz-baldyga-ai/Electron-todo/releases) page
2. Extract the ZIP file anywhere on your computer
3. Double-click `Electron.exe` to run
4. Press `Space+1` or `Ctrl+Shift+T` anytime to show/hide it!

That's it! Your tasks auto-save and the app runs from the right side of your screen. ✨

---

## ✨ Features

- 🎯 **Global Keyboard Shortcut** - Press `Space+1` or `Ctrl+Shift+T` anywhere to show/hide
- 💾 **Auto-Save** - All tasks saved automatically to local JSON file
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- ⚙️ **Customizable Shortcuts** - Change keyboard shortcut in settings with real-time validation
- 📅 **Collapsible Day Groups** - Organize tasks by date, collapse/expand groups with one click
- 🔄 **Auto-Startup** - App automatically starts on Windows startup (hidden)
- 🚀 **Lightweight** - Fast startup, minimal resource usage
- 🔒 **Privacy-First** - All data stored locally, no cloud sync
- ✅ **Simple Workflow** - Add, check, delete - that's it!

## 📸 Screenshots

*Main window with tasks*
- Clean, modern interface
- Task stats at a glance
- One-click settings access

## 🚀 Quick Start

### For End Users (Download & Run)

1. **Download** the latest release for your platform:
   - Windows: `Electron-v1.1.0.zip` (portable executable)
   - macOS: `Electron.dmg`
   - Linux: `Electron.AppImage` or `.deb`

2. **Extract & Run**:
   - Extract the ZIP file anywhere on your computer
   - Double-click `Electron.exe` to launch

3. **Use** the app:
   - Press `Space+1` or `Ctrl+Shift+T` to show/hide
   - Type your task and press `Enter`
   - Click checkbox to mark complete
   - Click date headers to collapse/expand task groups
   - Press `Space+1` or `Ctrl+Shift+T` again to hide

### For Developers (Build from Source)

#### Prerequisites

- Node.js 16+ ([Download](https://nodejs.org/))
- npm or yarn
- Git

#### Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR-USERNAME/Electron-todo.git
cd Electron-todo

# 2. Install dependencies
npm install

# 3. Run in development mode
npm start
```

## 🔨 Building Installers

Build distribution packages for your platform:

```bash
# Build for your current platform
npm run build

# Or build for specific platforms
npm run build:win      # Windows (portable executable)
npm run build:mac      # macOS (.dmg)
npm run build:linux    # Linux (AppImage + deb)

# Create unpacked directory (for testing)
npm run pack
```

Built files will be in the `dist/` folder.

**Note:** GitHub Actions automatically builds all platforms when you push a tag (e.g., `v1.1.0`). See [BUILD_INSTRUCTIONS.md](BUILD_INSTRUCTIONS.md) for details.

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Space+1` or `Ctrl+Shift+T` | Show/Hide app (default, customizable) |
| `Enter` | Add new task |
| `Escape` | Close settings |
| Click date header | Collapse/expand task group for that day |

## ⚙️ Configuration

### Change Keyboard Shortcut

1. Press `Space+1` or `Ctrl+Shift+T` to open the app
2. Click the ⚙️ settings icon
3. Enter your preferred shortcut (e.g., `Alt+Space`, `CommandOrControl+K`)
4. Click "Save Changes" - the app validates the shortcut in real-time
5. Press the global shortcut to show/hide the app with your new key

**Shortcut Format Examples:**
- `CommandOrControl+Shift+T` (works on both Windows/Mac)
- `Alt+Space`
- `CommandOrControl+\`` (backtick)
- `Super+T` (Linux)
- `Space+1` (space + number key)

**Auto-Startup:**
- On Windows, the app automatically starts hidden when you log in
- Disable in settings or Windows startup folder if desired

### Data Storage

Tasks are stored locally in:
- **Windows**: `%APPDATA%\electron-todo\config.json`
- **macOS**: `~/Library/Application Support/electron-todo/config.json`
- **Linux**: `~/.config/electron-todo/config.json`

## 🛠️ Development

### Project Structure

```
Electron-todo/
├── main.js           # Main process (app logic)
├── preload.js        # IPC bridge (security)
├── renderer.js       # Task management logic
├── index.html        # Main window UI
├── styles.css        # Modern styling
├── settings.html     # Settings window
├── settings.js       # Settings logic
└── package.json      # Dependencies & build config
```

### Tech Stack

- **Electron 28.3.3** - Desktop framework
- **electron-store 8.1.0** - Data persistence
- **electron-builder 24.9.1** - Distribution packaging
- **Vanilla JS** - No frameworks needed!

### Development Commands

```bash
npm start              # Run in dev mode
npm run build          # Build for current platform
npm run build:all      # Build for all platforms
```

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Ideas for Contributions

- [ ] Task categories/tags
- [ ] Due dates & reminders
- [ ] Dark mode
- [ ] Export/import tasks
- [ ] Task search/filter
- [ ] Drag-to-reorder tasks
- [ ] Multiple task lists
- [ ] Cloud sync (optional)

## 📝 License

MIT License - feel free to use this project however you like!

## � Version History

### v1.1.0 (Latest)
✨ **New Features:**
- ✅ Collapsible day groups - organize tasks by date with one-click collapse/expand
- ✅ Custom keyboard shortcut support with real-time validation
- ✅ Auto-startup on Windows - app launches hidden when you log in
- ✅ Improved settings window - cleaner UI with no scrolling needed

🐛 **Fixes:**
- Fixed settings window height to eliminate scrolling
- Improved shortcut registration reliability with retry logic
- Enhanced error messages for invalid shortcuts

---

## 🐛 Troubleshooting

### Windows: Shortcut not working
- Run the app as Administrator once
- Check if another app is using the same shortcut
- Try a different shortcut combination
- Try `Space+1` as an alternative default shortcut

### Windows: App doesn't start on login
- Check that the app was added to Windows Startup folder
- Go to Settings → Apps → Startup and enable "Electron"

### macOS: App can't be opened
- Right-click the app → "Open"
- Go to System Preferences → Security & allow the app

### Linux: AppImage won't run
```bash
chmod +x Electron.AppImage
./Electron.AppImage
```

### Data not saving
- Check file permissions for config directory
- Try running as administrator (Windows)
- Check disk space

## 💬 Support

- **Issues**: [GitHub Issues](https://github.com/Lukasz-baldyga-ai/Electron-todo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Lukasz-baldyga-ai/Electron-todo/discussions)
- **Releases**: [GitHub Releases](https://github.com/Lukasz-baldyga-ai/Electron-todo/releases)

## 🙏 Acknowledgments

- Built with [Electron](https://www.electronjs.org/)
- Icons from system emoji
- Inspired by quick-capture productivity tools

---

**Made with ❤️ for productivity enthusiasts**

⭐ Star this repo if you find it useful!
