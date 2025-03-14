const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    watchedMovies: [
        {
            movieId: String,
            title: String,
            rating: { type: Number, min: 1, max: 5 } // Avaliação de 1 a 5 estrelas
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);
