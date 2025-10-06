const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Property = require("./models/property.js");
const User = require("./models/user.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mongo_url = "mongodb://127.0.0.1:27017/wellax";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
async function main() {
    await mongoose.connect(mongo_url);
}
main()
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(`DB error: ${err}`));

// API Routes
app.get("/", (req, res) => {
    res.json({ message: "Wellax Reality API" });
});

// Auth Routes
app.post('/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    user = new User({ name, email, password });
    await user.save();
    const payload = { user: { id: user.id } };
    jwt.sign(payload, 'secret', { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token, user });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const payload = { user: { id: user.id } };
    jwt.sign(payload, 'secret', { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token, user });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/auth/google', async (req, res) => {
  const { name, email, googleId } = req.body;
  try {
    let user = await User.findOne({ googleId });
    if (user) {
      const payload = { user: { id: user.id } };
      jwt.sign(payload, 'secret', { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      });
    } else {
      user = new User({ name, email, googleId });
      await user.save();
      const payload = { user: { id: user.id } };
      jwt.sign(payload, 'secret', { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get("/api/projects", async (req, res) => {
    try {
        const properties = await Property.find({});
        res.json(properties);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/projects/:name", async (req, res) => {
    try {
        const property = await Property.findOne({ name: req.params.name });
        if (!property) {
            return res.status(404).json({ error: "Property not found" });
        }
        res.json(property);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/property/:id/calculator", async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ error: "Property not found" });
        }
        res.json({ property });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/enquire/new", (req, res) => {
    const { enquiry, email, phone } = req.body;
    console.log("New enquiry:", { enquiry, email, phone });
    res.json({ success: true, message: "Enquiry received" });
});

app.listen(4090, () => {
    console.log("Server running on http://localhost:4090");
});