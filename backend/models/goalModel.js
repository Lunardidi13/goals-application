const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
    {
        // Needs to contain ObjectId
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            // Reference to the User Model
            ref: 'User',
        },
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