function secretKnock() {        // strange task
    const appKey = 'kid_BJXTsSi-e';
    const appSecret = '447b8e7046f048039d95610c1b039390';
    const username = "guest";
    const password = 'guest';
    const authHeaders = 'Basic ' + btoa(username + ':' + password); //btoa(`${username}:${password}`);
    const baseUrl = `https://baas.kinvey.com/appdata/kid_BJXTsSi-e/knock`;
    const baseServiceUrl = baseUrl+ '/knock?query=';

   // let authHeaders = {"Authorization":"Basic " + base64Auth};
    let currentMessage = "Knock Knock.";
    console.log(currentMessage);
    getNext(currentMessage);

    function getNext(message) {
        let request = {
            method: "GET",
            url: baseServiceUrl + message,
            headers: {
                "Authorization": authHeaders
            }
        };

        $.ajax(request)
            .then(function (object) {
                if(object.answer){
                    console.log(object.answer);
                }
                if(object.message){
                    console.log(object.message);
                    currentMessage = object.message;
                    getNext(currentMessage);
                }
            });
    }
}

