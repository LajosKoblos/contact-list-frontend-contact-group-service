'use strict';

describe('contactGroupService factory', function(){

    var $httpBackend;
    var listGroupsHandler;
    var $rootScope;
    var groupService;

    beforeEach(function() {

        module("contactGroupServiceModule", function($provide, $httpProvider){
            $provide.provider("$httpWithProtectionProvider", $httpProvider);
        });

        inject(function (_$rootScope_,_$httpBackend_, contactGroupService) {
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            groupService = contactGroupService;
        });

    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('contactGroupService', function() {

        describe('createGroup method', function() {

            it('should return with 201 Created', function() {

                var group = {
                    "id": {
                        "userName":"Admin",
                        "contactGroupName":"name1"
                    },
                    "displayName":"displayName1"
                };

                $httpBackend.expectPOST('http://localhost:8080/groups');

                listGroupsHandler = $httpBackend.when('POST', 'http://localhost:8080/groups')
                                    .respond(201,"");

                var promise = groupService.createGroup(group);

                promise.then(function(data){
                    console.log('createGroup: ', data.data);
                    expect(data.status).toEqual(201);
                    expect(data.data).toEqual("");
                });

                $rootScope.$apply();

                $httpBackend.flush();

            });
            
            it('should return with an error if name is undefined', function() {

                var group = {
                    "id": {
                        "userName":"Admin",
                        "contactGroupName":""
                    },
                    "displayName":"displayName1"
                };

                var errorObject = {
                    "message":"Argument Error",
                    "fields": {
                        "name":["This field is required"]
                    }
                };

                var promise = groupService.createGroup(group);

                promise.then(function (data) {
                    expect(false).toBe(true);
                });

                promise.catch(function (reason) {
                    console.log('createGroup: ', reason);
                    expect(reason).toEqual(errorObject);
                });

                $rootScope.$apply();

            });

            it('should return with an error if displayName is undefined', function() {

                var errorObject = {
                    "message":"Argument Error",
                    "fields": {
                        "displayName":["This field is required"]
                    }
                };

                var group = {
                    "id": {
                        "userName":"Admin",
                        "contactGroupName":"name1"
                    },
                    "displayName":""
                };

                var promise = groupService.createGroup(group);

                promise.then(function (data) {
                    expect(false).toBe(true);
                });

                promise.catch(function (reason) {
                    console.log('createGroup: ', reason);
                    expect(reason).toEqual(errorObject);
                });

                $rootScope.$apply();

            });

            it('should return with an error if displayName and name is undefined', function() {

                var errorObject = {
                    "message":"Argument Error",
                    "fields": {
                        "displayName":["This field is required"],
                        "name":["This field is required"]
                    }
                };

                var group = {
                    "id": {
                        "userName":"Admin",
                        "contactGroupName":""
                    },
                    "displayName":""
                };

                var promise = groupService.createGroup(group);

                promise.then(function (data) {
                    expect(false).toBe(true);
                });

                promise.catch(function (reason) {
                    console.log('createGroup: ', reason);
                    expect(reason).toEqual(errorObject);
                });

                $rootScope.$apply();

            });

        });

        describe('listGroups method', function() {

            it('should return with an array of groups', function() {

                var groupList = [{
                    "name":"name1",
                    "displayName":"displayName1"
                }, {
                    "name":"name2",
                    "displayName":"displayName2"
                }];

                $httpBackend.expectGET('http://localhost:8080/groups');

                listGroupsHandler = $httpBackend.when('GET', 'http://localhost:8080/groups')
                                     .respond(200, groupList);

                var promise = groupService.listGroups();
                
                promise.then(function(data){
                    console.log('listGroups', data.data);
                    expect(data.status).toEqual(200);
                    expect(data.data).toEqual(groupList);
                });

                $rootScope.$apply();

                $httpBackend.flush();

            });

            it('should return with an error object 400 if token is expired', function() {

                var errorObject = {
                    "message":"TOKEN EXPIRED",
                    "statusCode":400,
                    "fields":{},
                    "httpResponse":{}
                };

                var serverErrorObject = {
                    "code":400,
                    "message":"TOKEN EXPIRED"
                };

                $httpBackend.expectGET('http://localhost:8080/groups');

                listGroupsHandler = $httpBackend.when('GET', 'http://localhost:8080/groups')
                                    .respond(400, serverErrorObject);

                var promise = groupService.listGroups();

                promise.then(function (data) {
                    expect(false).toBe(true);
                });

                promise.catch(function (reason) {
                    console.log(reason);
                    expect(reason.message).toEqual(errorObject.message);
                    expect(reason.status).toEqual(errorObject.statusCode);
                });

                $rootScope.$apply();

                $httpBackend.flush();

            });

        });
        
        describe('modifyGroup method', function() {
           
            it('should return with 200 OK', function() {

                var group = {
                    "id": {
                        "userName":"Admin",
                        "contactGroupName":"name1"
                    },
                    "displayName":"displayName1"
                };

                $httpBackend.expectPUT('http://localhost:8080/groups/name1');

                listGroupsHandler = $httpBackend.when('PUT', 'http://localhost:8080/groups/name1')
                    .respond(200,"");

                var promise = groupService.renameGroup(group);

                promise.then(function(result){
                    console.log('renameGroup: ', result.data);
                    expect(result.status).toEqual(200);
                    expect(result.data).toEqual("");
                });

                promise.catch(function (reason) {
                    console.log('renameGroup: ', reason);
                    expect(true).toEqual(false);
                });

                $rootScope.$apply();

                $httpBackend.flush();
                
            });

            it('should return with an error if name is undefined', function() {

                var group = {
                    "id": {
                        "userName":"Admin",
                        "contactGroupName":""
                    },
                    "displayName":"displayName1"
                };

                var errorObject = {
                    "message":"Argument Error",
                    "fields": {
                        "name":["This field is required"]
                    }
                };

                var promise = groupService.renameGroup(group);

                promise.then(function (data) {
                    expect(false).toBe(true);
                });

                promise.catch(function (reason) {
                    console.log('createGroup: ', reason);
                    expect(reason).toEqual(errorObject);
                });

                $rootScope.$apply();

            });

            it('should return with an error if displayName is undefined', function() {

                var group = {
                    "id": {
                        "userName":"Admin",
                        "contactGroupName":"name1"
                    },
                    "displayName":""
                };

                var errorObject = {
                    "message":"Argument Error",
                    "fields": {
                        "displayName":["This field is required"]
                    }
                };

                var promise = groupService.renameGroup(group);

                promise.then(function (data) {
                    expect(false).toBe(true);
                });

                promise.catch(function (reason) {
                    console.log('createGroup: ', reason);
                    expect(reason).toEqual(errorObject);
                });

                $rootScope.$apply();

            });

            it('should return with an error if name is undefined', function() {

                var group = {
                    "id": {
                        "userName":"Admin",
                        "contactGroupName":""
                    },
                    "displayName":""
                };

                var errorObject = {
                    "message":"Argument Error",
                    "fields": {
                        "name":["This field is required"],
                        "displayName":["This field is required"]
                    }
                };

                var promise = groupService.renameGroup(group);

                promise.then(function (data) {
                    expect(false).toBe(true);
                });

                promise.catch(function (reason) {
                    console.log('createGroup: ', reason);
                    expect(reason).toEqual(errorObject);
                });

                $rootScope.$apply();

            });
            
        });

    });

});