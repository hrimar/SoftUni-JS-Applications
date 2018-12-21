const flightModel = (function () {
    let flightUrl = `appdata/${storage.appKey}/flights`;

    const add = function(params){
        const data = {
            "destination": params.destination, // from create form section name="description"
            "origin": params.origin,
            "departure": params.departureDate,
            "departureTime": params.departureTime,
            "seats": params.seats,
            "cost": params.cost,
            "image": params.img,
            "isPublished": !!params.public //  because it is checkbox!!
        };

        return requester.post(flightUrl, data);
    };

    const flights = function (onlyPublic) {
        let url = flightUrl;

        if(onlyPublic){ // has to check also ours
            url += '?query={"isPublished":true}';
        }

        return requester.get(url);
    };

    // TODO: make methods for edit and delete of flights!

    return {
        add,
        flights
    };
})();