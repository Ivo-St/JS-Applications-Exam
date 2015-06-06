/* global noty,sessionStorage */

var app = app || {};

app.estateController = (function () {
    function EstateController(view, model) {
        this.view = view;
        this.model = model;
    }

    EstateController.prototype.showEstates = function (selector) {
        var _this = this;
        this.model.listAllEstates()
            .then(function (data) {
                var myId = sessionStorage.userId;
                for (var index in data.results) {
                    data.results[index].name = $('<div/>').text(data.results[index].name).html();
                    if (data.results[index].ACL[myId] && data.results[index].ACL[myId].write === true) {
                        data.results[index].isEditable = true;
                    } else {
                        data.results[index].isEditable = false;
                    }
                }
                // if it is needed
                /*noty({
                    theme: 'relax',
                    text: 'All estates were successfully loaded!',
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });*/

                _this.view.showEstatesView(selector, data);
            }, function (error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.error || "A problem occurred while trying to get the estates",
                    type: 'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
            });
    };

    EstateController.prototype.showFilteredEstates = function (selector, data) {
        var _this = this;
        this.model.listQueryEstates(data.filter, data.minValue, data.maxValue, data.category)
            .then(function (data) {
                var myId = sessionStorage.userId;
                for (var index in data.results) {
                    data.results[index].name = $('<div/>').text(data.results[index].name).html();
                    if (data.results[index].ACL[myId] && data.results[index].ACL[myId].write === true) {
                        data.results[index].isEditable = true;
                    } else {
                        data.results[index].isEditable = false;
                    }
                }
                //if it is needed
                /*noty({
                    theme: 'relax',
                    text: 'Filtered estates were successfully loaded!',
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });*/

                _this.view.showEstatesView(selector, data);
            }, function (error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.error || "A problem occurred while trying to get the estates",
                    type: 'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
            });
    };

    EstateController.prototype.showEditEstate = function (selector, data) {
        window.location.replace('#/estates/editEstate');
        this.view.showEditEstatesView(selector, data);
    };

    EstateController.prototype.showDeleteEstate = function (selector, data) {
        window.location.replace('#/estates/deleteEstate');
        this.view.showDeleteEstatesView(selector, data);
    };

    EstateController.prototype.showAddEstate = function (selector) {
        this.view.showAddEstatesView(selector);
    };

    EstateController.prototype.editEstate = function (data) {
        this.model.editEstate(data.objectId, data.name, data.price)
            .then(function () {
                noty({
                    theme: 'relax',
                    text: 'The estate was succsessfully edited!',
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });

                window.location.replace('#/estates');
            }, function (error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.error || "A problem occurred while trying to edit the estate",
                    type: 'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
            });
    };

    EstateController.prototype.deleteEstate = function (data) {
        this.model.deleteEstate(data.objectId)
            .then(function () {
                noty({
                    theme: 'relax',
                    text: 'The estate was succsessfully deleted!',
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                });

                window.location.replace('#/estates');
            }, function (error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.error || "A problem occurred while trying to delete the estate",
                    type: 'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
            });
    };

    EstateController.prototype.addEstate = function (data) {
        this.model.addEstate(data.name, data.category, data.price)
            .then(function () {
                noty({
                    theme: 'relax',
                    text: 'The estate was succsessfully added!',
                    type: 'success',
                    timeout: 2000,
                    closeWith: ['click']
                }, function (error) {
                    noty({
                        theme: 'relax',
                        text: error.responseJSON.error || "A problem occurred while trying to add the estate",
                        type: 'error',
                        timeout: 2000,
                        closeWith: ['click']
                    });
                });

                window.location.replace('#/estates');
            });
    };

    return {
        load: function (view, model) {
            return new EstateController(view, model);
        }
    };
}());
