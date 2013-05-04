'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });


  it('should automatically redirect to / when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/");
  });


  describe('DisplayList', function() {

    beforeEach(function() {
      browser().navigateTo('#/');
    });


    it('should render DisplayDevices when user navigates to /#', function() {
      expect(element('[ng-view] a').text()).
        toMatch(/Would you like to add a new device/);
      
      expect(element('[ng-view] th').text()).
        toMatch(/Name/);

      // counting number of rows
      expect(repeater('tbody tr').count()).toBe(7);

      // matching the resulting elements in a column
      expect(repeater('tbody tr').column("item.owner"))
        .toEqual(["dev","dev","qa","dev","dev","qa","dev"]);
    });

    // clicking one item in the table using :eq(0)
    it("clicking remove link should remove device", function(){
      element('tbody tr:eq(0) .icon-trash').click();
      expect(repeater('tbody tr').count()).toBe(6);
    });

    // clicking a link should take you to add device URL, selection by id
    it("clicking add Device link should take you to right screen", function(){
      element('#addlink').click();
      expect(browser().location().url()).toBe('/add');
    });    

  });


  describe('addDeviceView', function() {

    beforeEach(function() {
      browser().navigateTo('#/add');
    });


    it('should render addDevice when user navigates to /add', function() {
      expect(element('[ng-view] .control-label').text()).
        toMatch("NameAsset TagOwnerDescription");
    });

    // test for Add & subsequent expectation that the devices list has the added value
    it('should add a Device when user enters values and submits them', function() {
      input('device.name').enter('TestName');
      input('device.assetTag').enter('TestAssetTag');
      input('device.owner').enter('TestOwner');
      input('device.desc').enter('TestDescription');
      element('#addDevice').click();

      // counting number of rows
      expect(repeater('tbody tr').count()).toBe(8);

      // matching the resulting elements in a column
      expect(repeater('tbody tr').column("item.owner"))
        .toEqual(["dev","dev","qa","dev","dev","qa","dev", "TestOwner"]);
    });    

  });

  describe('updateDeviceView', function() {

    beforeEach(function() {
      browser().navigateTo('#/edit/0');
    });

    // test for update & subsequent expectation that the devices list has the updated value
    it('should update a Device when user enters values and submits them', function() {
      input('device.name').enter('TestName');
      input('device.assetTag').enter('TestAssetTag');
      input('device.owner').enter('TestOwner');
      input('device.desc').enter('TestDescription');
      element('#updateDevice').click();

      // counting number of rows
      expect(repeater('tbody tr').count()).toBe(7);

      // matching the resulting elements in a column
      expect(repeater('tbody tr').column("item.owner"))
        .toEqual(["TestOwner","dev","qa","dev","dev","qa","dev"]);
    }); 

  });


});
