$(() => {
        renderCatTemplate();

        // // var.1:
        // function renderCatTemplate() {
        //
        //     $.get('templateFile.hbs').then((result) => {
        //         let template = Handlebars.compile(result);
        //
        //         // foreach is here instead of in the template file:
        //         for (let cat   of cats) {
        //             let html = template(cat);
        //             $('#allCats').append(html);
        //         }
        //
        //         Array.from($('button')).forEach((btn) => $(btn).on('click', showHideInfo)); // or
        //         // $('button').each((i, btn) => $(btn).on('click', showHideInfo)); // this is jQuery forEach
        //
        //         function showHideInfo() {
        //             let btn = $(this);
        //             if (btn.text() === 'Show status code') {
        //                 // btn.next().css('display', 'block');
        //                 btn.next().show();
        //                 btn.text('Hide status code');
        //             } else {
        //                 btn.next().css('display', 'none');
        //                 btn.text('Show status code');
        //             }
        //         }
        //     });
        // }

        // // var.2: - not use separate template file:
        // function renderCatTemplate() {
        //     let source = $('#cat-template').html();
        //     let template = Handlebars.compile(source);
        //     for (let cat of cats) {
        //         let html = template(cat);
        //         $('#allCats').append(html);  // !!!
        //     }
        //
        //     Array.from($('button')).forEach((btn) => $(btn).on('click', showHideInfo)); // or
        //     // $('button').each((i, btn) => $(btn).on('click', showHideInfo)); // this is jQuery forEach
        //
        //     function showHideInfo() {
        //         let btn = $(this);
        //         if(btn.text() === 'Show status code'){
        //             // btn.next().css('display', 'block');
        //             btn.next().show();
        //             btn.text('Hide status code');
        //         }else {
        //             btn.next().css('display', 'none');
        //             btn.text('Show status code');
        //         }
        //     }
        //}

        // var.3: - forEach is not here but in the template file
        function renderCatTemplate() {

            $.get('templateFile.hbs').then((result) => {
                let template = Handlebars.compile(result);
                let html = template({cats});
                $('#allCats').html(html);   // !!!

                Array.from($('button')).forEach((btn) => $(btn).on('click', showHideInfo)); // or
                // $('button').each((i, btn) => $(btn).on('click', showHideInfo)); // this is jQuery forEach

                function showHideInfo() {
                   let btn = $(this);
                   if(btn.text() === 'Show status code'){
                       // btn.next().css('display', 'block');
                       btn.next().show();
                       btn.text('Hide status code');
                   }else {
                       btn.next().css('display', 'none');
                       btn.text('Show status code');
                   }
                }
            });
        }
    }
)
