var app = app || {};

app.homeViews = (function () {
    function HomeViews() {
        this.loadWelcomeView = loadWelcomeView;
        this.loadHomeView = loadHomeView;
    }

    function loadWelcomeView(selector) {
        $.get('templates/wellcome-guest.html', function (template) {
            var outHtml = Mustache.render(template);
            $(selector).html(outHtml);
        });
    }

    function loadHomeView(selector, data) {
        $.get('templates/wellcome-user.html', function (template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        });
    }

    return {
        load: function () {
            return new HomeViews();
        }
    };
}());
