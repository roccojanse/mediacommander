angular.module('MediaCommander').controller('Footer.Controller', ['$rootScope', '$scope', function($rootScope, $scope) {
    
    console.log('footer controller');

    $scope.connectedMsg = 'awaiting connection...';

    $rootScope.$watch('server.connected', function(ov, nv) {
        if (ov !== nv) {
            $scope.connectedMsg = 'server connected';
        }
    });

}]);