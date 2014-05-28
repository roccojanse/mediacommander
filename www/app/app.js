
// Declare app level module which depends on filters, and services
angular.module('MediaController', [
  'ngRoute',
  'Animations',
  'Home',
  'Music'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', { templateUrl: '/app/home/home.html', controller: 'Home.Controller' });
  $routeProvider.when('/music', { templateUrl: '/app/music/music.html', controller: 'Music.Controller' });
  $routeProvider.when('/music/spotify', { templateUrl: '/app/music/spotify/spotify.html', controller: 'Spotify.Controller' });
  $routeProvider.when('/music/spotify/playlist', { templateUrl: '/app/music/spotify/playlist/playlist.html', controller: 'SpotifyPlaylist.Controller' });
  $routeProvider.when('/music/spotify/playlist/:spotifyUri', { templateUrl: '/app/music/spotify/playlist/playlist.html', controller: 'SpotifyPlaylist.Controller' });
  $routeProvider.otherwise({ redirectTo: '/' });
}]);
