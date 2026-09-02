const shortcutInput = document.getElementById('shortcutInput');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const quitBtn = document.getElementById('quitBtn');
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

  try {
    const result = await window.electronAPI.saveShortcut(newShortcut);
    
    if (result.success) {
      successMessage.textContent = `✓ Shortcut updated to: ${newShortcut}`;
      successMessage.style.display = 'block';
      successMessage.style.background = '#4caf50';
      
      setTimeout(() => {
        window.close();
      }, 2000);
    } else {
      // Show error message
      successMessage.textContent = `✗ Error: ${result.error}`;
      successMessage.style.display = 'block';
      successMessage.style.background = '#f44336';
      
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 4000);
    }
  } catch (error) {
    console.error('Error saving shortcut:', error);
    successMessage.textContent = `✗ Error: Failed to save shortcut`;
    successMessage.style.display = 'block';
    successMessage.style.background = '#f44336';
    
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 4000);
  }
});

// Cancel
cancelBtn.addEventListener('click', () => {
  window.close();
});

// Quit App
quitBtn.addEventListener('click', async () => {
  if (confirm('Are you sure you want to quit the app?')) {
    await window.electronAPI.quitApp();
  }
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
