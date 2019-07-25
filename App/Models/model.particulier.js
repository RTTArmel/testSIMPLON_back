const mongoose = require('mongoose');


const ProfileSchema = mongoose.Schema({
    _id: {type:Number,required:true},
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    telephone:{ type: Number, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('particulier',ProfileSchema);