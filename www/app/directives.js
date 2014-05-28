angular.module("MediaCommander").directive("appFooter", function() {
    return {
        //restrict: 'E',
        transclude: true,
        scope: "=",
        templateUrl: "app/components/footer/footer.html"
    };
});

angular.module("MediaCommander").directive("appHeader", function() {
    return {
        //restrict: 'E',
        transclude: true,
        scope: "=",
        templateUrl: "app/components/header/header.html"
    };
});

angular.module("MediaCommander").directive("appNavigation", function() {
    return {
        //restrict: 'E',
        transclude: true,
        scope: "=",
        templateUrl: "app/components/navigation/navigation.html"
    };
});
//# sourceMappingURL=directives.map