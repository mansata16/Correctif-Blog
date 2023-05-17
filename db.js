const sqlite3 = require("sqlite3").verbose();

const dbFile = "db.sqlite3";

//se connecter a la base de donnees
const db = new sqlite3.Database(dbFile, (err) => {
     if (err){
         console.error(err.message);
         throw err;
     }else{
         console.log("connection a la base sqlite3...");
         
         const sql = `CREATE TABLE article(
             Titre text,
             Contenu text,
             Auteur text,
             Date text
         )`
         db.run(sql, (err)=> {
             if(err) {
                 console.log("Article deja creer");
             }
         });
     }
});
module.exports = db;