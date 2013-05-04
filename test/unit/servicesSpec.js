'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(module('cotd.services'));


  describe('version', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });

  describe('Devices', function() {
    it('should exist', inject(function(Devices){
        expect(Devices).not.toBe(null);
    }));

    it('should contain devices', inject(function(Devices) {
      expect(Devices.query().length).toEqual(7);
    }));

    it('should add a device correctly', inject(function(Devices) {
        var item = {id:7, name: "iphone", assetTag:"a23456", owner:"dev", desc:"iOS4.2"};
        Devices.add(item)
      expect(Devices.query().length).toEqual(8);
    }));

    it('should update a device correctly', inject(function(Devices) {
        // modified device name test
        var item = {id:0, name: "iphone-test", assetTag:"a23456", owner:"dev", desc:"iOS4.2"};
        Devices.update(item)
        expect(Devices.query().length).toEqual(7);
        //get first item
        expect(Devices.query()[0].name).toEqual("iphone-test");
    }));

  });  

});
