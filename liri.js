require("dotenv").config();
var keys = require("./keys.js");

var inquirer = require("inquirer");

function select(){
inquirer.prompt([

    {
        type: "list",
        name: "userSelect",
        message: "Select option",
        choices: ["concert-this", "spotify-this-song", "movie-this", "neither"]
    },
    {
        type: "input",
        name: "userInput",
        message: "Enter the name of the song or movie or concert",

    }
]).then(function (guess) {
    if (guess.userSelect === "concert-this") {
        console.log("Picked Concert");
        var Client = require('node-rest-client').Client;
        var client = new Client();
         
        // direct way
        client.get("https://rest.bandsintown.com/artists/" + guess.userInput + "/events?app_id=codingbootcamp", function (data, response) {
            // parsed response body as js object
           //console.log(JSON.stringify(data.venue));
            // raw response
            //console.log(response.venue.country);
            var limitLoop = 5;
            for (var i = 0; i < limitLoop; i++) {
                
                venueName = (JSON.stringify(data[i].venue.name));
                venueCity = (JSON.stringify(data[i].venue.city));
                venueCountry = (JSON.stringify(data[i].venue.country));
                venueDate = (JSON.stringify(data[i].on_sale_datetime));

               // trackName = (JSON.stringify(data.tracks.items[i].album.track));
              //  external_urls = (JSON.stringify(data.tracks.items[i].album.external_urls));

                //console.log("Return value" + i);
                console.log("The Venue: " + " " + venueName);
                console.log("The Venue: " + " " + venueCountry);
                console.log("The Venue: " + " " + venueCity);
                console.log("The Venue: " + " " + venueDate);
               // console.log("The Track Name:" + " " + trackName);
              //  console.log("The External Link is:" + " " + external_urls);
                console.log("+++++++++++++");

            }
        
        });
        
    }
    if (guess.userSelect === "spotify-this-song") {
        console.log("Picked Spotify");

        var Spotify = require('node-spotify-api');
        var spotify = new Spotify(keys.spotify);


        spotify.search({ type: 'track', query: guess.userInput, limit: 5 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var limitLoop = 5;
            for (var i = 0; i < limitLoop; i++) {
                
                artistName = (JSON.stringify(data.tracks.items[i].album.name));
                trackName = (JSON.stringify(data.tracks.items[i].album.track));
                external_urls = (JSON.stringify(data.tracks.items[i].album.external_urls));

                console.log("Return value" + i);
                console.log("The Artist Name: " + " " + artistName);
                console.log("The Track Name:" + " " + trackName);
                console.log("The External Link is:" + " " + external_urls);
                console.log("+++++++++++++");

            }
        });
    
    }
     if (guess.userSelect === "movie-this") {
                console.log("Picked Movie");
                var Client = require('node-rest-client').Client;
                var client = new Client();
                 
                // direct way
                client.get("https://www.omdbapi.com/?t=" + guess.userInput + "&y=&plot=short&apikey=trilogy", function (data, response) {
                  
                        
                       movieName = (JSON.stringify(data.Title));
                       movieReleased = (JSON.stringify(data.Released));
                       movieImdb = (JSON.stringify(data.imdbRating));
                        movieLanguage = (JSON.stringify(data.Language));
                        moviePlot = (JSON.stringify(data.Plot));
                        movieActors = (JSON.stringify(data.Actors));

                        console.log("The Movie Name: " + " " + movieName);
                        console.log("The Movie Release: " + " " + movieReleased);
                        console.log("The IMDB Rate: " + " " + movieImdb);
                        console.log("The Language: " + " " + movieLanguage);
                        console.log("The Plot:" + " " + moviePlot);
                        console.log("The Actors:" + " " + movieActors);
                        
                     
                        console.log("+++++++++++++");
        
                
                });
                
            }   
     
    

    })

}
select();