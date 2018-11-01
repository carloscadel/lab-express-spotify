var SpotifyWebApi = require('spotify-web-api-node');
const express = require('express')
const app = express()
const hbs = require('hbs')

// Remember to paste your credentials here
var clientId = 'f9e89ccc5a1a4d9880f4fd448618ff52',
    clientSecret = 'ef4e36c310db4e859ab6a838330e48fd';

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
