angular.module('MediaCommander').controller('Navigation.Controller', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {

    // checks current active route
    $scope.isActive = function(item) {
        if (item.path === $location.path()) {
            return true;
        }
        return false;
    };

    $scope.items = [
      { path: '/', title: 'home', class: 'logo' },
      { path: '/movies', title: 'movies', class: 'movies' },
      { path: '/series', title: 'series', class: 'series' },
      { path: '/pictures', title: 'pictures', class: 'pictures' },
      { path: '/music', title: 'music', class: 'music' }
    ];

}]);