const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
require('dotenv').config();
const dbURI = process.env.dbURI;
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Routes
const employeeRoutes = require("./routes/employee");

app.use("/employees", employeeRoutes);

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Mock user authentication
    if (username === 'admin' && password === 'admin@123') {
        return res.status(200).json({ message: 'Login successful', token: 'mock-jwt-token' });
    } else {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
