const shortcutInput = document.getElementById('shortcutInput');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const successMessage = document.getElementById('successMessage');

// Load current shortcut
async function init() {
  const currentShortcut = await window.electronAPI.getShortcut();
  shortcutInput.value = currentShortcut;
  shortcutInput.focus();
  shortcutInput.select();
}

// Save shortcut
saveBtn.addEventListener('click', async () => {
  const newShortcut = shortcutInput.value.trim();
  
  if (newShortcut === '') {
    alert('Please enter a valid shortcut');
    return;
  }

  await window.electronAPI.saveShortcut(newShortcut);
  
  successMessage.style.display = 'block';
  
  setTimeout(() => {
    window.close();
  }, 1500);
});

// Cancel
cancelBtn.addEventListener('click', () => {
  window.close();
});

// Enter to save
shortcutInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    saveBtn.click();
  }
});

// Escape to cancel
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.close();
  }
});

init();
