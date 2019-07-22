const Profile = require('../Models/model');
const fs = require('fs')

//AJOUT DE NOUVEAU CLIENT
module.exports.postAdmin = function (req, res) {
    var nom = req.body.nom
    var email = req.body.email
    var password = req.body.password
    var pwd = req.body.pwd

    Profile.find()
        .then(note => {
            if (note.length == 0) {
                id = 0;
            } else {
                id = parseInt(note[note.length - 1].id) + 1;
            }
            const profil = new Profile({ _id: id, nom: nom, email: email, password: password });

            if (nom || email || password || pwd) {
                (password !== pwd) ? console.log("Erreur passwords") :

                    profil.save()
                        .then((note) => {
                            res.send(note);
                        })
                        .catch(e => {
                            res.status(500).send({ mes: e.mes || "erreur" })
                        })
            }
        })
}

//AFFICHAGE DE TOUS LES CLIENTS
module.exports.getAdmin = (req, res) => {
    Profile.find()
        .then(note => {
            console.log("tafiditra")
            res.send(note)
        })
        .catch(e => {
            res.status(500).send({ mes: e.mes || "erreur" })
        });
};

//MODIFICATION INFO CLIENT
module.exports.updateAdmin = (req, res) => {
    var nom = req.body.nom
    var email = req.body.email
    var password = req.body.password
    var pwd = req.body.pwd
    if (!nom || !email || !password || !pwd) {
        console.log("informations manquantes");
    } else {
        (password !== pwd) ? console.log("Erreur passwords") :
            Profile.findByIdAndUpdate(req.params.id, { nom: nom, email: email, password: password }, (err, product) => {
                Profile.find()
                    .then(note => { res.send(note) })
            })
    }
};

//SUPPRESSION CLIENT
module.exports.deleteAdmin = function (req, res) {
    Profile.findByIdAndRemove(req.params.id, function (err) {
        Profile.find()
            .then(note => { res.send(note) })
    })
};

//AUTHENTIFICATION
module.exports.postLogin = function (req, res) {
    var nom = req.body.nom
    var password = req.body.password
    var result;
    Profile.find()
        .then(note => {
            for (let i = 0; i < note.length; i++) {
                if ((note[i].nom == nom || note[i].email == nom) && note[i].password == password) {
                    console.log('login validé', note[i]);
                    result =note[i]
                    i = note.length
                } else {
                    console.log('password erroné');
                    result ='ko'
                }
            }
            res.send(result)
        })
}