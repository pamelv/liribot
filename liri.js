require("dotenv").config();
const Spotify = require("node-spotify-api");
const axios = require("axios");
const moment = require("moment");
const inquirer = require("inquirer");
const keys = require("./keys.js");
const fs = require("fs");

var spotify = new Spotify(keys.spotify);

inquirer
  .prompt([
    { type: "input", name: "name", message: "Enter Your Name" },
    {
      type: "list",
      name: "liriTask",
      message: "Select the task you would like to LIRI to perform",
      choices: [
        "Spotify this song",
        "Concert this",
        "Movie this",
        "Do what it says"
      ]
    }
  ])
  .then(answers => {
    if (answers.liriTask === "Spotify this song") {
      spotifyThis();
    } else if (answers.liriTask === "Concert this") {
      concertThis();
    } else if (answers.liriTask === "Movie this") {
      movieThis();
    } else if (answers.liriTask === "Do what it says") {
      fs.readFile("random.txt", (err, data) => {
        if (err) throw err;
        var results = data.toString();
        var doThis = results.split(",");
        console.log(doThis);
        if (doThis[0] === "spotify-this-song") {
          var song = doThis[1];
          if (song !== "") {
            //spotify this song
            spotify.search({ type: "track", query: song }, function(err, data) {
              if (err) {
                return console.log("Error occurred: " + err);
              }
              var results = data.tracks.items;
              //logs name of artisits
              results.forEach(result => {
                console.log(
                  "* Artist(s): " +
                    result.artists[0].name +
                    "\n" +
                    "* Song Name: " +
                    result.name +
                    "\n" +
                    "* Preview Song: " +
                    result.external_urls.spotify +
                    "\n" +
                    "* Album: " +
                    result.album.name +
                    "\n" +
                    "-------------------------"
                );
              });
            });
          } else console.log("Invalid song entry");
        }
      });
    }
  });

function spotifyThis() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "song",
        message: "Enter the name of a song"
      }
    ])
    .then(answers => {
      var song = answers.song;
      if (song !== "") {
        //spotify this song
        spotify.search({ type: "track", query: song }, function(err, data) {
          if (err) {
            return console.log("Error occurred: " + err);
          }
          var results = data.tracks.items;
          //logs name of artisits
          results.forEach(result => {
            console.log(
              "* Artist(s): " +
                result.artists[0].name +
                "\n" +
                "* Song Name: " +
                result.name +
                "\n" +
                "* Preview Song: " +
                result.external_urls.spotify +
                "\n" +
                "* Album: " +
                result.album.name +
                "\n" +
                "-------------------------"
            );
          });
        });
      } else console.log("Invalid song entry");
    });
}
function concertThis() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "artist",
        message: "Enter the name of an artist"
      }
    ])
    .then(answers => {
      var artist = answers.artist;
      if (artist !== "") {
        // concert this
        axios
          .get(
            "https://rest.bandsintown.com/artists/" +
              artist +
              "/events?app_id=codingbootcamp"
          )
          .then(function(response) {
            if (response.data == []) {
              console.log("No upcoming concerts available");
            }
            // handle success
            else {
              var results = response.data;
              results.forEach(result => {
                console.log(
                  "* Venue: " +
                    result.venue.name +
                    "\n" +
                    "* Location: " +
                    result.venue.city +
                    "," +
                    result.venue.region +
                    "\n" +
                    "* Date: " +
                    moment(result.datetime).format("MMM Do YYYY") +
                    "\n" +
                    "----------------------------------------------"
                );
              });
            }
          })
          .catch(function(error) {
            // handle error
            console.log(error);
          });
      } else console.log("Invalid artist entry");
    });
}
function movieThis() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "movie",
        message: "Enter a movie name"
      }
    ])
    .then(answers => {
      var movie = answers.movie;
      if (movie !== "") {
        // movie this
        axios
          .get("http://www.omdbapi.com/?apikey=trilogy&t=" + movie)
          .then(function(response) {
            // handle success
            var result = response.data;
            console.log(
              "* Movie Title: " +
                result.Title +
                "\n" +
                "* Year of Release: " +
                result.Year +
                "\n" +
                "* IMDB Rating: " +
                result.Ratings[0].Value +
                "\n" +
                "* Rotten Tomatoes Rating: " +
                result.Ratings[1].Value +
                "\n" +
                "* Country of Production: " +
                result.Country +
                "\n" +
                "* Language: " +
                result.Country +
                "\n" +
                "* Plot: " +
                result.Plot +
                "\n" +
                "* Actors: " +
                result.Actors
            );
          })
          .catch(function(error) {
            // handle error
            console.log(error);
          });
      } else console.log("Invalide movie entry");
    });
}
