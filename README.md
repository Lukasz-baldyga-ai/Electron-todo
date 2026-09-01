# ⚡ Electron Todo - Quick Task Manager

A beautiful, keyboard-driven todo app that appears with a single shortcut. Perfect for quickly capturing tasks without leaving your workflow.

![Quick Tasks App](https://img.shields.io/badge/electron-28.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🎯 **Global Keyboard Shortcut** - Press `Ctrl+Shift+T` (or `1` key) anywhere to show/hide
- 💾 **Auto-Save** - All tasks saved automatically to local JSON file
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- ⚙️ **Customizable** - Change keyboard shortcut in settings
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
   - Windows: `Quick-Tasks-Setup.exe` or `Quick-Tasks-Portable.exe`
   - macOS: `Quick-Tasks.dmg`
   - Linux: `Quick-Tasks.AppImage` or `.deb`

2. **Install** and run the application

3. **Use** the app:
   - Press `Ctrl+Shift+T` to show the app
   - Type your task and press `Enter`
   - Click checkbox to mark complete
   - Press `Ctrl+Shift+T` again to hide

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
npm run build:win      # Windows (NSIS installer + portable)
npm run build:mac      # macOS (.dmg)
npm run build:linux    # Linux (AppImage + deb)

# Create unpacked directory (for testing)
npm run pack
```

Built files will be in the `dist/` folder.

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+T` | Show/Hide app (default, customizable) |
| `Enter` | Add new task |
| `Escape` | Close settings |

## ⚙️ Configuration

### Change Keyboard Shortcut

1. Click the ⚙️ icon in the app
2. Enter your preferred shortcut (e.g., `Alt+Space`, `CommandOrControl+K`)
3. Click "Save Changes"
4. Restart the app

**Shortcut Format Examples:**
- `CommandOrControl+Shift+T` (works on both Windows/Mac)
- `Alt+Space`
- `CommandOrControl+\`` (backtick)
- `Super+T` (Linux)

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

- **Electron 28** - Desktop framework
- **electron-store** - Data persistence
- **electron-builder** - Distribution packaging
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

## 🐛 Troubleshooting

### Windows: Shortcut not working
- Run the app as Administrator once
- Check if another app is using the same shortcut
- Try a different shortcut combination

### macOS: App can't be opened
- Right-click the app → "Open"
- Go to System Preferences → Security & allow the app

### Linux: AppImage won't run
```bash
chmod +x Quick-Tasks.AppImage
./Quick-Tasks.AppImage
```

### Data not saving
- Check file permissions for config directory
- Try running as administrator (Windows)
- Check disk space

## 💬 Support

- **Issues**: [GitHub Issues](https://github.com/YOUR-USERNAME/Electron-todo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/YOUR-USERNAME/Electron-todo/discussions)

## 🙏 Acknowledgments

- Built with [Electron](https://www.electronjs.org/)
- Icons from system emoji
- Inspired by quick-capture productivity tools

---

**Made with ❤️ for productivity enthusiasts**

⭐ Star this repo if you find it useful!
