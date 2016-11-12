'use strict';
var requests = require('request');
var client = require('twilio')("AC621078e1d207d81638d8e24c9dd658c9", "c721b3668e0418a0db7e89edb11263be");

// --------------- Helpers that build all of the responses -----------------------

//<break time="1ms"/>

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: 'PlainText',
            text: output
        },
        card: {
            type: 'Simple',
            title: `SessionSpeechlet - ${title}`,
            content: `SessionSpeechlet - ${output}`,
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
                text: repromptText,
            },
        },
        shouldEndSession,
    };
}

function BuildAudioSpeech(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: 'SSML',
            ssml: output,
        },
        card: {
            type: 'Simple',
            title: `SessionSpeechlet - ${title}`,
            content: `SessionSpeechlet - ${output}`,
        },
        reprompt: {
            outputSpeech: {
                type: 'SSML',
                text: repromptText,
            },
        },
        shouldEndSession,
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: '1.0',
        sessionAttributes,
        response: speechletResponse,
    };
}


// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    const sessionAttributes = {};
    const cardTitle = 'Welcome';
    const speechOutput = 'Thank for using trade please repeat the message displayed on the screen.';
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    const repromptText = 'Are you going to tell me your unique ID or not?';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function handleSessionEndRequest(callback) {
    const cardTitle = 'Session Ended';
    const speechOutput = 'Alexa U X is the best. BYE!';
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = true;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}

function createFavoriteColorAttributes(favoriteColor) {
    return {
        favoriteColor,
    };
}

/**
 * Sets the color in the session and prepares the speech to reply to the user.
 */
function SetupNumber(intent, session, callback) {
    const cardTitle = intent.name;
    const myUniqueNumber = intent.slots.UniqueNumber;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = true;
    let speechOutput = '';

    if (myUniqueNumber) {
        const UniqueNumber = myUniqueNumber.value;

        requests({
            url: `https://alexatrader-e9921.firebaseio.com/${UniqueNumber}.json`,
            method: "GET",
            json: true
        }, function(err, response){
            if(err){
                console.log("There was an error");
                console.log(err);
                speechOutput = "There was a problem connecting to the DB";
                callback(sessionAttributes,
                    buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
            }else{
                console.log("Found The Number");

                let obj = {
                    active: 1,
                    respond: UniqueNumber
                };

                requests({
                    url: `https://alexatrader-e9921.firebaseio.com/Listener/SetupNumber/.json`,
                    method: "Patch",
                    body: obj,
                    json: true
                }, function(err, response){
                    if(err){
                        console.log("There was an error");
                        console.log(err);
                        speechOutput = "There was a problem connecting to the DB";
                        callback(sessionAttributes,
                            buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
                    }else{
                        speechOutput = `You are now connected`;
                        callback(sessionAttributes,
                            buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
                    }
                });

            };
        });

    } else {
        speechOutput = "What is your number again?";
        callback(sessionAttributes,
            buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
    }
}

function RemoveGrid(intent, session, callback){
    const cardTitle = intent.name;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = '';

    let obj = {
        active: 1,
        respond: "remove grid"
    };

    requests({
        url: `https://alexaux-39a68.firebaseio.com/Listener/RemoveGrid.json`,
        method: "Patch",
        body: obj,
        json: true
    }, function(err, response){
        if(err){
            console.log("There was an error");
            console.log(err);
            speechOutput = "There was a problem bro";
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        }else{
            console.log("Successfully added into db");
            speechOutput = `You are now connected`;
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        };
    });
}


/*
 *
 *
 *
 *
 *
 *
 *                                          STARTING
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * */





function StateConditions(intent, session, callback){
    const cardTitle = intent.name;
    const MyCondition = intent.slots.MyCondition;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = true;
    let speechOutput = '';

    if (MyCondition) {
        const myMyCondition = MyCondition.value;


        let obj = {
            active: 1,
            respond: `${myMyCondition}`
        };

        requests({
            url: `https://baymax-bfd1a.firebaseio.com/Listener/StateConditions.json`,
            method: "Patch",
            body: obj,
            json: true
        }, function(err, response){
            if(err){
                console.log("There was an error");
                console.log(err);
                speechOutput = "There was a problem connecting to the DB";
                callback(sessionAttributes,
                    buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
            }else{
                console.log("Successfully added into db");
                speechOutput = `I have found some information regarding your request`;
                callback(sessionAttributes,
                    buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
            };
        });

    } else {
        speechOutput = "What is your number again?";
        callback(sessionAttributes,
            buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
    }
}

function WhoAreYou(intent, session, callback){
    const cardTitle = intent.name;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = true;
    let speechOutput = '';

    let obj = {
        active: 1,
        respond: "more on body"
    };

    requests({
        url: `https://happyclone-76ed0.firebaseio.com/Listener/WhoAreYou.json`,
        method: "Patch",
        body: obj,
        json: true
    }, function(err, response){
        if(err){
            console.log("There was an error");
            console.log(err);
            speechOutput = "There was a problem.";
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        }else{
            console.log("Successfully added into db");
            speechOutput = `I Am Drive Bot. I will help you on any driving assistance that you need`;
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        };
    });
}


//1FOOD

function LookUpFoodPlaces(intent, session, callback){
    const cardTitle = intent.name;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = true;
    let speechOutput = '';

    let obj = {
        active: 1,
        respond: "look for random food spots"
    };

    requests({
        url: `https://happyclone-76ed0.firebaseio.com/Listener/LookUpFoodPlaces.json`,
        method: "Patch",
        body: obj,
        json: true
    }, function(err, response){
        if(err){
            console.log("There was an error");
            console.log(err);
            speechOutput = "There was a problem.";
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        }else{
            console.log("Successfully added into db");
            speechOutput = `Here are some local restaurant around your area`;
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        };
    });
}

function SendTextLocation(intent, session, callback){
    const cardTitle = intent.name;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = '';

    let obj = {
        active: 1,
        respond: "Send the current address to a contact"
    };

    requests({
        url: `https://happyclone-76ed0.firebaseio.com/Listener/SendTextLocation.json`,
        method: "Patch",
        body: obj,
        json: true
    }, function(err, response){
        if(err){
            console.log("There was an error");
            console.log(err);
            speechOutput = "There was a problem.";
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        }else{
            console.log("Successfully added into db");
            speechOutput = `Please choose who to send a text to.`;
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        };
    });
}


//1CALL

function CallSpecificIndividual(intent, session, callback){
    const cardTitle = intent.name;
    const CallName = intent.slots.CallName;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = true;
    let speechOutput = '';

    if (CallName) {
        const myCallName = CallName.value;


        let obj = {
            active: 1,
            respond: `${myCallName} will now be called`
        };

        requests({
            url: `https://baymax-bfd1a.firebaseio.com/Listener/CallSpecificIndividual.json`,
            method: "Patch",
            body: obj,
            json: true
        }, function(err, response){
            if(err){
                console.log("There was an error");
                console.log(err);
                speechOutput = "There was a problem.";
                callback(sessionAttributes,
                    buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
            }else{
                console.log("Successfully added into db");
                speechOutput = `Calling ${myCallName} now.`;
                callback(sessionAttributes,
                    buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
            };
        });

    } else {
        speechOutput = "Who did you wanted to call again?";
        callback(sessionAttributes,
            buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
    }
}

//1CONTACT

function OpenContactList(intent, session, callback){
    const cardTitle = intent.name;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = true;
    let speechOutput = '';

    let obj = {
        active: 1,
        respond: "opening contact list"
    };

    requests({
        url: `https://happyclone-76ed0.firebaseio.com/Listener/OpenContactList.json`,
        method: "Patch",
        body: obj,
        json: true
    }, function(err, response){
        if(err){
            console.log("There was an error");
            console.log(err);
            speechOutput = "There was a problem";
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        }else{
            console.log("Successfully added into db");
            speechOutput = `Opening contact list now`;
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        };
    });
}

function SaveContactToFavorite(intent, session, callback){
    const cardTitle = intent.name;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = true;
    let speechOutput = '';

    let obj = {
        active: 1,
        respond: "Saving current contact now"
    };

    requests({
        url: `https://happyclone-76ed0.firebaseio.com/Listener/SaveContactToFavorite.json`,
        method: "Patch",
        body: obj,
        json: true
    }, function(err, response){
        if(err){
            console.log("There was an error");
            console.log(err);
            speechOutput = "There was a problem";
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        }else{
            console.log("Successfully added into db");
            speechOutput = `Saving current contact now.`;
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        };
    });
}

//1GPS

function OpenGPS(intent, session, callback){
    const cardTitle = intent.name;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = true;
    let speechOutput = '';

    let obj = {
        active: 1,
        respond: "opening GPS menu now"
    };

    requests({
        url: `https://happyclone-76ed0.firebaseio.com/Listener/OpenGPS.json`,
        method: "Patch",
        body: obj,
        json: true
    }, function(err, response){
        if(err){
            console.log("There was an error");
            console.log(err);
            speechOutput = "There was a problem";
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        }else{
            console.log("Successfully added into db");
            speechOutput = `Where would you like to go?`;
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        };
    });
}

function SaveCurrentDestination(intent, session, callback){
    const cardTitle = intent.name;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = true;
    let speechOutput = '';

    let obj = {
        active: 1,
        respond: "Saving current Destination now"
    };

    requests({
        url: `https://happyclone-76ed0.firebaseio.com/Listener/SaveCurrentDestination.json`,
        method: "Patch",
        body: obj,
        json: true
    }, function(err, response){
        if(err){
            console.log("There was an error");
            console.log(err);
            speechOutput = "There was a problem";
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        }else{
            console.log("Successfully added into db");
            speechOutput = `Saving current destination now`;
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        };
    });
}

//1TEXT

function TextSpecificIndividual(intent, session, callback){
    const cardTitle = intent.name;
    const TextName = intent.slots.TextName;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = true;
    let speechOutput = '';

    if (TextName) {
        const myTextName= TextName.value;


        let obj = {
            active: 1,
            respond: `${myTextName} is now going to be text`
        };

        requests({
            url: `https://baymax-bfd1a.firebaseio.com/Listener/TextSpecificIndividual.json`,
            method: "Patch",
            body: obj,
            json: true
        }, function(err, response){
            if(err){
                console.log("There was an error");
                console.log(err);
                speechOutput = "There was a problem.";
                callback(sessionAttributes,
                    buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
            }else{
                console.log("Successfully added into db");
                speechOutput = `What would you like to text to ${TextName}`;
                callback(sessionAttributes,
                    buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
            };
        });

    } else {
        speechOutput = "What is your number again?";
        callback(sessionAttributes,
            buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
    }
}

//1UNIVERSAL

function GoBackToMain(intent, session, callback){
    const cardTitle = intent.name;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = true;
    let speechOutput = '';

    let obj = {
        active: 1,
        respond: "Going back to main"
    };

    requests({
        url: `https://happyclone-76ed0.firebaseio.com/Listener/GoBackToMain.json`,
        method: "Patch",
        body: obj,
        json: true
    }, function(err, response){
        if(err){
            console.log("There was an error");
            console.log(err);
            speechOutput = "There was a problem";
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        }else{
            console.log("Successfully added into db");
            speechOutput = `Going back to the main menu now`;
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        };
    });
}

function GoBackPrevious(intent, session, callback){
    const cardTitle = intent.name;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = true;
    let speechOutput = '';

    let obj = {
        active: 1,
        respond: "Going back to previous"
    };

    requests({
        url: `https://happyclone-76ed0.firebaseio.com/Listener/GoBackPrevious.json`,
        method: "Patch",
        body: obj,
        json: true
    }, function(err, response){
        if(err){
            console.log("There was an error");
            console.log(err);
            speechOutput = "There was a problem";
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        }else{
            console.log("Successfully added into db");
            speechOutput = `Going back to the previous stage`;
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        };
    });
}

function SetLocationAsDestinationForGps(intent, session, callback){
    const cardTitle = intent.name;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = true;
    let speechOutput = '';

    let obj = {
        active: 1,
        respond: "setting location as destination for GPS"
    };

    requests({
        url: `https://happyclone-76ed0.firebaseio.com/Listener/SetLocationAsDestinationForGps.json`,
        method: "Patch",
        body: obj,
        json: true
    }, function(err, response){
        if(err){
            console.log("There was an error");
            console.log(err);
            speechOutput = "There was a problem";
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        }else{
            console.log("Successfully added into db");
            speechOutput = `Setting current location to G P S.`;
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        };
    });
}

function CallLocation(intent, session, callback){
    const cardTitle = intent.name;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = true;
    let speechOutput = '';

    let obj = {
        active: 1,
        respond: "Call current location"
    };

    requests({
        url: `https://happyclone-76ed0.firebaseio.com/Listener/CallLocation.json`,
        method: "Patch",
        body: obj,
        json: true
    }, function(err, response){
        if(err){
            console.log("There was an error");
            console.log(err);
            speechOutput = "There was a problem";
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        }else{
            console.log("Successfully added into db");
            speechOutput = `Calling current location now.`;
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
        };
    });
}




/*
 *
 *
 *
 *
 *
 *
 *                                          ENDING
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * */





// --------------- Events -----------------------

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);

    const intent = intentRequest.intent;
    const intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    if (intentName === 'WhoAreYou') {
        WhoAreYou(intent, session, callback);
    }

    //FOOD
    else if (intentName === 'LookUpFoodPlaces') {
        LookUpFoodPlaces(intent, session, callback);
    }else if (intentName === 'SendTextLocation') {
        SendTextLocation(intent, session, callback);
    }

    //GPS
    else if (intentName === 'OpenGPS') {
        OpenGPS(intent, session, callback);
    }else if (intentName === 'SaveCurrentDestination') {
        SaveDestination(intent, session, callback);
    }


    //CALL
    else if (intentName === 'CallSpecificIndividual') {
        CallSpecificIndividual(intent, session, callback);
    }

    //Contacts
    else if (intentName === 'OpenContactList') {
        OpenContactList(intent, session, callback);
    }else if (intentName === 'SaveContactToFavorite') {
        SaveContactToFavorite(intent, session, callback);
    }

    //TEXT
    else if (intentName === 'TextSpecificIndividual') {
        TextSpecificIndividual(intent, session, callback);
    }

    //UNIVERSAL METHOD
    else if (intentName === 'GoBackToMain') {
        GoBackToMain(intent, session, callback);
    }else if (intentName === 'GoBackPrevious') {
        GoBackPrevious(intent, session, callback);
    }else if (intentName === 'SetLocationAsDestinationForGps') {
        SetLocationAsDestinationForGps(intent, session, callback);
    }else if (intentName === 'CallLocation') {
        CallLocation(intent, session, callback);
    }



    //DEFAULT COMMANDS FROM ALEXA
    else if (intentName === 'AMAZON.HelpIntent') {
        getWelcomeResponse(callback);
    } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
        handleSessionEndRequest(callback);
    } else {
        throw new Error('Invalid intent');
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log(`onSessionEnded requestId=${sessionEndedRequest.requestId}, sessionId=${session.sessionId}`);
    // Add cleanup logic here
}


exports.handler = (event, context, callback) => {
    try {
        console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);

        /*
         if (event.session.application.applicationId !== 'amzn1.echo-sdk-ams.app.[unique-value-here]') {
         callback('Invalid Application ID');
         }
         */

        if (event.session.new) {
            onSessionStarted({ requestId: event.request.requestId }, event.session);
        }

        if (event.request.type === 'LaunchRequest') {
            onLaunch(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                callback(null, buildResponse(sessionAttributes, speechletResponse));
        });
        } else if (event.request.type === 'IntentRequest') {
            onIntent(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                callback(null, buildResponse(sessionAttributes, speechletResponse));
        });
        } else if (event.request.type === 'SessionEndedRequest') {
            onSessionEnded(event.request, event.session);
            callback();
        }
    } catch (err) {
        callback(err);
    }
};
