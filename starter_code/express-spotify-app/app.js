var SpotifyWebApi = require('spotify-web-api-node');
const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

// Remember to paste your credentials here
var clientId = 'f9e89ccc5a1a4d9880f4fd448618ff52',
    clientSecret = '399b54d361b944e386364f9e9ab4d828';

var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});

app.get('/', (req, res, next) => {
    res.render('index')
})

app.get('/artists', (req, res, next) => {
  // console.log('artists called')
  // console.log('req ', req.query.artist)
  spotifyApi.searchArtists(req.query.artist)
  
  .then(data => {
      res.render('artists', {
        artist: data.body.artists.items

        
        // console.log(artist)
        // spotifyApi.searchArtists.items

      })
        console.log(data.body.artists.items[0].images)
      })
    .catch(err => {
        
      })
})



app.listen(3000)