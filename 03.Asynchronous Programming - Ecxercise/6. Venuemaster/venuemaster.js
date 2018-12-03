function attachEvents() {           // OK - но УЖАСНА ЗАДАЧА
    // Attach users credentials for each request
    // Get all venues for given date (POST)
    // Iterate venue IDs and request details (parallel GET requests)
    // Compose HTML and attach button event handlers
    // Purchase ticket request (POST)
    // Display ticket


    $('#getVenues').on('click', getVenues);


    async function getVenues() {
        const infoDiv = $('#venue-info');
        const date = $('#venueDate').val();
        const venueIds = await getAllVenues(date);
        const details = await Promise.all(venueIds.map(id => getVenueDetails(id)));
        //console.log(details);
        infoDiv.empty();
        for (let venue of details) {
            infoDiv.append(renderVenue(venue));
        }
    }

    function renderVenue(venue) {
        const html = $(`<div class="venue" id="${venue._id}">
  <span class="venue-name"><input class="info" type="button" value="More info">${venue.name}</span>
  <div class="venue-details" style="display: none;">
    <table>
      <tr><th>Ticket Price</th><th>Quantity</th><th></th></tr>
      <tr>
        <td class="venue-price">${venue.price} lv</td>
        <td><select class="quantity">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select></td>
        <td><input class="purchase" type="button" value="Purchase"></td>
      </tr>
    </table>
    <span class="head">Venue description:</span>
    <p class="description">${venue.description}</p>
    <p class="description">Starting time: ${venue.startingHour}</p>
  </div>
</div>`); // this is html fragment for later manipulation!

        $(html).find('.info').on('click', () => {   // add EVENT to element of the above html !!!
            $('.venue-details').show();
        });

    $(html).find('.purchase').on('click', (e) => {
        const qty = $(html).find('.quantity option:selected').val();
       //alert(qty)

        renderConfirmScreen(venue._id, venue.name, qty, venue.price)
    });

    return html;
    }

    function renderConfirmScreen(venueId, name, qty, price) {
            const html = $(`<span class="head">Confirm purchase</span>
<div class="purchase-info">
  <span>${name}</span>
  <span>${qty} x ${price}</span>
  <span>Total: ${qty * price} lv</span>
  <input type="button" value="Confirm">
</div>`);

            $(html).find('input').on('click', () => purchaseTicket(venueId, qty));

            $('#venue-info').html(html); // render new html

            return html;
    }


    const host = 'https://baas.kinvey.com';

    async function getAllVenues(date) {         // we have to authorise with username and pass
        const ids = await $.post({
            url: `${host}/rpc/kid_BJ_Ke8hZg/custom/calendar?query=${date}`,
            headers: {
                'Authorization': 'Basic Z3Vlc3Q6cGFzcw=='
            }
        });
        //console.log(ids);       // btoa('guest:pass') !!!
        return ids;
    }

    async function getVenueDetails(venueId) {
        const details = await $.get({
            url: `${host}/appdata/kid_BJ_Ke8hZg/venues/${venueId}`,
            headers: {
                'Authorization': 'Basic Z3Vlc3Q6cGFzcw=='   // btoa('guest:pass') !!!
            }
        });
//        console.log(details)
        return details;
    }

    async function purchaseTicket(venueId, qty) {
        const ticket = await $.post({
            url: `${host}/rpc/kid_BJ_Ke8hZg/custom/purchase?venue=${venueId}&qty=${qty} `,
            headers: {
                'Authorization': 'Basic Z3Vlc3Q6cGFzcw==' // btoa('guest:pass') !!!
            }
        });


        $('#venue-info').html(ticket.html);
    }
}

// https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/calendar?query=24-11
// 'https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/calendar?query=24-11',//