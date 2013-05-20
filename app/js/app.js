'use strict';


// Declare app level module which depends on filters, and services
angular.module('cotd', ['cotd.filters', 'cotd.services', 
                        'cotd.directives', 'cotd.controllers', 'ngResource']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/listDevices.html', controller: 'deviceListController'});
    $routeProvider.when('/add', {templateUrl: 'partials/addDevice.html', controller: 'addDeviceController'});
    $routeProvider.when('/edit/:id', {templateUrl: 'partials/addDevice.html', controller: 'editDeviceController'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
