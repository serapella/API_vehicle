import mongoose from 'mongoose';
const vehicleSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['auto', 'moto'],
        required: true
    },
    merk: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    bouwjaar: {
        type: Number,
        required: true
    },
    prijs: {
        type: Number,
        required: true
    },
    cilinderinhoud: {
        type: Number,
        required: function () {
            return this.type === 'moto';
        }
    }
});
export const Vehicle = mongoose.model('Vehicle', vehicleSchema);
