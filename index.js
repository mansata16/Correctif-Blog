
const express = require("express");
const db = require('./db')



const app = express();

//middlewares
app.use(express.urlencoded({ extend: false }));
app.use(express.json());

const PORT = 3000;

//Afficher un contact avec son ID
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

//creer un nouveau contact
app.post("/article", (req, res) => {
   
    const {Titre, Contenu, Auteur}  = req.body;
     if(!Titre || !Contenu || !Auteur) {
        res.status(400).json({error:"Merci de remplir tous les champs"});
        return;
    }

    const article = {Titre, Contenu, Auteur };
    const sql = 'INSERT INTO article (Titre, Contenu, Auteur ) VALUES (?,?,?)'
    const params = [article.Titre, article.Contenu, article.Auteur]
    db.run (sql, params, function(err, result){
        if (err){
            res.status(400).json({error: err.message });
            return
        } 
       res.status(201).json({message: "Article creer avec succes", data: article });
   });
   
});

//Modifier un contact

app.put("/article/:id", (req, res) => {
   const {id: articleID } = req.params;
    const {Titre, Contenu, Auteur }  = req.body;
     if(!Titre || !Contenu || !Auteur) {
        res.status(400).json({error:"Merci de remplir tous les champs"});
        return;
    }

    const article= {Titre, Contenu, Auteur  };
    const sql = "UPDATE article SET Titre = ?, Contenu= ?,  Auteur= ? WHERE id = ?";
    const params = [article.Titre, article.Contenu, article.Auteur, articleID]
    db.run (sql, params, function(err, raw){
        if (err){
            res.status(400).json({error: err.message });
            return
        } 
       res.status(201).json({message: `Article ${articleID } modifer avec succes`, data: article });
   });
   
});

//supprimer un contact
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

//Lister les contacts
app.get("/article", (req, res)=>{
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
app.get("/", function(req, res){
    res.json({message: "L'API marche bien!"});
}); 


app.listen(PORT, function(){
    console.log(`L'application a demarrer au port ${PORT}`);
});


