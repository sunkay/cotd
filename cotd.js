// Global app module listing all its dependencies
var cotdServices = angular.module('cotd', ['DeviceModule']);

// setup mappings routes and templates
function cotdRouteConfig($routeProvider){
    $routeProvider.
    when('/', {
        controller: deviceListController, 
        templateUrl: 'listDevices.html'
    }).
    when('/add', {
        controller: addDeviceController,
        templateUrl: 'addDevice.html'
    }).
    otherwise({
        redirectTo: '/'
    });
}

cotdServices.config(cotdRouteConfig);

// controllers
function deviceListController($scope, Devices)
{
    $scope.devices = Devices.query();

    $scope.remove = function(index){
        $scope.devices.splice(index, 1);
    }
}

function addDeviceController($scope)
{
    //console.log("add-Field" + $scope.device.name);

    $scope.add = function(device){
        console.log(device);
    }
}
