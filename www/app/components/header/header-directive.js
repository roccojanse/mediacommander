angular.module('MediaCommander').directive('appHeader', function() {
    return {
        //restrict: 'E',
        transclude: true,
        scope: '=',
        templateUrl: "app/components/header/header.html"
    };
});