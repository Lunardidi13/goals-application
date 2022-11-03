const asyncHandler = require('express-async-handler')

// Importing model
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    // Retrieve all goals 
    // After auth middleware
    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json(goals)
})

// @desc    Set or create new goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {

    // If body.text is not given
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    // Insert goal to the database
    const goal = await Goal.create({
        text: req.body.text,
        // After authmiddleware
        user: req.user.id,
    })

    res.status(200).json(goal)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {

    // Retrieve the goal by id
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // After auth middleware
    const user = await User.findById(req.user.id)

    // Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Validate logged in user matches with goal user
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedGoal)
})

// @desc    Delete goal
// @route   DELETE /api/goals
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // After auth middleware
    const user = await User.findById(req.user.id)

    // Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Validate logged in user matches with goal user
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}