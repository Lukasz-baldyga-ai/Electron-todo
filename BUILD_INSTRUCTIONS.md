# Build Instructions for Electron Todo App

## Windows (From Current Machine)

```powershell
# Build portable executable
$env:CSC_IDENTITY_AUTO_DISCOVERY='false'
npm run build:win
```

**Output**: `dist/Electron-v1.1.0.zip`

---

## macOS (Requires Mac Computer)

### Prerequisites
- macOS 10.12 or later
- Node.js 14+ and npm
- Xcode Command Line Tools: `xcode-select --install`

### Build Steps

```bash
# 1. Clone the repository
git clone https://github.com/Lukasz-baldyga-ai/Electron-todo.git
cd Electron-todo

# 2. Install dependencies
npm install

# 3. Build for macOS
npm run build:mac
```

**Output**: 
- `dist/Electron-x.x.x.dmg` - Installer (drag & drop to Applications)
- `dist/Electron-x.x.x.zip` - Portable archive

### Installation
1. Download the `.dmg` file
2. Open it
3. Drag Electron app to Applications folder
4. Launch from Applications

---

## Linux (Requires Linux Machine)

```bash
npm run build:linux
```

**Output**:
- `dist/Electron-x.x.x.AppImage` - Portable executable
- `dist/Electron-x.x.x.deb` - Debian package

---

## GitHub Actions (Automated Builds)

To enable automated builds for all platforms, create `.github/workflows/build.yml`:

```yaml
name: Build Electron App

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm run build:win
        if: runner.os == 'Windows'
      - run: npm run build:mac
        if: runner.os == 'macOS'
      - run: npm run build:linux
        if: runner.os == 'Linux'
      
      - uses: softprops/action-gh-release@v1
        with:
          files: dist/**/*.{exe,dmg,zip,AppImage,deb}
```

---

## Troubleshooting

### Windows Code Signing Error
Disable code signing:
```powershell
$env:CSC_IDENTITY_AUTO_DISCOVERY='false'
npm run build:win
```

### macOS Icon Issues
If `.icns` icon not found, the build will use default Electron icon.

To create a proper `.icns`:
```bash
# Install imagemagick
brew install imagemagick

# Convert PNG to ICNS
convert build/icon.png -define icon:auto-resize build/icon.icns
```

---

## Current Status

- ✅ Windows: Portable executable ready
- ✅ macOS: Build configuration ready (build on Mac)
- ✅ Linux: Build configuration ready (build on Linux)
