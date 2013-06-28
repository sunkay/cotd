'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(function(){
    module('cotd.services');
    module('ngResource');
  });

  describe('version', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });

  describe('Devices', function() {
    it('should exist', inject(function(Devices){
        expect(Devices).not.toBe(null);
    }));

    it('should contain devices', inject(function(_$httpBackend_, Devices) {
      var mockBackend = _$httpBackend_;

      mockBackend.expectGET("http://localhost:3000/devices").
        respond([{id:0, name: "iphone", assetTag:"a23456", owner:"dev", desc:"iOS4.2"}]);

      var devices = Devices.query();
      
      mockBackend.flush();  

      expect(devices.length).toEqual(1);
    }));

    it('should send a POST request', inject(function(_$httpBackend_, Devices) {
      var item = {id:7, name: "iphone", assetTag:"a23456", owner:"dev", desc:"iOS4.2"};
      var mockBackend = _$httpBackend_;

      var newDevice = new Devices(item);

      mockBackend.expectPOST("http://localhost:3000/devices", 
        {id:7, name: "iphone", assetTag:"a23456", owner:"dev", desc:"iOS4.2"}).respond({});

      newDevice.$save();
      
      mockBackend.flush();  

    }));

    it('should send a PUT request', inject(function(_$httpBackend_, Devices) {
        var mockBackend = _$httpBackend_;

        mockBackend.expectPUT('http://localhost:3000/devices/0', 
            {"id":0,"name":"iphone-update","assetTag":"a23456","owner":"dev","desc":"iOS4.3"}).
            respond({});

        // modified device name test
        var item = {id:0, name: "iphone-update", assetTag:"a23456", owner:"dev", desc:"iOS4.3"};
        Devices.update({deviceId:0},item);

        mockBackend.flush();
        
    }));

  });  

});
