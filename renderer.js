let tasks = [];
let showCompleted = false;

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const toggleCompletedBtn = document.getElementById('toggleCompleted');
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

  // Filter tasks based on showCompleted toggle
  const visibleTasks = showCompleted 
    ? tasks 
    : tasks.filter(t => !t.completed);

  if (visibleTasks.length === 0) {
    const message = showCompleted 
      ? 'No tasks yet. Add one above!'
      : 'No active tasks! Add one above or show completed tasks.';
    taskList.innerHTML = `<div class="empty-state">${message}</div>`;
    updateStats();
    return;
  }

  // Group tasks by date
  const tasksByDate = groupTasksByDate(visibleTasks);
  
  // Render tasks grouped by date
  Object.keys(tasksByDate).forEach(dateKey => {
    const dateTasks = tasksByDate[dateKey];
    
    // Add date separator
    const dateDiv = document.createElement('div');
    dateDiv.className = 'date-separator';
    dateDiv.textContent = formatDateLabel(dateKey);
    taskList.appendChild(dateDiv);
    
    // Add tasks for this date
    dateTasks.forEach((task, taskIndex) => {
      const originalIndex = tasks.indexOf(task);
      const li = document.createElement('li');
      li.className = `task-item ${task.completed ? 'completed' : ''}`;
      
      li.innerHTML = `
        <input 
          type="checkbox" 
          class="task-checkbox" 
          ${task.completed ? 'checked' : ''}
          data-index="${originalIndex}"
        >
        <span class="task-text">${escapeHtml(task.text)}</span>
        <button class="delete-btn" data-index="${originalIndex}">Delete</button>
      `;
      
      taskList.appendChild(li);
    });
  });

  updateStats();
  attachEventListeners();
}

function groupTasksByDate(taskList) {
  const grouped = {};
  
  taskList.forEach(task => {
    const date = new Date(task.createdAt);
    const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
    
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(task);
  });
  
  // Sort dates descending (newest first)
  const sortedGrouped = {};
  Object.keys(grouped)
    .sort((a, b) => new Date(b) - new Date(a))
    .forEach(key => {
      sortedGrouped[key] = grouped[key];
    });
  
  return sortedGrouped;
}
filter(t => !t.completed).length;
  const completed = tasks.filter(t => t.completed).length;
  
  taskCount.textContent = `${total} active ${total === 1 ? 'task' : 'tasks'}`;
  toggleCompletedBtn.textContent = showCompleted 
    ? `Hide Completed (${completed})` 
    : `Show Completed (${completed})
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Reset time parts for comparison
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const yesterdayOnly = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
  
  if (dateOnly.getTime() === todayOnly.getTime()) {
    return '📅 Today';
  } else if (dateOnly.getTime() === yesterdayOnly.getTime()) {
    return '📆 Yesterday';
  } else {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return `📋 ${date.toLocaleDateString('en-US', options)}`;
  }
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
  const total = tasks.filter(t => !t.completed).length;
  const completed = tasks.filter(t => t.completed).length;
  
  taskCount.textContent = `${total} active ${total === 1 ? 'task' : 'tasks'}`;
  toggleCompletedBtn.textContent = showCompleted 
    ? `Hide Completed (${completed})` 
    : `Show Completed (${completed})`;
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

toggleCompletedBtn.addEventListener('click', () => {
  showCompleted = !showCompleted;
  renderTasks();
});

// Refresh shortcut display when window regains focus
window.addEventListener('focus', async () => {
  const shortcut = await window.electronAPI.getShortcut();
  updateShortcutDisplay(shortcut);
});

// Initialize app
init();
