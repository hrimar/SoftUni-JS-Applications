function attachEvents() {       // 100 / 100 - var.1 AGAIN !!!
    let phonebookElement = $('#phonebook');
    let personInputElement = $('#person');
    let phoneInputElement = $('#phone');

    function recieveContacts() {
        phonebookElement.text('')
        $.ajax({
            url: 'https://phonebook-nakov.firebaseio.com/phonebook.json',
            success: displayReport
        })
    }

    function displayReport(data) {
        for (let id in data) {
            if (data.hasOwnProperty(id)) {      // !!!
                let contact = data[id];
                phonebookElement.append(
                    $('<li>')
                        .text(`${contact.person}: ${contact.phone}`)
                        .attr('id-db', `${id}`)
                        .append(
                            $('<button>')
                                .text('[Delete]')
                                .on('click', deleteContact)
                        )
                )
            }
        }
    }

    function deleteContact(eventData) {
        let selectedLi = $(eventData.target).parent()
        let dbId = selectedLi.attr('id-db')

        $.ajax({
            method: 'DELETE',
            url: `https://phonebook-nakov.firebaseio.com/phonebook/${dbId}.json`
        })

        selectedLi.remove();
    }

    function postContact() {
        let person = personInputElement.val();
        let phone = phoneInputElement.val();

        $.ajax({
            url: 'https://phonebook-nakov.firebaseio.com/phonebook.json',
            method: 'POST',
            data: JSON.stringify({
                person,
                phone
            })
        })

        personInputElement.val('')
        phoneInputElement.val('')

        recieveContacts();
    }

    $('#btnLoad').on('click', recieveContacts)

    $('#btnCreate').on('click', postContact)
}


// function attachEvents() {            // 100/100  - var.2 AGAIN !!!
//     $('#btnLoad').click(loadContacts);
//     $('#btnCreate').click(createContact);
//
//     let baseServiceUrl = "https://phonebook-nakov.firebaseio.com/phonebook";
//
//     function loadContacts() {
//         $('#phonebook').empty();
//         $.get(baseServiceUrl + ".json")
//             .then(displayContacts)
//             .catch(displayError);
//     }
//
//     function displayContacts(contacts) {
//         for(let key in contacts){
//             let person = contacts[key]['person'];
//             let phone = contacts[key]['phone'];
//
//             $('#phonebook')
//                 .append($('<li>').text(person + ': ' + phone + ' ')
//                     .append($('<button>').text('Delete').click(function () {
//                         deleteContact(key)
//                     })));
//         }
//     }
//
//     function displayError(err) {
//         $('#phonebook').append($('<li>').text("Error"));
//     }
//
//     function createContact() {
//         let newContactJSON = JSON.stringify({
//             person: $('#person').val(),
//             phone: $('#phone').val()
//         });
//
//         $.post(baseServiceUrl + '.json', newContactJSON)
//             .then(loadContacts)
//             .catch(displayError);
//
//         $('#person').val('');
//         $('#phone').val('');
//     }
//
//     function deleteContact(key) {
//         let request = {
//             method: 'DELETE',
//             url: baseServiceUrl + '/' + key + '.json'
//         };
//
//         $.ajax(request)
//             .then(loadContacts)
//             .catch(displayError);
//     }
// }