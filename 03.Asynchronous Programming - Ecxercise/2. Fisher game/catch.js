function attachEvents() { // 100/100  !!!
    // 1. create  DB at kinvey with name "fisherGame" and collection "biggestCatches"
    // 2. Add user to the above DB with username: gest, pass: pass
    // 3. Check in Postmat the DB url with App key from kinvey and the username and the password that this collection is []

    const appKey = 'kid_SJH29po0m';
    const username = "gest";
    const password = 'pass';
    const authHeaders = 'Basic ' + btoa(username + ':' + password);     //btoa(`${username}:${password}`);
    const baseUrl = `https://baas.kinvey.com/appdata/${appKey}/biggestCatches`;

    $('.load').on('click', loadCatches);
    $('.add').on('click', addCatch);

    // 4. Take input values and add them to the DB in Kinley:
    function addCatch() {
        // 4.1. Take inputs values:
        let angler = $('#addForm .angler').val();
        let weight = Number($('#addForm .weight').val());
        let species = $('#addForm .species').val();
        let location = $('#addForm .location').val();
        let bait = $('#addForm .bait').val();
        let captureTime = Number($('#addForm .captureTime').val());

        // 4.2. Load them to an object:
        let catchObject = {
            angler: angler,
            weight: weight,
            species: species,
            location: location,
            bait: bait,
            captureTime: captureTime
        };

        // 4.3. Send with POST AJAX to kinley the object to be added to DB:
        $.ajax({
            method: 'POST',
            url: baseUrl,
            data:  JSON.stringify(catchObject),
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeaders
            },
            success: loadCatches
        });

        // 4.4. Clear the inputs:
        let inputs = $(this).parent().find('input');
        for(let input of inputs){
            $(input).val('');
        }
    }

    // 5. Make a GET AJAX request to take the data with the above authorization:
    function loadCatches() {
        $.ajax({
            method: 'GET',
            url: baseUrl,
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeaders
            },
            success: handleSuccess
        });
    }

    // 6. Show the result from the GET request:
    function handleSuccess(catches) {

        $('#catches').remove();
        let allCatches = $('<div id="catches">');
        for (let catchObj of catches) {

            const catchTemplate = allCatches.append($(`<div class="catch" data-id="${catchObj._id}">
            <label>Angler</label>
            <input type="text" class="angler" value="${catchObj.angler}"/>
            <label>Weight</label>
            <input type="number" class="weight" value="${catchObj.weight}"/>
            <label>Species</label>
            <input type="text" class="species" value="${catchObj.species}"/>
            <label>Location</label>
            <input type="text" class="location" value="${catchObj.location}"/>
            <label>Bait</label>
            <input type="text" class="bait" value="${catchObj.bait}"/>
            <label>Capture Time</label>
            <input type="number" class="captureTime" value="${catchObj.captureTime}"/>
            <button class="update">Update</button>
            <button class="delete">Delete</button>
        </div>
    </div>`));

            // add EVENT to element of the above html !!!
            $(catchTemplate).find('.delete').on('click', deleteCatch);
            $(catchTemplate).find('.update').on('click', updateCatch);

            $('#main').append(catchTemplate);
        }
    }

    function deleteCatch(e) {
        let catchId = $(this).parent().attr('data-id');
      //  console.log(catchId);

        // let request = {
        //     url: baseUrl + "/" + catchId,
        //     method: "DELETE",
        //     headers: {
        //                 'Authorization': authHeaders
        //              }
        //     }
        // $.ajax(request)
        //     .then(loadCatches)

        $.ajax({
            method: 'DELETE',
            url: baseUrl + "/" + catchId,
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeaders
            },
            success: loadCatches,
           // error: console.log('Error')
        });
    }

    function updateCatch () {
        let inputs = $(this).parent().find('input');
        let catchId = $(this).parent().attr('data-id');

        let catchObj = {
            angler: $(inputs[0]).val(),
            weight: Number($(inputs[1]).val()),
            species: $(inputs[2]).val(),
            location: $(inputs[3]).val(),
            bait: $(inputs[4]).val(),
            captureTime: Number($(inputs[5]).val())
        }

        $.ajax({
            method: 'PUT',
            url: baseUrl + "/" + catchId,
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeaders
            },
            data: JSON.stringify(catchObj),
            success: loadCatches
        });
    }
}

// // or var.2 - 100/100:
// function attachEvents() {
//     const baseSurviceUrl = "https://baas.kinvey.com/appdata/kid_rkxScVJGe/biggestCatches";
//     const kinveyUsername = "guest";
//     const kinveyPassword = "guest";
//     const base64Auth = btoa(kinveyUsername + ":" + kinveyPassword);
//     const authHeaders = {"Authorization":"Basic " + base64Auth};
//
//     $('.load').click(loadCatches);
//     $('.add').click(addCatch);
//
//     function loadCatches() {
//         let request = {
//             url: baseSurviceUrl,
//             method: "GET",
//             headers: authHeaders
//         };
//
//         $.ajax(request)
//             .then(displayCatches);
//
//         function displayCatches(catches) {
//             $('#catches').empty();
//
//             for(let catche of catches){
//                 $('#catches')
//                     .append($('<div>').addClass("catch").attr("data-id", catche._id)
//                         .append($('<label>').text("Angler"))
//                         .append($('<input>').attr("type", "text").addClass("angler").val(catche.angler))
//                         .append($('<label>').text("Weight"))
//                         .append($('<input>').attr("type", "number").addClass("weight").val(catche.weight))
//                         .append($('<label>').text("Species"))
//                         .append($('<input>').attr("type", "text").addClass("species").val(catche.species))
//                         .append($('<label>').text("Location"))
//                         .append($('<input>').attr("type", "text").addClass("location").val(catche.location))
//                         .append($('<label>').text("Bait"))
//                         .append($('<input>').attr("type", "text").addClass("bait").val(catche.bait))
//                         .append($('<label>').text("Capture Time"))
//                         .append($('<input>').attr("type", "number").addClass("captureTime").val(catche.captureTime))
//                         .append($('<button>').addClass("update").text("Update").click(updateCatch))
//                         .append($('<button>').addClass("delete").text("Delete").click(deleteCatch))
//                     );
//             }
//         }
//     }
//
//     function addCatch() {
//         let inputs = $(this).parent().find('input');
//
//         let request = {
//             url: baseSurviceUrl,
//             method: "POST",
//             headers: {"Authorization": "Basic " + base64Auth, "Content-type": "application/json"},
//             data: JSON.stringify({
//                 angler: $(inputs[0]).val(),
//                 weight: Number($(inputs[1]).val()),
//                 species: $(inputs[2]).val(),
//                 location: $(inputs[3]).val(),
//                 bait: $(inputs[4]).val(),
//                 captureTime: Number($(inputs[5]).val())
//             })
//         };
//
//         $.ajax(request)
//             .then(loadCatches);
//
//         for(let input of inputs){
//             $(input).val('');
//         }
//     }
//
//     function updateCatch() {
//         let inputs = $(this).parent().find('input');
//         let catchId = $(this).parent().attr('data-id');
//
//         let request = {
//             url: baseSurviceUrl + "/" + catchId,
//             method: "PUT",
//             headers: {"Authorization": "Basic " + base64Auth, "Content-type": "application/json"},
//             data: JSON.stringify({
//                 angler: $(inputs[0]).val(),
//                 weight: $(inputs[1]).val(),
//                 species: $(inputs[2]).val(),
//                 location: $(inputs[3]).val(),
//                 bait: $(inputs[4]).val(),
//                 captureTime: $(inputs[5]).val()
//             })
//         };
//
//         $.ajax(request)
//             .then(loadCatches)
//     }
//
//     function deleteCatch() {
//         let catchId = $(this).parent().attr('data-id');
//
//         let request = {
//             url: baseSurviceUrl + "/" + catchId,
//             method: "DELETE",
//             headers: authHeaders
//         }
//
//         $.ajax(request)
//             .then(loadCatches)
//     }
// }