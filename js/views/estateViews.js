var app = app || {};

app.estateView = (function () {
    function EstateView() {
        this.showEstatesView = showEstatesView;
        this.showEditEstatesView = showEditEstateView;
        this.showDeleteEstatesView = showDeleteEstateView;
        this.showAddEstatesView = showAddEstateView;
    }

    function showEstatesView(selector, data) {
        $.get('templates/list-estates.html', function (template) {
            var outputHtml = Mustache.render(template, data);
            $(selector).html(outputHtml);
        }).then(function () {
            $('.edit-button').click(function () {
                var data = getElementData(this);
                $.sammy(function () {
                    this.trigger('showEditEstate', data);
                });
            });

            $('.delete-button').click(function () {
                var data = getElementData(this);

                $.sammy(function () {
                    this.trigger('showDeleteEstate', data);
                });
            });

            $('#filter').click(function () {
                var data = {
                    filter: encodeURIComponent($('#search-bar').val()),
                    minValue: $('#min-price').val(),
                    maxValue: $('#max-price').val(),
                    category: $('#category').val()
                };

                $.sammy(function () {
                    this.trigger('filterEstates', data);
                });
            });

            $('#clear-filters').click(function () {
                $('#search-bar').val('');
                $('#min-price').val(0);
                $('#max-price').val(0);
                $('#category').val('Any');
            });
        }).done();
    }

    function showEditEstateView(selector, data) {
        $.get('templates/edit-estate.html', function (template) {
            var outputHtml = Mustache.render(template, data);
            $(selector).html(outputHtml);
        }).then(function () {
            $('#edit-estate-button').click(function () {
                var id = $($(this).parent().parent().children()[1]).attr('data-id');
                var price = $('#price').val() || 0;
                var data = {
                    name: $('#item-name').val(),
                    price: price,
                    objectId: id
                };

                $.sammy(function () {
                    this.trigger('editEstate', data);
                });
            });
        });
    }

    function showDeleteEstateView(selector, data) {
        $.get('templates/delete-estate.html', function (template) {
            var outputHtml = Mustache.render(template, data);
            $(selector).html(outputHtml);
        }).then(function () {
            $('#delete-estate-button').click(function () {
                var id = $($(this).parent().parent().children()[1]).attr('data-id');
                var data = {
                    objectId: id
                };

                $.sammy(function () {
                    this.trigger('deleteEstate', data);
                });
            });
        });
    }

    function showAddEstateView(selector) {
        $.get('templates/add-estate.html', function (template) {
            var outputHtml = Mustache.render(template);
            $(selector).html(outputHtml);
        }).then(function () {
            $('#add-estate-button').click(function () {
                var price = $('#price').val() || 0;
                var data = {
                    name: $('#name').val(),
                    price: price,
                    category: $('#category').val()
                };

                $.sammy(function () {
                    this.trigger('addEstate', data);
                });
            });
        });
    }

    function getElementData(element) {
        var name = $($(element).parent().parent().parent().children()[0]).find('.item-name').text();
        var estate = $($(element).parent().parent().parent().children()[0]).find('.categoryType').text();
        var price = $($(element).parent().parent().parent().children()[0]).find('.priceNumber').text();
        var id = $(element).parent().parent().parent().attr('data-id');

        return {
            name: name,
            price: price,
            estate: estate,
            objectId: id
        };
    }

    return {
        load: function () {
            return new EstateView();
        }
    };
}());
