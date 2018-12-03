function attachEvents() {

    // // var.1:
    // $('#btnLoadTowns').on('click', function () {
    //     let input = $('#towns').val();
    //     let context = {};
    //
    //     let townNames = input.split(', ')
    //     context['towns'] = [];
    //     for (let name  of townNames) {
    //         context['towns'].push({'name': name});
    //     }
    //
    //     let source = $('#towns-template').html();
    //     let template = Handlebars.compile(source);
    //     let html = template(context);
    //     $('#root').append(html);
    //
    //     $('#towns').val('');
    // });

    // // var.2
    $('#btnLoadTowns').on('click', function () {
        let input = $('#towns').val().split(', ').reduce((acc, cur) => {
            acc.towns.push({name: cur});
            return acc;
        }, acc = {towns: []});

        renderTowns(input);

        $('#towns').val('');
    });

    async function renderTowns(towns) {
        let source = await $.get('template.hbs');
        let template = Handlebars.compile(source);
        let html = template(towns);
        //$('#root').append(html);    // this will add the new li items to the previous one
        $('#root').html(html);    // this will replace the li items with the previous one
    }
}