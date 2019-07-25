var controllerAdmin = require('../Cotrollers/controller_admin');
var controllerArticle = require('../Cotrollers/controller_article');
var controllerParticulier = require('../Cotrollers/controller_particulier');

module.exports.route = function (app) {

    app.route('/admin').get(controllerAdmin.getAdmin)
    app.route('/register').post(controllerAdmin.postAdmin)
    app.route('/register/:id').put(controllerAdmin.updateAdmin)
    app.route('/register/:id').delete(controllerAdmin.deleteAdmin)
    app.route('/login').post(controllerAdmin.postLogin)

    app.route('/profil').post(controllerArticle.create);
    app.route('/profil/:id').put(controllerArticle.updateArticle);
    app.route('/profil').get(controllerArticle.findAllArticle);
    app.route('/profil/:image').get(controllerArticle.findOneArticle);
    app.route('/profil/:id').delete(controllerArticle.deleteArticle);

    app.route('/particulier/:id').post(controllerParticulier.createPart)
    // app.get('/profil/:profilId', pers.findOne);
    // app.get('/user/:photo_profil', pers.lireImage);
}

 /*     app.route('/update/:id')
            .put(notes.updateDonnee)
        app.route('/delete/:id')
            .delete(notes.deleteDonnee)
    
        app.route('/image/:im')
            .get(notes.image)
    
    
        app.route('/article')
            .post(notes.postArticle)
        .get(notes.getArt)
    
        app.route('/comment')
            .put(notes.commentaire)
    
        app.route('/login')
            .post(notes.postLogin)
            
        app.route('/')
            .get(notes.getDonne)
            .post(notes.postDonne)
      app.route('/')
      .get(notes.getDonne) */
