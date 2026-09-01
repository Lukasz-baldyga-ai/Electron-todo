let tasks = [];

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const completedCount = document.getElementById('completedCount');
const settingsBtn = document.getElementById('settingsBtn');
const shortcutDisplay = document.getElementById('shortcutDisplay');

// Initialize
async function init() {
  tasks = await window.electronAPI.getTasks();
  const shortcut = await window.electronAPI.getShortcut();
  updateShortcutDisplay(shortcut);
  renderTasks();
}

function updateShortcutDisplay(shortcut) {
  // Convert shortcut to display format
  const displayShortcut = shortcut
    .replace('CommandOrControl', 'Ctrl')
    .replace('Command', 'Cmd')
    .replace('Control', 'Ctrl');
  shortcutDisplay.textContent = displayShortcut;
}

function renderTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    taskList.innerHTML = '<div class="empty-state">No tasks yet. Add one above!</div>';
    updateStats();
    return;
  }

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    
    li.innerHTML = `
      <input 
        type="checkbox" 
        class="task-checkbox" 
        ${task.completed ? 'checked' : ''}
        data-index="${index}"
      >
      <span class="task-text">${escapeHtml(task.text)}</span>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    
    taskList.appendChild(li);
  });

  updateStats();
  attachEventListeners();
}

function attachEventListeners() {
  // Checkbox listeners
  document.querySelectorAll('.task-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const index = parseInt(e.target.dataset.index);
      tasks[index].completed = e.target.checked;
      saveTasks();
      renderTasks();
    });
  });

  // Delete button listeners
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });
  });
}

function addTask() {
  const text = taskInput.value.trim();
  
  if (text === '') {
    taskInput.focus();
    return;
  }

  tasks.unshift({
    text: text,
    completed: false,
    createdAt: new Date().toISOString()
  });

  taskInput.value = '';
  saveTasks();
  renderTasks();
  taskInput.focus();
}

async function saveTasks() {
  await window.electronAPI.saveTasks(tasks);
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  
  taskCount.textContent = `${total} ${total === 1 ? 'task' : 'tasks'}`;
  completedCount.textContent = `${completed} completed`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Event Listeners
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

settingsBtn.addEventListener('click', () => {
  window.electronAPI.openSettings();
});

// Refresh shortcut display when window regains focus
window.addEventListener('focus', async () => {
  const shortcut = await window.electronAPI.getShortcut();
  updateShortcutDisplay(shortcut);
});

// Initialize app
init();
