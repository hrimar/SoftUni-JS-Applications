function attachEvents() {           // 100/100 AGAIN !!!
    $('#submit').on('click', function (eventData) {
        let author = $('#author').val();
        let content = $('#content')
        let time = Date.now()

        // $.post("https://messenger-bojo.firebaseio.com/messenger.json", JSON.stringify({
        //     author: author,
        //     content: content.val(),
        //     timestamp: time
        // }));
// or
        $.ajax({
            method: "POST",
            url: "https://messenger-bojo.firebaseio.com/messenger.json",
            data: JSON.stringify({
                author: author,
                content: content.val(),
                timestamp: time
            })
        });

        content.val('');
    })

    $('#refresh').on('click', function (eventData) {
        let messages = $('#messages');
        messages.text('');
        let allMessagesString = '';

        $.ajax({
            method: "GET",
            url: "https://messenger-bojo.firebaseio.com/messenger.json",
            success: function (data, status, xhr) {
                for (let prop in data) {
                    if (data.hasOwnProperty(prop)) {
                        let message = data[prop];
                        allMessagesString += `${message.author}: ${message.content}\n`;
                    }
                }

                messages.text(allMessagesString);
            }
        })

    })
}