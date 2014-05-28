angular.module("MediaController").controller("App.Controller", [ "$rootScope", "$scope", function($rootScope, $scope) {
    console.log("App Controller");
} ]);

angular.module("Home").controller("Home.Controller", [ "$scope", function($scope) {
    console.log("Home!");
} ]);

angular.module("Music").controller("Music.Controller", [ "$scope", function($scope) {
    console.log("Music!");
} ]);

angular.module("SpotifyPlaylist").controller("SpotifyPlaylist.Controller", [ "$scope", function($scope) {
    console.log("SpotifyPlaylist!");
} ]);

angular.module("Spotify").controller("Spotify.Controller", [ "$scope", "$rootScope", "$location", function($scope, $rootScope, $location) {
    socket.emit("checkLogin");
    $scope.openPlaylist = function(pl) {
        $location.path("/music/playlist/" + pl.uri);
    };
    $rootScope.$watch("user.playlists", function(newVal, oldVal) {
        if (typeof newVal !== "undefined" && newVal.length > 0) {
            $scope.loaded = 0;
            var total = newVal.length;
            $.each(newVal, function(i, val) {
                socket.emit("getPlaylist", val, function(res) {
                    var obj = res;
                    obj.uri = val.uri;
                    $scope.user.playlists[i] = obj;
                    $scope.loaded++;
                    $scope.$apply();
                });
            });
        }
    });
    console.log("Spotify!");
} ]);
//# sourceMappingURL=controllers.map