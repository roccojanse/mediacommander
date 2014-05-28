angular.module('MediaCommander').directive('appFooter', function() {
    return {
        //restrict: 'E',
        transclude: true,
        scope: '=',
        templateUrl: "app/components/footer/footer.html"
    };
});