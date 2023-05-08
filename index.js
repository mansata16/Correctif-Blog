const express = require("express");
const db = require("./db.js");

const app = express();

//middlewares
app.use(express.urlencoded({ extend: false }));
app.use(express.json());

const PORT = 3000;

//creer un nouveau contact
app.post("/contact/", (req, res) => {
    console.log("Creer un contact");
    res.json({message:"creation de contact "})
})
//demarrer le serveur
app.get("/", function(req, res){
    res.json({message: "L'API marche bien!"});
});

app.listen(PORT, function(){
    console.log(`L'application a demarrer au port ${PORT}`);
});

