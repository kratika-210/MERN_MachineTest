const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();

// Get all employees
router.get("/", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// Add an employee
router.post("/add", async (req, res) => {
  const newEmployee = new Employee(req.body);
  await newEmployee.save();
  res.json({ message: "Employee added successfully" });
});

// Update an employee
router.put("/update/:id", async (req, res) => {
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedEmployee);
    } catch (err) {
      res.status(500).json({ message: "Error updating employee" });
    }
  });

// Delete an employee
router.delete("/delete/:id", async (req, res) => {
    try {
      await Employee.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Employee deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting employee" });
    }
  });
  
module.exports = router;
