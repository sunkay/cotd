'use strict';

/* Controllers */

angular.module('cotd.controllers', [])
.controller('deviceListController', 
    ['$scope', 'Devices', function($scope, Devices) {
        $scope.devices = Devices.query(function success(){
            console.log("deviceListController.query success");
        }, function error(response){
            console.log("DeviceListController.query: Request Failed " + response.status);
            // access response headers
            console.log(response.headers());
        });

        // Delete handler
        $scope.remove = function(index){
            var devId = $scope.devices[index].id;
            console.log("deviceId to remove: " + devId);
            Devices.delete({deviceId: devId}, function success(data, status){
                console.log("Remove device succeeded");
                $scope.devices.splice(index, 1);
            }, function error(response){
                console.log("Remove Device Failed Status: " + response.status);
            });
        }
    }]) 
.controller('addDeviceController', ['$scope', '$location', 'Devices', 
    function($scope, $location, Devices) {
    $scope.add=true;

    $scope.add = function(device){
        if(!device) return;

        var randomnumber=Math.floor(Math.random()*1001)
        device['id'] = randomnumber;

        var newDevice = new Devices(device);
        newDevice.$save(function success(){
            // redirect to main screen
            $location.path('#/');
        }, function error(response){
            console.log("Add Device Failed: " + response.status);
        });
    }
}])
.controller('editDeviceController', 
    ['$scope', '$location', '$routeParams', 'Devices',
    function($scope, $location, $routeParams, Devices) {

    console.log("Info: editDeviceController: ID:", $routeParams.id);
    // get the device based on parameter id
    var device = Devices.get({deviceId:$routeParams.id},angular.noop, 
        function error(){
            console.log("Error: editDeviceController: GET Id:", $routeParams.id);
        });

    console.log("Info: editDeviceController: device: ", device);

    // set the add/edit flag
    $scope.add=false;
    
    $scope.device = device; 

    $scope.update = function(device){
        if(!device) return;
        Devices.update({deviceId:device.id}, device, function success(){
            console.log("Info: editDeviceController: saved device", device);
            // redirect to main screen
            $location.path('#/');
        }, function error(){
            console.log("Error: editDeviceController: unable to update");
        });
    }
}])  
;
