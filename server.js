// config
var config = {
        port: 1717
    };

// init
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    spotify_web = require('spotify-web'),
    user;

server.listen(config.port);
console.log('SERVER STARTED:' + config.port);

// set root dir to public 
app.use(express.static(__dirname + '/www/'));

// express static router
app.get('/', express.static(__dirname + '/www/'));

// socket events
io.sockets.on('connection', function(socket) {
    
    // send connected message to client
    socket.emit('connected', { id: socket.id });

    // check login
    socket.on('checkLogin', function() {
        console.log('CHECKLOGIN:');
        if (typeof user !== 'undefined' && typeof user.username !== 'undefined' && typeof user.password !== 'undefined') {
            console.log('LOGGED IN');
            socket.emit('loggedin');
        }
    });

    // do login
    socket.on('doLogin', function(cred, callback) {

        spotify_web.login(cred.username, cred.password, function(err, spotify) {

            if (typeof spotify !== 'undefined') {
                spotify_instance = spotify;
                spotify.rootlist(spotify.username, function (err, rootlist) {

                    user = {
                            username: spotify.username,
                            country: spotify.country,
                            accountType: spotify.accountType,
                            connected: spotify.connected,
                            playlists: rootlist.contents.items
                    };
                    
                    if (typeof callback === 'function') {
                        callback(user);
                    }

                });


            } else {

                if (typeof callback === 'function') {
                    callback({
                        error: 'wrong credentials'
                    });
                }               
            }
        });
    });


    socket.on('getPlaylist', function(item, callback) {

        spotify_instance.playlist(item.uri, function(err, playlist) {
            
            //console.log('URI', item.uri);
            
            if (typeof callback === 'function') {
                callback(playlist);
            }
        });

    });

    socket.on('getTrack', function(item, callback) {

        spotify_instance.get(item.uri, function(err, track) {
            
            console.log('URI', item.uri);
            
            if (typeof callback === 'function') {
                callback(track);
            }
        });

    });

});