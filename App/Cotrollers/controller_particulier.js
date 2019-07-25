const Profile = require('../Models/model.particulier');
const Atelier = require('../Models/modele.article');
const fs = require('fs')

// module.exports.postAdmin = function (req, res) {
//     var nom = req.body.nom
//     var prenom = req.body.prenom
//     var email = req.body.email
//     var telephone = req.body.telephone
//     Profile.find()
//         .then(note => {                        
//             for (let i = 0; i < note.length; i++) {
//                 if (note[i].email == email) {
//                     var exister = true
//                     console.log("email déjà existé");
//                     i = note.length
//                 } else { var exister = false }
//             }
//             if (note.length == 0) {
//                 id = 0;
//             } else {
//                 id = parseInt(note[note.length - 1].id) + 1;
//             }

//             if (!exister) {
//                 const profil = new Profile({ _id: id, nom: nom, prenom: prenom, telephone: telephone, email: email });

//                 if (nom && prenom && telephone && email) {
//                     profil.save()
//                         .then((note) => {
//                             res.send(note);
//                         })
//                         .catch(e => {
//                             res.status(500).send({ mes: e.mes || "erreur" })
//                         })
//                 } else { console.log('information insuffisantes'); }
//             }
//         })
// }


module.exports.createPart = (req, res) => {
    Profile.find().then(user => {
        if (user.length == 0) {
            id = 0;
        } else {
            id = parseInt(user[user.length - 1].id) + 1;
        }
        Atelier.findById(req.params.id).then(atl => {
            const profile = new Profile({
                _id: id,
                nom: req.body.nom,
                prenom: req.body.prenom,
                telephone: req.body.telephone,
                email: req.body.email

            });
            console.log('params', req.params._id);
            console.log('atl id', atl._id);
            Atelier.findByIdAndUpdate(atl._id, {
                _id: atl.id,
                utilisateur: atl.utilisateur,
                titre: atl.titre,
                description: atl.description,
                date: atl.date,
                debut: atl.debut,
                duree: atl.duree,
                reserve: parseInt(atl.reserve) + 1,
                prix: atl.prix,
                image: atl.image,
                active: atl.active,
                disponible: atl.disponible
            }).then(upd =>
                console.log(upd)
            )
            profile.save()
                .then(users => {
                    res.json(users)
                });
        });

    });
}