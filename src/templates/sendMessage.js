const request = require('request');

module.exports = function sendMessage(recipientId, message){
    return new Promise(function(resolve, reject) {
        request({
            url: "https://graph.facebook.com/v2.6/me/messages",
            qs: {
                access_token: 'EAATujzfc4pcBOzg9UxwtZCo6JhXWVHZA4KKqXCluDkGyLTWbNn4G4qv7i0BGkgOWhC2jfJnSx9WDk9hmelAEgyqjDVzfmZAp3iRp5klHrhv5ELIC5o4nb50UZCZBo7lUhLu7AgLtFRJclli5FXwG8xlooDETHB5Qr8YwTmcl1Palu7m7PPiQOZCZAUnl06vCAl3'
            },
            method: "POST",
            json: {
                recipient: {id: recipientId},
                message: message,
            }
        }, function(error, response, body) {
            if (error) {
                console.log("Error sending message: " + response.error);
                reject(response.error);
            } else {
                resolve(body);
            }
        });
    })
}