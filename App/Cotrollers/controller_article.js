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
            let imageFile1 = req.files.image1;
            let imageFile2 = req.files.image2;
            let nomImage = id 
            let nomImage1 = id + '1'
            let nomImage2 = id + '2'
            res.setHeader('Content-Type', 'text/plain');
        
            imageFile.mv(`${__dirname}/public/${req.body.titre}${nomImage}.jpg`, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });
            imageFile1.mv(`${__dirname}/public/${req.body.titre}${nomImage1}.jpg`, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
            });imageFile2.mv(`${__dirname}/public/${req.body.titre}${nomImage2}.jpg`, function (err) {
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
                image1: req.body.titre + nomImage1  + '.jpg',
                image2: req.body.titre + nomImage2 + '.jpg'
            });
            profil.save()
                .then(() => {
                    Profile.find()
                        .then(data => {
                            res.send(data);
                        })
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Something wrong while creating the profil."
                    });
                });
        })
};

//Get un par un image
exports.findOneArticle =(req, res) =>{ 
    try { 
        let picture = fs.readFileSync('./App/Cotrollers/public/'+req.params.image)
        console.log('params: ',req.params.image);
        res.write(picture) 
        res.end() 
    } 
    catch (e) { console.log("envoie erroné: ", e); } }


    
exports.findAllArticle = (req, res) => {
    Profile.find()
        .then(article => {
            res.send(article);
        }).catch(err => {
            res.status(500).send(article => {
                message: err.message || "Something wrong while retrieving profils."
            });
        });
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
