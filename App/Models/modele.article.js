const mongoose = require('mongoose');


const ArticleSchema = mongoose.Schema({
    _id: { type: Number, required: true },
    titre: { type: String, required: true },
    utilisateur: Number,
    image: { type: String, required: true },
    image1: { type: String, required: true },
    image2: { type: String, required: true },
    description: String,
    prix: Number
}, {
        timestamps: true
    });

module.exports = mongoose.model('article', ArticleSchema);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);