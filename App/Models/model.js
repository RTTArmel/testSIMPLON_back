const mongoose = require('mongoose');


const ProfileSchema = mongoose.Schema({
    _id: {type:Number,required:true},
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    password:{ type: String, required: true },
    specialite: String
}, {
    timestamps: true
});

module.exports = mongoose.model('profil',ProfileSchema);