const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }, // o 'admin'
    cart: { type: [String], default: [] } // Suponiendo que el carrito es un array de IDs de productos
});

module.exports = mongoose.model('User', userSchema);
