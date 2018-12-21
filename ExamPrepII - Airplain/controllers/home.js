const home = (function () {
    const index = function (ctx) {

        // just for test the index page:
        //ctx.swap('<h2>Index</h2>')


        // Loged in to take all flights if not - to take only public flights:
        let fl;
        if (userModel.isAuthorized()) {
            fl = flightModel.flights(false);

        } else {
            fl = flightModel.flights(true);
        }

        fl.done(function (data) {
            ctx.flights = data;
            ctx.partial('views/home/index.hbs');
        });
    };

    return {
        index
    };
}());