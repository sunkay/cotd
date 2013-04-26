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
    $scope.add=true;

    $scope.add = function(device){
        if(!device) return;
        device['id'] = (Devices.query().length);
        Devices.add(device);

        // redirect to main screen
        $location.path('#/');
    }
}

function editDeviceController($scope, $location, $routeParams, Devices)
{
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
}
