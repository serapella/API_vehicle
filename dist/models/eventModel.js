import mongoose from 'mongoose';
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
export const Event = mongoose.model('Event', eventSchema);
