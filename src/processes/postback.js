const request = require('request');
const senderAction = require('../templates/senderAction');
const sendMessage = require('../templates/sendMessage');

 module.exports = function processPostback(event) {
     const senderID = event.sender.id;
     const payload = event.postback.payload;

     if (payload === 'Get starteeed pleaseeee') {
        request({
            url: "https://graph.facebook.com/v2.6/" + senderID,
            qs: {
                access_token: 'a2ef27aa0a9a442384fb83acf2a698c0',
                fields: "first_name"
            },
            method: "GET"
        }, function(error, response, body) {
            let greeting = '';
            if (error) {
                console.error("Error getting user name: " + error);
            } else {
                let bodyObject = JSON.parse(body);
                console.log(bodyObject);
                username = bodyObject.first_name;
                greeting = "Hello " + username  + ". ";
            }
            let message = greeting + "Welcome to Healthbot. Hope you are doing good today";
            let message2 = "I am your nutrition tracker :-)"
            let message3 = "please type in what you ate like: I ate chicken birayani and 2 chapatis with dal.";
            senderAction(senderID);
            sendMessage(senderID, {text: message}).then(() => {
                sendMessage(senderID, { text: message2 }).then(() => {
                    sendMessage(senderID, {  text: message3}).then(() => {
                        sendMessage(senderID, { text: '🎈' });
                    })
                });
            });
        });
     }

     if (payload === 'news') {
        senderAction(senderID);
        sendMessage(senderID, {text: 'Haha, no news('})
     }

     if (payload === 'meme') {
        senderAction(senderID);
        sendMessage(senderID, {text: 'Заходят как-то немец, француз и еврей в бар...'})
     }
 }