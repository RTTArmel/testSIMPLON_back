const mongoose = require('mongoose');


const ArticleSchema = mongoose.Schema({
    _id: { type: Number, required: true },
    titre: { type: String, required: true },
    utilisateur: Number,
    image: { type: String, required: true },
    description: { type: String, required: true },
    prix: { type: Number, required: true },
    date: {type: String, required: true},
    debut: { type: String, required: true },
    duree: { type: Number, required: true },
    disponible: { type: Number, required: true },
    reserve: { type: Number, required: true },
    active: Boolean,
}, {
        timestamps: true
    });

module.exports = mongoose.model('atelier', ArticleSchema);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);