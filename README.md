# LIRI Bot nodeJS Application

This nodeJS application uses API from Spotify, OMDB and Bands in Town to give users information. Users will be prompted to provide their name and select the action they would like LIRI to perform. LIRI is designed to complete one action from the following selections:

## Spotify this song

    This action will take the name of a song from the user and return all of the songs that match the song name in spotify. Upon succesful execution of this action, users will be presented with the follow:
        ** Name of Artist(s)
        ** Song Name
        ** Link to Preview Song on Spotify
        ** Album for the Song

## Concert this

     This action will take the name of an artist or band from the user and return any upcoming shows/concerts. Upon succesful execution of this action, users will be presented with the follow:
        ** Venue
        ** Location
        ** Event Date

## Movie this

    This action will take the name of a movie from the user and return information related to the movie. Upon succesful execution of this action, users will be presented with the follow:
        ** Movie Title
        ** Year of Movie Release
        ** IMBD Rating
        ** Rotten Tomatoes Rating
        ** Country of Production
        ** Language of Movie
        ** Plot
        ** Featured Actors

## Do what it says

    This action will read the 'random.txt' file for a command to complete. The application will execute the command and return the appropriate information based on what is written in the file.

## Application Demo

![Alt Text](liribot_demo.gif)
