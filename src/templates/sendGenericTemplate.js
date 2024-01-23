const request = require('request');

module.exports = function sendGenericTemplate(recipientId, respBody) {
    console.log(respBody);
    const nutritionalValue = [];
    for (let i = 0; i < respBody.length; i++) { // I dont like using forEach
        let obj = {
            "title":respBody[i].food_name,
            "image_url": respBody[i].thumbnail,
            "subtitle": 'Total Calories: ' + respBody[i].total_calories + "\n" + 
                        'protein: ' + respBody[i].protein + "\n" + 
                        'Carbohydrates: ' + respBody[i].total_carbohydrate,
        }
        nutritionalValue.push(obj);
    }
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": nutritionalValue
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: 'EAATujzfc4pcBOzg9UxwtZCo6JhXWVHZA4KKqXCluDkGyLTWbNn4G4qv7i0BGkgOWhC2jfJnSx9WDk9hmelAEgyqjDVzfmZAp3iRp5klHrhv5ELIC5o4nb50UZCZBo7lUhLu7AgLtFRJclli5FXwG8xlooDETHB5Qr8YwTmcl1Palu7m7PPiQOZCZAUnl06vCAl3' },
            method: 'POST',
            json: {
                recipient: {id: recipientId},
                message: messageData,
            }
    }, function(error, response, body){
        if (error) {
            console.log("Error sending message: " + response.error)
        }
    })
}