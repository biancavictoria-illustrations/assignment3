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
    //var arrayName:ResourceData[] = new Array();
    //console.log(category); //Prints "Artist" or "Album" or "Track"
    if (category == "artist"){
      console.log("PLEASE BOB");

      // ENCODES SEARCH STRING
      var artistURI = encodeURIComponent(resource);
      var artistDataArray = [];
      return this.sendRequestToExpress('/search/' + category + '/' + artistURI).then((data) => {
        // TURNS PROMISE DATA into JSON STR then JSON DICT
        const jsonStr = JSON.stringify(data);
        const jsonDict = JSON.parse(jsonStr);
        //console.log("Jason?! " + jsonDict["artists"]["items"][0]);
        const jsonArray = jsonDict["artists"]["items"];

        // ADDS NEW RESOURCE DATA ELEM INTO THE ARAY
        
        jsonArray.forEach(element => artistDataArray.push(new ArtistData(element)));
        //artistDataArray.forEach(element => console.log(element.name));
        //artistDataArray.forEach(element => console.log(element.imageURL));

        console.log("array type: " + artistDataArray)
        return artistDataArray;
      });
  
    }
    else if (category == "album")
    {
      
      // ENCODES SEARCH STRING
      var albumURI = encodeURIComponent(resource);
      return this.sendRequestToExpress('/search/' + category + '/' + albumURI).then((data) => {
        // TURNS PROMISE DATA into JSON STR then JSON DICT
        const jsonStr = JSON.stringify(data);
        const jsonDict = JSON.parse(jsonStr);
        const jsonArray = jsonDict["albums"]["items"];

        // ADDS NEW RESOURCE DATA ELEM INTO THE ARAY
        var albumDataArray = [];
        jsonArray.forEach(element => albumDataArray.push(new AlbumData(element)));
        //console.log(artistDataArray);
        //albumDataArray.forEach(element => console.log(element.name));
        return albumDataArray;
      });
      //return null;
      
    }
    
    else //if (category == "track")
    {
      // ENCODES SEARCH STRING
      var trackURI = encodeURIComponent(resource);
      
      return this.sendRequestToExpress('/search/' + category + '/' + trackURI).then((data) => {
        // TURNS PROMISE DATA into JSON STR then JSON DICT
        const jsonStr = JSON.stringify(data);
        const jsonDict = JSON.parse(jsonStr);
        const jsonArray = jsonDict["tracks"]["items"];

        // ADDS NEW RESOURCE DATA ELEM INTO THE ARAY
        var trackDataArray = [];
        jsonArray.forEach(element => trackDataArray.push(new TrackData(element)));
        //console.log(artistDataArray);
        //trackDataArray.forEach(element => console.log(element.duration_ms));
        return trackDataArray;

      });
      
    }
    return null;
    //return null;
    
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.

    // Basically, our link is incorrect
    // Which is why we can't get any data
    // localhost:8888/artist/adele is not a valid link

    //i added search
    return this.sendRequestToExpress('/artist/' + artistId).then((data) =>{
      // The following code doesn't run:
      console.log("Artist Data hehehe: " + data);
      
      return new ArtistData(data);
    });
    


    //return null;
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    //return this.sendRequestToExpress('/artist/' + artistId + '/related-artists').then((data) =>{
    //  The following code doesn't run:
      
    //  return new ArtistData(data);
    //});
    console.log("You've entered the related artists function!");
    var relatedDataArray = [];
      return this.sendRequestToExpress('/artist-related-artists/' + artistId).then((data) => {
        // TURNS PROMISE DATA into JSON STR then JSON DICT
        const jsonStr = JSON.stringify(data);
        const jsonDict = JSON.parse(jsonStr);
        //console.log("Jason?! " + jsonDict["artists"]);
        const jsonArray = jsonDict["artists"];

        // ADDS NEW RESOURCE DATA ELEM INTO THE ARRAY
        
        jsonArray.forEach(element => relatedDataArray.push(new ArtistData(element)));
        //relatedDataArray.forEach(element => console.log(element.imageURL));

        //console.log("array type: " + relatedDataArray)
        return relatedDataArray;
      });
    //return null;
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    var topTracksArray = [];
    return this.sendRequestToExpress('/artist-top-tracks/' + artistId).then((data) =>{
        const jsonStr = JSON.stringify(data);
        const jsonDict = JSON.parse(jsonStr);
        const jsonArray = jsonDict["tracks"];

        // ADDS NEW RESOURCE DATA ELEM INTO THE ARAY
        var trackDataArray = [];
        jsonArray.forEach(element => trackDataArray.push(new TrackData(element)));
        //console.log(artistDataArray);
        //trackDataArray.forEach(element => console.log(element.duration_ms));
        return trackDataArray;
      //return null;
    });
    //return null;
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    return this.sendRequestToExpress('/artist-albums/' + artistId).then((data) =>{
        const jsonStr = JSON.stringify(data);
        const jsonDict = JSON.parse(jsonStr);
        const jsonArray = jsonDict["items"];

        // ADDS NEW RESOURCE DATA ELEM INTO THE ARAY
        var albumDataArray = [];
        jsonArray.forEach(element => albumDataArray.push(new AlbumData(element)));
        //console.log(artistDataArray);
        //albumDataArray.forEach(element => console.log(element.name));
        return albumDataArray;
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    return this.sendRequestToExpress('/album/' + albumId).then((data) =>{
      return new AlbumData(data);
    });
    //return null;
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    return this.sendRequestToExpress('/album-tracks/' + albumId).then((data) => {
        const jsonStr = JSON.stringify(data);
        const jsonDict = JSON.parse(jsonStr);
        const jsonArray = jsonDict["items"];

        // ADDS NEW RESOURCE DATA ELEM INTO THE ARAY
        var trackDataArray = [];
        jsonArray.forEach(element => trackDataArray.push(new TrackData(element)));
        //console.log(artistDataArray);
        trackDataArray.forEach(element => console.log("Track Name: " + element.name));
        return trackDataArray;
    });
    //return null;
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    return this.sendRequestToExpress('/track/' + trackId).then((data) =>{
      return new TrackData(data);
    });
    //return null;
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    return this.sendRequestToExpress('/track-audio-features/' + trackId).then((data) => {
      return null;
    })
    return null;
  }
}
