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
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    //console.log(category); //Prints "Artist" or "Album" or "Track"
    if (category == "Artist"){
      // promise
      
      var artistURI = encodeURIComponent(resource);
      console.log("artistURI: " + artistURI);
      // Creates artist promise
      var artists = this.getArtist(artistURI);
      //trying to get resource data
      
      //console.log("Artist: " + artists);
      //ResourceData[] =[artists];
      //return artists;

      fetch("http://localhost:8888" + "/artist/" + artistURI).then(function(response) {
        var dataPromise = response.json();
        console.log("the data1: " + dataPromise);
        var json_file = new ArtistData(dataPromise);
        console.log("1");
        console.log("json: " + json_file.category);
        return new ArtistData(dataPromise);
      })
      .then(function(data){
        console.log("the data2: " + data);
      }); 

    }
    else if (category == "Album")
    {

    }
    else
    {
      
    }
    return null;
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.

    // fixme: link
    return this.sendRequestToExpress('/artist/' + artistId).then((data) =>{
      console.log("data: " + data);
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
