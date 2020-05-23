const Router = require("express-promise-router");
const User = require("../models/User.js");
const { json } = require("body-parser");
const { check, validationResult } = require("express-validator");

const router = new Router();

// GET /users
// Get all users.
router.get("/", async(req, res) => {
  const users = await User.findAll();
  return res.json(users);
});

// GET /users/:id
// Gets a user.
router.get("/:id", async(req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  if(!user) return res.status(404).json({ message: "Not Found." });
  return res.json(user);
});

// POST /users
// Creates a user.
// Returns the created user.
router.post("/", json({ extended: false }), [
  check("name").isString(),
  check("email").optional().isEmail(),
  check("age").optional().isInt()
], async(req, res) => {
  // Validate input.
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const id = Date.now().toString(36);
  const { name, age, email } = req.body;

  const user = await User.create({ id, name, age, email });
  return res.json(user);
});

// PUT /users/:id
// Updates a user.
// Returns the updated user.
router.put("/:id", json({ extended: false }), [
  check("name").optional().isString(),
  check("email").optional().isEmail(),
  check("age").optional().isInt()
], async(req, res) => {
  // Validate input.
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { id } = req.params;

  const user = await User.findOne({ where: { id } });
  if(!user) return res.status(404).json({ message: "Not Found." });

  const { name, age, email } = req.body;
  await user.update({ name, age, email });

  return res.json(user);
});

// DELETE /users/:id
// Deletes a user.
// Returns the deleted user.
router.delete("/:id", async(req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id } });
  if(!user) return res.status(404).json({ message: "Not Found." });
  
  // Delete user.
  await user.destroy();

  return res.json(user);
});

module.exports = router;
