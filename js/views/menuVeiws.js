var app = app || {};

app.menuViews = (function () {
    function MenuView() {
        this.showWelcomeMenuView = showWellcomeMenuView;
        this.showUserMenuView = showUserMenuView;
    }

    function showWellcomeMenuView(selector) {
        $.get('templates/wellcome-menu.html', function (template) {
            $(selector).html(template);
        });
    }

    function showUserMenuView(selector) {
        $.get('templates/user-menu.html', function (template) {
            $(selector).html(template);
        });
    }

    return {
        load: function () {
            return new MenuView();
        }
    };
}());
