import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
    naam: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: 'https://greekherald.com.au/wp-content/uploads/2020/07/default-avatar.png'
    },
    wachtwoord: {
        type: String,
        required: true
    },
    favorieten: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vehicle'
        }]
});
// Hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('wachtwoord')) {
        this.wachtwoord = await bcrypt.hash(this.wachtwoord, 10);
    }
    next();
});
export const User = mongoose.model('User', userSchema);
