// CommonJS modules syntax
const express = require('express')
const router = express.Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalControllers')

// Define routes
// :id means req.params.id

// router.get('/', getGoals)
// router.post('/', setGoal)

router.route('/')
    .get(getGoals)
    .post(setGoal)

// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)

router.route('/:id')
    .put(updateGoal)
    .delete(deleteGoal)

module.exports = router