
const express = require("express");
const db = require('./db')



const app = express();

//middlewares
app.use(express.urlencoded({ extend: false }));
app.use(express.json());

const PORT = 3000;

//Afficher un article avec son ID
app.get("/article/:id", (req, res)=>{
    const {id: articleID } = req.params;
    const sql = "SELECT * FROM article WHERE id = ?";
    const params= [articleID];
    db.get(sql, params, (err, result) => {
        if(err){
            res.status(400).json({error: err.message});
            return;
        }
        res.json({message: `Affichage de l'article' ${articleID}`, data: result});
    }) ;
});

//creer un nouvel article
app.post("/article", (req, res) => {
   ` ALTER TABLE article ADD COLUMN Date date`;
   
    const {Titre, Contenu, Date, Auteur}  = req.body;

     if(!Titre || !Contenu || !Date || !Auteur) {
        res.status(400).json({error:"Merci de remplir tous les champs"});
        return;

    }

    const article = {Titre, Contenu, Date, Auteur };
    const sql = 'INSERT INTO article (Titre, Contenu,  Date, Auteur ) VALUES (?,?,?,?)'
    const params = [article.Titre, article.Contenu,article.Date, article.Auteur]
    db.run (sql, params, function(err, result){
        if (err){
            res.status(400).json({error: err.message });
            return
        } 
       res.status(201).json({message: "Article creer avec succes", data: article });
   });
   
});


//Modifier un article

app.put("/article/:id", (req, res) => {
   const {id: articleID } = req.params;
    const {Titre, Contenu, Date, Auteur }  = req.body;
     if(!Titre || !Contenu || !Date|| !Auteur) {
        res.status(400).json({error:"Merci de remplir tous les champs"});
        return;
    }

    const article= {Titre, Contenu, Date, Auteur  };
    const sql = "UPDATE article SET Titre = ?, Contenu= ?, Date = ?,  Auteur= ? WHERE id = ?";
    const params = [article.Titre, article.Contenu, article.Date, article.Auteur, articleID]
    db.run (sql, params, function(err, raw){
        if (err){
            res.status(400).json({error: err.message });
            return
        } 
       res.status(201).json({message: `Article ${articleID } modifer avec succes`, data: article });
   });
   
});

//supprimer un article
app.delete("/article/:id", (req, res) => {
    const {id: articleID} = req.params;
     const sql = "DELETE FROM article WHERE id = ?";
     db.run (sql, articleID, function(err, resultat ){
         if (err){
             res.status(400).json({error: err.message });
             return
         } 
        res.json({message: `L'article' ${articleID } a bien ete supprimer`, data: this.changes });
    });
    
 });

//Lister les articles
app.get("/article", (_req, res)=>{
    const sql = "SELECT * FROM article";
    db.all(sql, (err, rows)=>{
        if (err){
            res.status(400).json({error: err.message });
            return
        } 
        res.json({message: "Liste des articles", data: rows});

    });
});


//demarrer le serveur
app.get("/", function(_req, res){
    res.json({message: "L'API marche bien!"});
}); 


app.listen(PORT, function(){
    console.log(`L'application a demarrer au port ${PORT}`);
});


