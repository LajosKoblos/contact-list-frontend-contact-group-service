angular.module("contactGroupServiceModule", ["authServiceModule"])

.factory("contactGroupService", function ($httpWithProtection, $q) {

	var fac = {};

	fac.listGroups = function() {

		var deferred = $q.defer();

		var httpPromise = $httpWithProtection({url: "http://localhost:8080/groups", method: "GET"});

		httpPromise.then(function(data){
			deferred.resolve(data);
		}, function(error){
			deferred.reject(error);
		});
		
		return deferred.promise;
	};

	fac.createGroup = function(name, displayName) {
		var group = { 
			"name":name, 
			"displayName":displayName 
		};
		
		var deferred = $q.defer();
		deferred.resolve(group);
		
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

    return fac;

});
