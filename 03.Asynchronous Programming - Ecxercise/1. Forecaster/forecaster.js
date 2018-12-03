// var.1 - with Promises - 100/100 !!
function attachEvents() {
    const host = 'https://judgetests.firebaseio.com/';
    const symbols = {
        'Sunny': '&#x2600;',
        'Partly sunny': '&#x26C5;',
        'Overcast': '&#x2601;',
        'Rain': '&#x2614;'
    };

    $('#submit').on('click', getWeather);


    function getWeather() {
        // 1. Get the name from the input field:
        let locationName = $('#location').val();

        // 2. Get all location codes (async 1):
        $.get(host + 'locations.json')
            .then(parseData)    // accept all values from GET request
            .catch(handleError);

        function parseData(codes) {
            let code;
            for (let loc of codes) {
                if (loc.name === locationName) {
                    code = loc.code;
                    break;
                }
            }

            // 3. Request today's and upcoming forecast (async 2)
            Promise.all([
                $.get(`${host}forecast/today/${code}.json`),
                $.get(`${host}forecast/upcoming/${code}.json`)
            ])
                .then(displayResult) // accept array of the results of all promises
                .catch(handleError);
        }

        function displayResult([today, upcoming]) {
            const todayDiv = $('#current');
            const upcomingDiv = $('#upcoming');
            console.log(today);

            const symbol = symbols[today.forecast.condition];

            const htmlSymbol = `<span class="condition symbol">${symbol}</span>`;
            const htmlContent = `<span class="condition">
                    <span class="forecast-data">${today.name}</span>
                    <span class="forecast-data">${today.forecast.low}&#176; / ${today.forecast.high}&#176;
                    <span class="forecast-data">${today.forecast.condition}</span>
                    </span>`;

            todayDiv.empty();
            todayDiv.append('<div class="label">Current conditions</div>');
            todayDiv.append(htmlSymbol);
            todayDiv.append(htmlContent);

            upcomingDiv.empty();
            upcomingDiv.append('<div class="label">Three-day forecast</div>');
            for (let day of upcoming.forecast) {
                upcomingDiv.append(renderUpcoming(day));
            }

            $('#forecast').show(); // to show the display: none element!
        }

        function renderUpcoming(day) {
            const symbol = symbols[day.condition];

            return `<span class="upcoming">
                <span class="symbol">${symbol}</span>
                <span class="forecast-data">${day.low}&#176; / ${day.high}&#176;</span>
                <span class="forecast-data">${day.condition}</span>
                </span>`;
        }
    }

    function handleError() {
        $('#forecast').text('Error');
        $('#forecast').show();
    }


}

// // var.2 - with async/await - 100/100
// function attachEvents() {
//     const host = 'https://judgetests.firebaseio.com/';
//     const symbols = {
//         'Sunny': '&#x2600;',
//         'Partly sunny': '&#x26C5;',
//         'Overcast': '&#x2601;',
//         'Rain': '&#x2614;'
//     };
//
//     $('#submit').on('click', getWeather);
//
//
//     async function getWeather() {
//         // 1. Get the name from the input field:
//         let locationName = $('#location').val();
//
//         // 2. Get all location codes (async 1): - the difference - !!!
//         let codes = [];
//         try {
//             codes = await $.get(host + 'locations.json');
//         } catch (err) {
//             handleError(err);
//         }
//
//         let code;
//         for (let loc of codes) {
//             if (loc.name === locationName) {
//                 code = loc.code;
//                 break;
//             }
//         }
//
//         // 3. Request today's and upcoming forecast (async 2) - the difference - !!!
//         let today = {};
//         let upcoming = {};
//         try {
//             [today, upcoming] = await Promise.all([
//                 $.get(`${host}forecast/today/${code}.json`),
//                 $.get(`${host}forecast/upcoming/${code}.json`)
//             ]);
//
//             if(today === null || upcoming === null) { // API=та често връщат null при невалиден url
//                 throw new Error('Invalid data');
//             }
//         } catch (err) {
//             handleError(err);
//         }
//
//
//         const todayDiv = $('#current');
//         const upcomingDiv = $('#upcoming');
//         console.log(today);
//
//         const symbol = symbols[today.forecast.condition];
//
//         const htmlSymbol = `<span class="condition symbol">${symbol}</span>`;
//         const htmlContent = `<span class="condition">
//                     <span class="forecast-data">${today.name}</span>
//                     <span class="forecast-data">${today.forecast.low}&#176; / ${today.forecast.high}&#176;
//                     <span class="forecast-data">${today.forecast.condition}</span>
//                     </span>`;
//
//         todayDiv.empty();
//         todayDiv.append('<div class="label">Current conditions</div>');
//         todayDiv.append(htmlSymbol);
//         todayDiv.append(htmlContent);
//
//         upcomingDiv.empty();
//         upcomingDiv.append('<div class="label">Three-day forecast</div>');
//         for (let day of upcoming.forecast) {
//             upcomingDiv.append(renderUpcoming(day)); // using template function
//         }
//
//         $('#forecast').show(); // to show the display: none element!
//
//
//         function renderUpcoming(day) {      // this is template function
//             const symbol = symbols[day.condition];
//
//             return `<span class="upcoming">
//                 <span class="symbol">${symbol}</span>
//                 <span class="forecast-data">${day.low}&#176; / ${day.high}&#176;</span>
//                 <span class="forecast-data">${day.condition}</span>
//                 </span>`;
//         }
//     }
//
//     function handleError(err) {
//         $('#forecast').text('Error');
//         $('#forecast').show();
//     }
//
//
//}