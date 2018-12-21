function startApp() {       // TO BE CONTINUE...

    const templates = {};

    // Attach click events
    (() => {
        $('header').find('a[data-target]').click(navigateTo);
        $('#buttonLoginUser').click(login);
        $('#buttonRegisterUser').click(register);
        $('#linkLogout').click(logout);
        $('#buttonCreateAd').click(createAd);
        $('.notification').click(function () {
            $(this).hide();
        });
    })();


    if (localStorage.getItem('authtoken') !== null) {
        userLoggedIn();
    } else {
        userLoggedOut();
    }


    function handleError(reason) {
        showError(reason.responseJSON.description);
    }


    // Shows only the correct links for a logged in user
    function userLoggedIn() {
        // 1. Show welcome message in the header and all other links:
        let span = $('#loggedInUser');
        span.text(`Welcome ${localStorage.getItem('username')}`)
        span.show();
        $('#linkHome').show();
        $('#linkListAds').show();
        $('#linkCreateAd').show();
        $('#linkLogout').show();
        $('#linkLogin').hide();
        $('#linkRegister').hide();

        showView('viewHome');
    }

    // Shows only the correct links for an anonymous user
    function userLoggedOut() {
        // 1. Show message in the header and all other links:
        let span = $('#loggedInUser');
        span.text("")
        span.hide();
        $('#linkHome').show();
        $('#linkListAdsnk').hide();
        $('#linkCreateAd').hide();
        $('#linkLogout').hide();
        $('#linkLogin').show();
        $('#linkRegister').show();

        showView('viewHome');
    }

    async function loadTemplates() {
        const [adsCatalogTemplate, adBoxTemplate]
            = await Promise.all([
            $.get('./templates/ads-catalog.html'),
            $.get('./templates/ad-box-partial.html')
        ]);

        templates['catalog'] = Handlebars.compile(adsCatalogTemplate);
        Handlebars.registerPartial('adBox', adBoxTemplate);
    }

    loadTemplates();

    function showView(viewName) {
        // Hide all views and show the selected view only
        $('main > section').hide();
        $('#' + viewName).show();

        if (viewName === 'viewAds') {
            loadAds();
        }
    }

    function navigateTo() {
        // when you click on link to show the exact section /smart solution !/:
        $('section').hide();
        let target = $(this).attr('data-target');
        showView(target);
    }

    // Saves username/id/authtoken to local storage
    function saveSession(data) {
        localStorage.setItem('username', data.username);
        localStorage.setItem('id', data._id);
        localStorage.setItem('authtoken', data._kmd.authtoken);
        userLoggedIn();
    }

    // Logs in the user
    async function login() {
        let form = $('#formLogin');
        let username = form.find('input[name="username"]').val();
        let password = form.find('input[name="passwd"]').val();

        try {
            let response = await requester.post('user', 'login', 'basic', {username, password});
            saveSession(response);
            showView('viewAds');
            showInfo('Successfully logged in!');
        } catch (e) {
            handleError(e);
        }
    }

    // Register a user
    async function register() {
        let form = $('#formRegister');
        let username = form.find('input[name="username"]').val();
        let password = form.find('input[name="passwd"]').val();

        try {
            let response = await requester.post('user', '', 'basic', {username, password});
            saveSession(response);
            showView('viewAds');
            showInfo('Successfully registered!');
        } catch (e) {
            handleError(e);
        }
    }

    // Logout a user
    async function logout() {
        try {
            await requester.post('user', '_logout', 'kinvey', {authtoken: localStorage.getItem('authtoken')});
            localStorage.clear(); // Clears all session storage on logout
            userLoggedOut();
            showView('viewHome');
            showInfo('Logout successful!')
        } catch (e) {
            handleError(e);
        }
    }

    // Load all ads
    async function loadAds() {
        let content = $('#content');

        let ads = await requester.get('appdata', "adverts");

        //ONLY if you are author :
        ads.forEach(a => {
            if(a._acl.creator === localStorage.getItem('id')){
                a.isAutor = true;
            }
        })

        let context = {
            ads
        };

        let html = templates['catalog'](context);
        content.html(html);

        let editButton = $(content).find('.ad-box').find('.edit');
        let deleteButton = $(content).find('.ad-box').find('.delete');

        editButton.on('ckick', oppenEditAdd);
        deleteButton.on('click', deleteAdd);
    }

    // Create an add
    async function createAd() {
        let form = $('#formCreateAd');
        let title = form.find('input[name="title"]').val(); // !!!
        let description = form.find('textarea[name="description"]').val(); // !!!
        let price = form.find('input[name="price"]').val(); // !!!
        let imageURL = form.find('input[name="imageUrl"]').val(); // !!!
        let publisher = localStorage.getItem('username');
        let date = new Date().getUTCDate();

        if (title.length === 0) {
            showError("Title can't be ampty");
            return;
        }
        if (price.length === 0) {
            showError("Price can't be ampty");
            return;
        }

        let newAd = {
            title,
            description,
            price,
            imageURL,
            publisher,
            date
        };

        try {
            await requester.post('appdata', 'adverts', '', newAd);
            showView('viewAds');
            showInfo('Ad created');

            $('#formCreateAd').reset(); // or
            // form.find('input[name="title"]').val('');
            // form.find('textarea[name="description"]').val(''); // !!!
            // form.find('input[name="price"]').val(''); // !!!
            // form.find('input[name="imageUrl"]').val('');

        } catch (e) {
            handleError(e)
        }

    }

    // Delete an add
    async function deleteAd() {

    }

    // Edit an add
    async function editAd(id, publisher, date) {

    }

    // Open edit add view
    async function openEditAdd() {

    }
}