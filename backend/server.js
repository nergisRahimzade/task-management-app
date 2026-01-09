const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3001;

// Valid status values matching your frontend
const VALID_STATUSES = ['TD', 'IP', 'D'];
const { v4: uuidv4 } = require('uuid');

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./tasks.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    // Create tasks table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'TD',
      dueDate TEXT
    )`);
  }
});

// GET all tasks    
// Orders by: tasks with due dates first (earliest first), then tasks without due dates
app.get('/api/tasks', (req, res) => {
  db.all(`
    SELECT * FROM tasks 
    ORDER BY 
      CASE WHEN dueDate IS NULL THEN 1 ELSE 0 END,
      dueDate ASC
  `, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// GET single task
app.get('/api/tasks/:id', (req, res) => {
  db.get('SELECT * FROM tasks WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json(row);
  });
});

// POST create new task
app.post('/api/tasks', (req, res) => {
  const { title, description, status, dueDate } = req.body;

  const taskId = uuidv4();
  
  if (!title) {
    res.status(400).json({ error: 'Title is required' });
    return;
  }

  // Validate status
  const taskStatus = status || 'TD';
  if (!VALID_STATUSES.includes(taskStatus)) {
    res.status(400).json({ error: 'Invalid status. Must be TD, IP, or D' });
    return;
  }

  // dueDate should be in YYYY-MM-DD format or null
  const taskDueDate = dueDate || null;

  db.run(
    'INSERT INTO tasks (id, title, description, status, dueDate) VALUES (?, ?, ?, ?, ?)',
    [taskId, title, description || '', taskStatus, taskDueDate],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      // Return the newly created task
      db.get('SELECT * FROM tasks WHERE id = ?', [taskId], (err, row) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.status(201).json(row);
      });
    }
  );
});

// PUT update task
app.put('/api/tasks/:id', (req, res) => {
  const { title, description, status, dueDate } = req.body;
  
  // Validate status if provided
  if (status && !VALID_STATUSES.includes(status)) {
    res.status(400).json({ error: 'Invalid status. Must be TD, IP, or D' });
    return;
  }
  
  db.run(
    'UPDATE tasks SET title = ?, description = ?, status = ?, dueDate = ? WHERE id = ?',
    [title, description, status, dueDate, req.params.id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }
      // Return updated task
      db.get('SELECT * FROM tasks WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json(row);
      });
    }
  );
});

// PATCH update task status only (for your handleStatusChange function)
app.patch('/api/tasks/:id/status', (req, res) => {
  const { status } = req.body;
  
  if (!status || !VALID_STATUSES.includes(status)) {
    res.status(400).json({ error: 'Invalid status. Must be TD, IP, or D' });
    return;
  }
  
  db.run(
    'UPDATE tasks SET status = ? WHERE id = ?',
    [status, req.params.id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }
      // Return updated task
      db.get('SELECT * FROM tasks WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json(row);
      });
    }
  );
});

// DELETE task
app.delete('/api/tasks/:id', (req, res) => {
  db.run('DELETE FROM tasks WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json({ message: 'Task deleted successfully', id: req.params.id });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api/tasks`);
});

// Handle shutdown gracefully
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});