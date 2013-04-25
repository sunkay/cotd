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
    when('/edit/:id', {
        controller: editDeviceController,
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

function addDeviceController($scope, $location, Devices)
{
    //console.log("add-Field" + $scope.device.name);
    $scope.add=false;

    $scope.add = function(device){
        device['id'] = (Devices.query().length)+1;
        Devices.add(device);
        console.log("In add addDeviceController");
        console.log(device);

        // redirect to main screen
        $location.path('#/');
    }
}

function editDeviceController($scope, $location, $routeParams, Devices)
{
    //console.log("add-Field" + $scope.device.name);
    //$scope.device = null;
    // get the device based on parameter id
    var device = Devices.query()[$routeParams.id];

    $scope.add=false;
    
    $scope.device = angular.copy(device);

    $scope.update = function(device){
        //device['id'] = (Devices.query().length)+1;
        //Devices.add(device);
        console.log("in EditCtrl add");

        // redirect to main screen
        $location.path('#/');
    }
}
