'use strict';

/* jasmine specs for controllers go here */
/* Define all the services and controllers module, so they are accessable in your it's
*/
describe('controllers', function(){
  beforeEach(function(){
    module('cotd.controllers');
    module('cotd.services');
  });


  it('listDeviceController should have 6 devices in the model', 
    inject(function($rootScope, $controller, Devices) {
        var scope = $rootScope.$new();
        var ctrl = $controller('deviceListController', {$scope: scope}, Devices);
        // check the number of devices
        expect(scope.devices.length).toEqual(7);
  }));

  it('addDeviceController should have 8 devices in the model after add', 
    inject(function($rootScope, $controller, $location, Devices) {
        var scope = $rootScope.$new();
        var ctrl = $controller('addDeviceController', {$scope: scope}, $location, Devices);
        var item = {id:7, name: "iphone", assetTag:"a23456", owner:"dev", desc:"iOS4.2"};

        scope.add(item);
        // make sure the flag is true
        expect(scope.add).toBeTruthy();
        // check actual add effected the devices list
        expect(Devices.query().length).toEqual(8);
  }));

  it('editDeviceController should successfully edit devices in the model', 
    inject(function($rootScope, $controller, $location, $routeParams, Devices) {
        var scope = $rootScope.$new();
        var ctrl = $controller('editDeviceController', {$scope: scope}, $routeParams, $location, Devices);
        var item = {id:0, name: "iphone", assetTag:"a23456", owner:"qa", desc:"iOS4.3"};
        // testing for update flag
        expect(scope.add).toBeFalsy();
        // confirm original lenght
        expect(Devices.query().length).toEqual(7);
        // confirm description
        expect(Devices.query()[0].desc).toEqual('iOS4.2');
        // update
        scope.update(item);
        // validate update
        expect(Devices.query()[0].desc).toEqual('iOS4.3');
        expect(Devices.query()[0].owner).toEqual('qa');
  }));


});
