'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('cotd.services', [])
  .config(['$httpProvider', function($httpProvider){
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
  }])
  .value('version', '0.1')
  .factory('Devices-rest', ['$resource', function($resource){
    return $resource('http://localhost\\:3000/devices/:deviceId',
        {},
        {update: {method:'PUT'}, isArray:false}
        );
  }]);