// Define schema
const mongoose = require('mongoose')
const goalSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
},
    {
        // automatically add created_at updated_at
        timestamps: true
    }
)

module.exports = mongoose.model('Goal', goalSchema)