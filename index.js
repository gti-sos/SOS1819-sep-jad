var express = require("express");

var bodyParser = require("body-parser");

var path = require("path");

var cors = require("cors");

var app = express();

const BASE_PATH = "/api";

app.use(bodyParser.json());

app.use(cors());

var port = process.env.PORT || 8080;

app.use("/", express.static(path.join(__dirname,"public")));

var provinceEmploymentsAPI = require("./province-employments-api");

const MongoClient = require("mongodb").MongoClient;
const uri_jma = "mongodb+srv://jmad:jmad@cluster0-oxc4d.mongodb.net/cluster0?retryWrites=true";
const client_jma = new MongoClient(uri_jma, { useNewUrlParser: true });

var provinceEmployments;

client_jma.connect(error => {
    if (error) {
        console.error("Error accesing to DB employments: " + error);
        process.exit(1);
    }
    
    provinceEmployments = client_jma.db("sos1819-jma").collection("employments");
    console.log("Connected to DB employments!");
    
    provinceEmploymentsAPI(app, BASE_PATH, provinceEmployments);
    
    app.listen(port, () => {
        console.log("Server ready on port " +port);
    });
});

