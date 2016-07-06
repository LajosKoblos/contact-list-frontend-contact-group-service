'use strict';

describe('contactGroupService factory', function(){

    var factory;
    var self = this;

    beforeEach(function() {
        module('contactGroupServiceModule');

        inject(function ($injector, $rootScope) {
            self.$rootScope = $rootScope;
            factory = $injector.get('contactGroupService');
        });
    });

    describe('contactGroupService', function() {

        describe('createGroup method', function() {

            it('should return with a group object', function() {

                var promise = factory.createGroup('name', 'displayName');

                promise.then(function(data){
                    console.log(data);
                    expect(data.name).toBe('name');
                    expect(data.displayName).toBe('displayName');
                });

                self.$rootScope.$apply();

            });

        });

    });

});