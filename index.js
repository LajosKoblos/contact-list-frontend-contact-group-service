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
            deferred.resolve(result);
		}, function(error){
            deferred.reject(createServerErrorObject(error));
		});

		return deferred.promise;
	};

	fac.createGroup = function(groupObject) {

        var deferred = $q.defer();

        if(typeof groupObject.name === 'undefined' || typeof groupObject.displayName === 'undefined' ||
            groupObject.name == "" || groupObject.displayName == "") {
            
            var fieldsObject = {};
            
            if(typeof groupObject.name === 'undefined' || groupObject.name == "") {
                fieldsObject.name = ["name is required"];
            }

            if (typeof groupObject.displayName === 'undefined' || groupObject.displayName == "") {
                fieldsObject.displayName = ["displayName is required"];
            }
            
            var errorObject = {
                "message":"Argument Error",
                "fields": fieldsObject
            };
            
            deferred.reject(errorObject);
            return deferred.promise;
        }

        var httpPromise = $httpWithProtection({url: "http://localhost:8080/groups", method: "POST", data: groupObject});

        httpPromise.then(function(data) {
            console.log('resolve');
            deferred.resolve(data);
        }, function(error){
            console.log('reject');
            deferred.reject(error);
        });

        return deferred.promise;
	};

	fac.renameGroup = function(name, newDisplayName) {
		var group = { 
			"name":name, 
			"displayName":newDisplayName 
		};
		
		var deferred = $q.defer();
		deferred.resolve(group);
		
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

    return fac;

});
