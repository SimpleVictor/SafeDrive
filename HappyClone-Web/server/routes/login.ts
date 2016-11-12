import { Router, Request, Response, NextFunction } from "express";
var requests = require('request');

const loginRouter: Router = Router();

loginRouter.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


loginRouter.post("/restaurant-near-me", function (request: Request, response: Response, next: NextFunction) {


    console.log("bnruh");

    let mylat = request.body.mylat;
    let mylng = request.body.mylng;
    let mytype = request.body.mytype;
    let mykeyword = request.body.mykeyword;

    requests({
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${mylat},${mylng}&radius=2000&type=${mytype}&keyword=${mykeyword}&key=AIzaSyBjIBpLHeRzZ27j5Q3qek6gIulGP5psD_U`,
        method: "GET",
    }, function(err, responses){
        if(err){
            console.log("There was an error");
            response.json("FAILED");

        }else{
            console.log("Successfully added into db");
            response.json(responses);
        };
    });



});

// login method
loginRouter.post("/", function (request: Request, response: Response, next: NextFunction) {

});

export { loginRouter }
