
// Declare app level module which depends on filters, and services
angular.module('MediaCommander', [
  'ngRoute',
  'ngTouch',
  'Animations',
  'Dashboard',
  'Movies',
  'Series',
  'Pictures',
  'Music'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', { templateUrl: '/app/dashboard/dashboard.html', controller: 'Dashboard.Controller' });
  $routeProvider.when('/movies', { templateUrl: '/app/movies/movies.html', controller: 'Movies.Controller' });
  $routeProvider.when('/series', { templateUrl: '/app/series/series.html', controller: 'Series.Controller' });
  $routeProvider.when('/pictures', { templateUrl: '/app/pictures/pictures.html', controller: 'Pictures.Controller' });
  $routeProvider.when('/music', { templateUrl: '/app/music/music.html', controller: 'Music.Controller' });
  $routeProvider.when('/music/spotify', { templateUrl: '/app/music/spotify/spotify.html', controller: 'Spotify.Controller' });
  $routeProvider.when('/music/spotify/playlist', { templateUrl: '/app/music/spotify/playlist/playlist.html', controller: 'SpotifyPlaylist.Controller' });
  $routeProvider.when('/music/spotify/playlist/:spotifyUri', { templateUrl: '/app/music/spotify/playlist/playlist.html', controller: 'SpotifyPlaylist.Controller' });
  $routeProvider.otherwise({ redirectTo: '/' });
}]);
