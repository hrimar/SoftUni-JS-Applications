// In order to make requests to Kinvey we need the following constants:
const URL = 'https://baas.kinvey.com/';
const APP_KEY = 'kid_BkTzk-E0X';
const APP_SECRET = '46934900776e466da6472d3781486256';
const BASE_64 = btoa('gest' + ':' + 'gest'); // the username and the password from kinvey Users!
const AUTH = {'Authorization': 'Basic ' + BASE_64};

$.ajax({
    method: "GET",
    url: URL + `appdata/${APP_KEY}/students`,
    headers: AUTH,
    success: successfullyGetStudents,
    error: errorDuringGetStudents
});

// -----------

$.ajax({
    method: "POST",
    url: URL + `appdata/${APP_KEY}/students`,
    headers: AUTH,
    data: {age: 50, name: 'Hero'}
}).then((res) => {
    console.log(res);
}).catch((res) => {
    console.log(res);
})

// -----------

$.ajax({
    method: "DELETE",
    url: URL + `appdata/${APP_KEY}/students/5c01558eb1d43d174d5bf73e`, // the added _id from kinley
    headers: AUTH,
    success: successfullyGetStudents,
    error: errorDuringGetStudents
});


function successfullyGetStudents(res) {
    console.log(res); // array of objects from kinvey
}

function errorDuringGetStudents(res) {
    console.log(res);
}