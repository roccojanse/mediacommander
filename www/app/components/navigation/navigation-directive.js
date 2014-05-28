angular.module('MediaCommander').directive('appNavigation', function() {
    return {
        //restrict: 'E',
        transclude: true,
        scope: '=',
        templateUrl: "app/components/navigation/navigation.html"
    };
});