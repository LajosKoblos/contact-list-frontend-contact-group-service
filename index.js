angular.module("contactGroupServiceModule", ["authServiceModule"])

.factory("contactGroupService", function ($httpWithProtection, $q) {

	var fac = {};

	fac.listGroups = function() {

		var deferred = $q.defer();

        var config = {
            url: "http://localhost:8080/groups",
            method: "GET"
        };

		var httpPromise = $httpWithProtection(config);

		httpPromise.then(function(result) {
            deferred.resolve(result.data);
		}, function(error){
            deferred.reject(createServerErrorObject(error));
		});

		return deferred.promise;
	};

	fac.createGroup = function(groupObject) {

        var deferred = $q.defer();

        var errorObject;

        if(errorObject = checkGroupObjectForUndefinedFields(groupObject)) {
            deferred.reject(errorObject);
            return deferred.promise;
        }

        var config = {
            url: "http://localhost:8080/groups",
            method: "POST",
            data: groupObject
        };

        var httpPromise = $httpWithProtection(config);

        httpPromise.then(function(result) {
            deferred.resolve(result);
        }, function(error){
            deferred.reject(createServerErrorObject(error));
        });

        return deferred.promise;
	};

	fac.renameGroup = function(groupObject) {

        var deferred = $q.defer();

        var errorObject;

        if(errorObject = checkGroupObjectForUndefinedFields(groupObject)) {
            deferred.reject(errorObject);
            return deferred.promise;
        }

        var config = {
            url: "http://localhost:8080/groups/"+groupObject.id.contactGroupName,
            method: "PUT",
            data: groupObject
        };

        var httpPromise = $httpWithProtection(config);

        httpPromise.then(function(result) {
            deferred.resolve(result);
        }, function(error){
            deferred.reject(createServerErrorObject(error));
        });
		
		return deferred.promise;
	};

    function createServerErrorObject(error) {
        return {
            message: error.data.message,
            status: error.status,
            httpResponse: error.config
        };
    }

    function createArgumentErrorObject(arguments) {
        var fieldsObject = {};
        for (var argument of arguments) {
            fieldsObject[argument] = [argument + " is required"];
        }

        return {
            message: "Argument Error",
            fields: fieldsObject
        };
    }

    function checkGroupObjectForUndefinedFields(groupObject) {

        if(typeof groupObject.id.contactGroupName === 'undefined' || typeof groupObject.displayName === 'undefined' || groupObject.id.contactGroupName == "" || groupObject.displayName == "") {

            var fieldsObject = {};

            if(typeof groupObject.id.contactGroupName === 'undefined' || groupObject.id.contactGroupName == "") {
                fieldsObject.name = ["This field is required"];
            }

            if (typeof groupObject.displayName === 'undefined' || groupObject.displayName == "") {
                fieldsObject.displayName = ["This field is required"];
            }

            var errorObject = {
                "message":"Argument Error",
                "fields": fieldsObject
            };

            return errorObject;
        }

    }

    return fac;

});
