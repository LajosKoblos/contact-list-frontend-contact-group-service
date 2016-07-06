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

        // describe('createGroup method', function() {
        //
        //     it('should return with a group object', function() {
        //
        //         var promise = factory.createGroup('name', 'displayName');
        //
        //         promise.then(function(data){
        //             console.log(data);
        //             expect(data.name).toBe('name');
        //             expect(data.displayName).toBe('displayName');
        //         });
        //
        //         self.$rootScope.$apply();
        //
        //     });
        //
        // });

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
                                     .respond(groupList);

                var promise = groupService.listGroups();

                $rootScope.$apply();

                promise.then(function(data){
                    console.log(data.data);
                    expect(data.data).toEqual(groupList)
                });

                $httpBackend.flush();

            });

        });

    });

});