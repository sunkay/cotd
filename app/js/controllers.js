'use strict';

/* Controllers */

angular.module('cotd.controllers', []).
controller('addDeviceController', ['$scope', '$location', 'Devices', 
    function($scope, $location, Devices) {
    //console.log("add-Field" + $scope.device.name);
    $scope.add=true;

    $scope.add = function(device){
        if(!device) return;
        device['id'] = (Devices.query().length);
        Devices.add(device);

        // redirect to main screen
        $location.path('#/');
    }
}])
.controller('deviceListController', 
    ['$scope', 'Devices', function($scope, Devices) {
        $scope.devices = Devices.query();

        $scope.remove = function(index){
            $scope.devices.splice(index, 1);
        }
    }])  
.controller('editDeviceController', 
    ['$scope', '$location', '$routeParams', 'Devices',function($scope, $location, $routeParams, Devices) {
    // get the device based on parameter id
    var device = Devices.query()[$routeParams.id];

    // set the add/edit flag
    $scope.add=false;
    
    // deep copies the selected item into scope
    $scope.device = angular.copy(device);

    $scope.update = function(device){
        if(!device) return;
        console.log("in EditCtrl add");

        Devices.update(device);

        // redirect to main screen
        $location.path('#/');
    }
}])  
.controller('MyCtrl2', [function() {

}]);
