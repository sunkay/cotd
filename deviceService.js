// create a module to support getting and managing the device list
var deviceModule = angular.module('DeviceModule', []);

// setup the service factory to create our items. Should retrieve from the server side db
deviceModule.factory('Devices', function(){
    var items = {};

    items.data = [
        {id:0, name: "iphone", assetTag:"a23456", owner:"dev", desc:"iOS4.2"},
        {id:1, name: "loaner-laptop-1", assetTag:"a13936", owner:"dev", desc:""},
        {id:2, name: "loaner-laptop-3", assetTag:"a43056", owner:"qa", desc:""},
        {id:3, name: "android", assetTag:"a33756", owner:"dev", desc:"android2.4"},
        {id:4, name: "galaxy tab", assetTag:"a53356", owner:"dev", desc:"android"},
        {id:5, name: "loaner-laptop-2", assetTag:"a63556", owner:"qa", desc:""},
        {id:6, name: "iphone", assetTag:"a73856", owner:"dev", desc:"iOS5"}
        ];

    items.query = function(){
        return items.data;
    }

    items.add = function(device){
        items.data.push(device);
    }

    return items;
});
