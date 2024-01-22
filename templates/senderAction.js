const request = require('request');

module.exports = function senderAction(recipientId){
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: {
            access_token: 'a2ef27aa0a9a442384fb83acf2a698c0'
        },
        method: "POST",
        json: {
            recipient: {id: recipientId},
            "sender_action":"typing_on"
        }
    }, function(error, response, body) {
        if (error) {
            console.log("Error sending message: " + response.error);
        }
    });
}