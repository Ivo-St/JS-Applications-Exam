/* global sessionStorage */

var app = app || {};

app.estateModel = (function () {
    function EstateModel(baseUrl, requester, headers) {
        this.serviceUrl = baseUrl + 'classes/Estate';
        this.requester = requester;
        this.headers = headers;
    }

    EstateModel.prototype.listAllEstates = function () {
        var url = this.serviceUrl + '?include=category';
        return this.requester.get(this.headers.getHeaders(true), url);
    };

    EstateModel.prototype.listQueryEstates = function (filter, minPrice, maxPrice, categoryId) {
        var category = {
            __type: 'Pointer',
            className: 'Category',
            objectId: categoryId
        };

        var url = this.serviceUrl + '?where={' +
            '"price":' +
            '{"$gte":' + minPrice +
            ',"$lte":' + maxPrice + '}';
        if (categoryId !== 'Any') {
            url += ',"category":' + JSON.stringify(category);
        }
        if (filter && filter !== '') {
            url += ',"name":' + '"' + filter + '"';
        }
        url += '}&include=category&';

        return this.requester.get(this.headers.getHeaders(true), url);
    };

    EstateModel.prototype.addEstate = function (name, categoryId, price) {
        var userId = sessionStorage.userId;
        var url = this.serviceUrl;
        var data = {
            name: name,
            price: price,
            category: {
                __type: 'Pointer',
                className: 'Category',
                objectId: categoryId
            },
            ACL: {}
        };

        data.ACL[userId] = {
            "write": true,
            "read": true
        };

        data.ACL['*'] = {
            "read": true
        };

        return this.requester.post(this.headers.getHeaders(true), url, data);
    };

    EstateModel.prototype.editEstate = function (estateId, name, price) {
        var url = this.serviceUrl + '/' + estateId;
        var data = {
            name: name,
            price: price
        };

        return this.requester.put(this.headers.getHeaders(true), url, data);
    };

    EstateModel.prototype.deleteEstate = function (estateId) {
        var url = this.serviceUrl + '/' + estateId;

        return this.requester.delete(this.headers.getHeaders(true), url);
    };

    return {
        load: function (baseUrl, requester, headers) {
            return new EstateModel(baseUrl, requester, headers);
        }
    };
}());
