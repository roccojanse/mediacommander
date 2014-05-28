angular.module('MediaCommander').controller('App.Controller', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {

    // page config vars
    $rootScope.page = {
        title: 'MediaCommander',
        description: 'Home Media Management',
        version: '0.7.2'
    };

    $rootScope.currentPage = '';

    $rootScope.server = {
        id: '',
        connected: false
    };

    // 'global' functions
    $rootScope.navigateTo = function(url) {
        console.log(url);
        $location.url(url);
    };

    // init socket
    $rootScope.socket = io.connect(window.location.href);

    // client connected to node server
    $rootScope.socket.on('connected', function(data) {
        $rootScope.server.id = data.id;
        $rootScope.server.connected = true;
        $rootScope.$digest();
    });

    console.log('App Controller');
        
}]);