'use strict';

/* jasmine specs for controllers go here */
/* Define all the services and controllers module, so they are accessable in your it's
*/
describe('controllers', function(){

  beforeEach(function(){
    module('cotd.controllers');
    module('cotd.services');
    module('ngResource');    

    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });


  it('listDeviceController check for devices in the model', 
    inject(function(_$httpBackend_, $rootScope, $controller, Devices) {
        var scope = $rootScope.$new();
        var mockBackend = _$httpBackend_;

        mockBackend.expectGET('http://localhost:3000/devices').
          respond([{id:0, name: "iphone", assetTag:"a23456", owner:"dev", desc:"iOS4.2"}]);

        var ctrl = $controller('deviceListController', {$scope: scope}, Devices);

        //expect(scope.devices).toBeUndefined();
        
        mockBackend.flush();  

        // check the number of devices
        expect(scope.devices.length).toEqual(1);
        expect(scope.devices).toEqualData([{id:0, name: "iphone", assetTag:"a23456", owner:"dev", desc:"iOS4.2"}]);
  }));

  it('addDeviceController should return correct http response in the model after controller.add', 
    inject(function(_$httpBackend_, $rootScope, $controller, $location, Devices) {
        var scope = $rootScope.$new();
        var mockBackend = _$httpBackend_;

        mockBackend.expectPOST('http://localhost:3000/devices', {name: "iphone", assetTag:"a23456", owner:"dev", desc:"iOS4.2", id:1}).
          respond([{}]);

        var ctrl = $controller('addDeviceController', {$scope: scope}, $location, Devices);
        var item = {name: "iphone", assetTag:"a23456", owner:"dev", desc:"iOS4.2", id:1};

        scope.add(item);
        // make sure the flag is true
        expect(scope.add).toBeTruthy();
        // check actual add effected the devices list
        //expect(Devices.query().length).toEqual(8);
  }));

  it('editDeviceController should successfully edit devices in the model', 
    inject(function(_$httpBackend_, $rootScope, $controller, $location, $routeParams, Devices) {
        var scope = $rootScope.$new();
        var mockBackend = _$httpBackend_;
        var params = {};
        params.id = 0;

        mockBackend.expectGET('http://localhost:3000/devices/0', {"Accept":"application/json, text/plain, */*"}).
          respond({id:0, name: "iphone", assetTag:"a23456", owner:"qa", desc:"iOS4.3"});


        var ctrl = $controller('editDeviceController', {$scope: scope, $routeParams: params},$location, Devices);
        var item = {id:0, name: "iphone-update", assetTag:"a23456", owner:"qa", desc:"iOS4.3"};

        mockBackend.flush();

        // testing for update flag
        expect(scope.add).toBeFalsy();
        expect(scope.device.desc).toEqual("iOS4.3");

        mockBackend.expectPUT('http://localhost:3000/devices/0', 
            {"id":0,"name":"iphone-update","assetTag":"a23456","owner":"qa","desc":"iOS4.3"}).
            respond({});

        scope.update(item);

        mockBackend.flush();
  }));


});
