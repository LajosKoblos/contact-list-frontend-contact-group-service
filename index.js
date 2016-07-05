angular.module("contactGroupServiceModule", ["authServiceModule"])

.factory("contactGroupService", function (authService, $q) {

	var fac = {};
	
	fac.write2Console = function() {
		console.log("contactGroupService is up");
	};

	fac.listGroups = function() {
		var groupsList = [
			{
				"name":"name1",
				"displayName":"displayName1"
			}, {
				"name":"name2",
				"displayName":"displayName2"
			}, {
				"name":"name3",
				"displayName":"displayName3"
			}];
		var deferred = $q.defer();
		deferred.resolve(groupsList);
		
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

	fac.renameGroup = function(oldName, newName, displayName) {
		var group = { 
			"name":newName, 
			"displayName":displayName 
		};
		
		var deferred = $q.defer();
		deferred.resolve(group);
		
		return deferred.promise;
	};

    return fac;

});
