const user = (function () {
    const getLogin = function (ctx) {
        ctx.partial('views/user/login.hbs');
    };

    const postLogin = function (ctx) {
        let username = ctx.params.username;     // the same as name="..." in login.hbs!
        let password = ctx.params.pass; // the same as name="..." in login.hbs!

        userModel.login(username, password).done(function (data) {
            storage.saveUser(data);

            // to show notifications from index.html with helpers/notifications:
            notification.info('Login successful.');
            ctx.redirect('#/');
        }).fail(function () {
            notification.error('Your username or password is incorrect!');
            $('input[name="username"]').val('');   // to clear the validation messages!
            $('input[name="pass"]').val('');   // to clear the validation messages!
        });
    };

    const logout = function (ctx) {
        userModel.logout().done(function () {
            storage.deleteUser();

            notification.info('Logout successful.');
            ctx.redirect('#/login');
        });
    }

    const getRegister = function (ctx) {
        ctx.partial('views/user/register.hbs');
    };

    const postRegister = function (ctx) {
        userModel.register(ctx.params).done(function (data) {
            storage.saveUser(data);

            notification.info('User registration successful.');
            ctx.redirect('#/');
        });
    }

    const initializeLogin = function () { // clear/show Logout and {name}
        let userInfo = storage.getData('userInfo');

        if (userModel.isAuthorized()) {   // checks the availability of authToken
            $('#userViewName').text(userInfo.username);
            $('#logoutContainer').removeClass('d-none');
            $('.hidden-when-logged-in').addClass('d-none');
        } else {
            $('#logoutContainer').addClass(('d-none'));
            $('.hidden-when-logged-in').removeClass('d-none');
        }
    };

    return {
        getLogin,
        postLogin,
        logout,
        getRegister,
        postRegister,
        initializeLogin
    };
}());