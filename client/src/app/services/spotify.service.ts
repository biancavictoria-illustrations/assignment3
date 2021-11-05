import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    var link = this.http.get(this.expressBaseUrl + endpoint).toPromise();
    console.log(link);
    return link;
    // Need to get value/data from Promise

    //return this.http.get(this.expressBaseUrl + endpoint).toPromise();
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    //return Promise.resolve(link);
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      console.log("About Data: " + data);
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    
    //console.log(category); //Prints "Artist" or "Album" or "Track"
    if (category == "artist"){
      var artistURI = encodeURIComponent(resource);

      // Console Checking
      console.log("artistURI: " + artistURI);
      console.log("link: " + this.expressBaseUrl + '/search/' + 'artist' + '/' + artistURI);
      console.log("request object: " + this.sendRequestToExpress('/search/' + 'artist' + '/' + artistURI));
      

      // create empty array
      /*
      TRYING TO EXTRACT RESOURCE DATA
      const artistArray = [];
      var promiseData = this.sendRequestToExpress('/search/' + category + '/' + artistURI).then(
        (data) => {
          console.log("Promise Data: " + data)});   // this is an object in the promise
      */

      // This will return the json link
      // but I don't think this is an actual array though
      return this.sendRequestToExpress('/search/' + category + '/' + artistURI).then(result => result.data);
    }
    else if (category == "album")
    {
      var albumURI = encodeURIComponent(resource);
      // console - ing
      console.log("link: " + this.expressBaseUrl + '/search/' + 'artist' + '/' + albumURI);

      return this.sendRequestToExpress('/search/' + category + '/' + albumURI)
    }
    else if (category == "track")
    {
      var trackURI = encodeURIComponent(resource);
      // console - ing
      console.log("link: " + this.expressBaseUrl + '/search/' + 'artist' + '/' + trackURI);
      return this.sendRequestToExpress('/search/' + category + '/' + trackURI)


    }
    return null;
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.

    // Basically, our link is incorrect
    // Which is why we can't get any data
    // localhost:8888/artist/adele is not a valid link

    //i added search
    return this.sendRequestToExpress('/artist/:' + artistId).then((data) =>{
      // The following code doesn't run:
      console.log("Artist Data: " + data);
      return new ArtistData(data);
    });
    


    //return null;
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    
   return null;
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    return null;
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    return null;
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    return this.sendRequestToExpress('/album/:id').then((data) =>{
      return new AlbumData(data);
    });
    //return null;
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    return null;
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    return this.sendRequestToExpress('/track/:id').then((data) =>{
      return new TrackData(data);
    });
    //return null;
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    return null;
  }
}
