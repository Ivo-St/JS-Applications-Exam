/* global Sammy, noty, sessionStorage */

var app = app || {};

(function () {
    var headers = app.headers.load('TpRbssJN4je5iSlU5CtyITdr8fHQKWh8GAOuJDAT', 'QZ7wjTo2U4DbX2SPnRBrTEVf0mzNe1pP9HuVi7P3');
    var requester = app.requester.load();

    var estateModel = app.estateModel.load('https://api.parse.com/1/', requester, headers);
    var userModel = app.userModel.load('https://api.parse.com/1/', requester, headers);

    var homeView = app.homeViews.load();
    var userView = app.userViews.load();
    var estateView = app.estateView.load();
    var menuView = app.menuViews.load();

    var homeController = app.homeController.load(homeView);
    var userController = app.userController.load(userModel, userView);
    var estateController = app.estateController.load(estateView, estateModel);

    app.router = Sammy(function () {
        var selector = '#main';

        this.before(function () {
            var userId = sessionStorage.userId;
            if (userId) {
                menuView.showUserMenuView('#menu');
            } else {
                menuView.showWelcomeMenuView('#menu');
            }
        });

        this.before({
            except: {
                path: '#\/(register|login)?'
            }
        }, function () {
            var userId = sessionStorage.userId;
            if (!userId) {
                noty({
                    theme: 'relax',
                    text: 'You should be logged in to do this action!',
                    type: 'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
                this.redirect('#/');
                return false;
            }
        });

        this.get('#/', function () {
            homeController.showWelcomeScreen(selector);
        });

        this.get('#/login', function () {
            userController.showLoginScreen(selector);
        });

        this.get('#/register', function () {
            userController.showRegisterScreen(selector);
        });

        this.get('#/home', function () {
            homeController.showHomeScreen(selector);
        });

        this.get('#/logout', function () {
            userController.logout();
            this.redirect('#/');
        });

        this.get('#/estates', function () {
            estateController.showEstates(selector);
        });

        this.get('#/estates/editEstate', function () {
            estateController.showEditEstate(selector);
        });

        this.get('#/estates/deleteEstate', function () {
            estateController.showDeleteEstate(selector);
        });

        this.get('#/estates/addEstate', function () {
            estateController.showAddEstate(selector);
        });

        this.bind('login', function (e, data) {
            var _this = this;
            userController.login(data)
                .then(function () {
                    _this.redirect('#/home');
                }).done();
        });

        this.bind('register', function (e, data) {
            var _this = this;
            userController.register(data.username, data.password, data.fullName)
                .then(function () {
                    _this.redirect('#/home');
                }).done();
        });

        this.bind('showEditEstate', function (e, data) {
            estateController.showEditEstate(selector, data);
        });

        this.bind('showDeleteEstate', function (e, data) {
            estateController.showDeleteEstate(selector, data);
        });

        this.bind('editEstate', function (e, data) {
            data.price = parseFloat(data.price) || 0;
            estateController.editEstate(data);
        });

        this.bind('addEstate', function (e, data) {
            data.price = parseFloat(data.price) || 0;
            estateController.addEstate(data);
        });

        this.bind('deleteEstate', function (e, data) {
            estateController.deleteEstate(data);
        });

        this.bind('filterEstates', function (e, data) {
            estateController.showFilteredEstates(selector, data);
        });
    });

    app.router.run('#/');
}());
