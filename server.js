const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: ".env" });

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://masternitesh178:n3tdQ482Vvj15Hr4@cluster0.ybljt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Task Model (for example purposes)
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const Task = mongoose.model("Task", taskSchema);

// Create Task
app.post("/api/tasks", async (req, res) => {
  const { title, description } = req.body;

  const newTask = new Task({ title, description });
  await newTask.save();
  res.status(201).send("Task Created");
});

// Get All Tasks
app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Update Task
app.put("/api/tasks/:id", async (req, res) => {
  const { title, description } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { title, description },
    { new: true }
  );
  res.json(updatedTask);
});

// Delete Task
app.delete("/api/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send("Task Deleted");
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
