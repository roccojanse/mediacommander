angular.module("MediaCommander").controller("App.Controller", [ "$rootScope", "$scope", "$location", function($rootScope, $scope, $location) {
    // page config vars
    $rootScope.page = {
        title: "MediaCommander",
        description: "Home Media Management",
        version: "0.5.4"
    };
    $rootScope.currentPage = "";
    $rootScope.server = {
        id: "",
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
    $rootScope.socket.on("connected", function(data) {
        $rootScope.server.id = data.id;
        $rootScope.server.connected = true;
        $rootScope.$digest();
    });
    console.log("App Controller");
} ]);

angular.module("MediaCommander").controller("Footer.Controller", [ "$rootScope", "$scope", function($rootScope, $scope) {
    console.log("footer controller");
    $scope.connectedMsg = "awaiting connection...";
    $rootScope.$watch("server.connected", function(ov, nv) {
        if (ov !== nv) {
            $scope.connectedMsg = "server connected";
        }
    });
} ]);

angular.module("MediaCommander").controller("Header.Controller", [ "$rootScope", "$scope", function($rootScope, $scope) {
    console.log("header controller");
} ]);

angular.module("MediaCommander").controller("Navigation.Controller", [ "$rootScope", "$scope", "$location", function($rootScope, $scope, $location) {
    // checks current active route
    $scope.isActive = function(item) {
        if (item.path === $location.path()) {
            return true;
        }
        return false;
    };
    $scope.items = [ {
        path: "/",
        title: "home",
        "class": "logo"
    }, {
        path: "/movies",
        title: "movies",
        "class": "movies"
    }, {
        path: "/series",
        title: "series",
        "class": "series"
    }, {
        path: "/pictures",
        title: "pictures",
        "class": "pictures"
    }, {
        path: "/music",
        title: "music",
        "class": "music"
    } ];
} ]);

angular.module("Dashboard").controller("Dashboard.Controller", [ "$scope", "$rootScope", function($scope, $rootScope) {
    $rootScope.currentPage = "Dashboard";
} ]);

angular.module("Movies").controller("Movies.Controller", [ "$scope", "$rootScope", function($scope, $rootScope) {
    $rootScope.currentPage = "Movies";
    console.log("Movies!");
} ]);

angular.module("Music").controller("Music.Controller", [ "$scope", "$rootScope", function($scope, $rootScope) {
    $rootScope.currentPage = "Music";
    console.log("Music!");
} ]);

angular.module("SpotifyPlaylist").controller("SpotifyPlaylist.Controller", [ "$scope", "$rootScope", function($scope, $rootScope) {
    $rootScope.currentPage = "Spotify Playlist";
    console.log("SpotifyPlaylist!");
} ]);

angular.module("Spotify").controller("Spotify.Controller", [ "$scope", "$rootScope", function($scope, $rootScope) {
    $rootScope.currentPage = "Spotify";
    console.log("Spotify!");
} ]);

angular.module("Pictures").controller("Pictures.Controller", [ "$scope", "$rootScope", function($scope, $rootScope) {
    $rootScope.currentPage = "Pictures";
    console.log("Pictures!");
} ]);

angular.module("Series").controller("Series.Controller", [ "$scope", "$rootScope", function($scope, $rootScope) {
    $rootScope.currentPage = "Series";
    console.log("Series!");
} ]);
//# sourceMappingURL=controllers.map