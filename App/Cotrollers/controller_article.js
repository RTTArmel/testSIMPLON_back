const Profile = require('../Models/modele.article');
const fs = require('fs')

//Create new Article
exports.create = (req, res) => {
    Profile.find()
        .then(user => {
            var id;
            if (user.length == 0) {
                id = 0
            } else {
                id = parseInt(user[user.length - 1]._id) + 1
            }

            let imageFile = req.files.image;
            let nomImage = id
            res.setHeader('Content-Type', 'text/plain');

            imageFile.mv(`${__dirname}/public/${req.body.titre}${nomImage}.jpg`, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });

            const profil = new Profile({
                _id: id,
                titre: req.body.titre,
                utilisateur: req.body.utilisateur,
                prix: req.body.prix,
                description: req.body.description,
                image: req.body.titre + nomImage + '.jpg',
                date: req.body.date,
                debut: req.body.debut,
                duree: req.body.duree,
                reserve: req.body.reserve,
                disponible: req.body.disponible,
                active: req.body.active
            });
            profil.save()
                .then(() => {
                    Profile.find()
                        .then(data => {
                            console.log('post ok: ', data);

                            res.send(data);
                        })
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Something wrong while creating the profil."
                    });
                });
        })
        .catch(erreur => {console.log('erreur', erreur)})
};

//Get un par un image
exports.findOneArticle = (req, res) => {
    try {
        let picture = fs.readFileSync('./App/Cotrollers/public/' + req.params.image)
        console.log('params: ', req.params.image);
        res.write(picture)
        res.end()
    }
    catch (e) { console.log("envoie erroné: ", e); }
}



exports.findAllArticle = (req, res) => {
    Profile.find()
        .then(article => {
            res.send(article);
        }).catch(err => {
            res.send(err)
        });
};


exports.updateArticle = (req, res) => {

    let imageFile = req.files.image;
    let nomImage = req.params.id;
    res.setHeader('Content-Type', 'text/plain');

    imageFile.mv(`${__dirname}/public/${req.body.titre}${nomImage}.jpg`, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
    });

    Profile.findByIdAndUpdate(req.params.id, {
        titre: req.body.titre,
        utilisateur: req.body.utilisateur,
        prix: req.body.prix,
        description: req.body.description,
        image: req.body.titre + nomImage + '.jpg',
        date: req.body.date,
        debut: req.body.debut,
        duree: req.body.duree,
        reserve: req.body.reserve,
        disponible: req.body.disponible,
        active: true
    })
        .then((data) => {
            console.log('put ok: ', data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the profil."
            });
        });
};

//SUPPRESSION ARTICLE
module.exports.deleteArticle = function (req, res) {
    Profile.findByIdAndRemove(req.params.id, function (err) {
        Profile.find()
            .then(note => { res.send(note) })
    })
};

// Find a single article with a articleID
exports.findOne = (req, res) => {
    Profile.findById(req.params.profilId)
        .then(profilchoix => {
            //console.log(unprofil)
            if (!profilchoix) {
                return res.status(404).send({
                    message: "profil not found with id" + req.params.profilId
                });
            }
            else {
                res.send(profilchoix);
            }


        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "profil not found with id " + req.params.profilId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving profil with id " + req.params.profilId
            });
        });
};
