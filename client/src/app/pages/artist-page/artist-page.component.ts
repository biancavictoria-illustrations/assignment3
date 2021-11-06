import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artistTrack:ArtistData;
  artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];

  constructor(private route: ActivatedRoute, private spotifyService:SpotifyService) { }
  // private spotifyService:SpotifyService

  ngOnInit() {
    this.artistId = this.route.snapshot.paramMap.get('id');
    
    this.spotifyService.getArtist(this.artistId).then((data) => {
      this.artistTrack = data;
    });


    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums
     
    //console.log("Art Object 2: "+ this.artist.name);

    this.spotifyService.getRelatedArtists(this.artistId).then((data) => {
      this.relatedArtists = data;
    });
    
    this.spotifyService.getTopTracksForArtist(this.artistId).then((data) => {
      this.topTracks = data;
    });

    this.spotifyService.getAlbumsForArtist(this.artistId).then((data) => {
      this.albums = data;
    });

    /*console.log("Please");
    console.log("Artist ID: " + this.artistId);
    this.spotifyService.getArtist(this.artistId).then((data) => {
      this.artist = data;
      console.log("inside artist: " + this.artist);
    });
    console.log("this.artist: " + this.artist);


    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums
     
    //console.log("Art Object 2: "+ this.artist.name);

    this.spotifyService.getRelatedArtists(this.artistId).then((data) => {
      this.relatedArtists = data;
    });

    this.spotifyService.getTopTracksForArtist(this.artistId).then((data) => {
      this.topTracks = data;
    });*/
   
/*
    //this.artist = this.artistCreator();
    console.log("Please print i beg of you it's been like more than 6 hours: " + this.artist.name);
    //this.artistCreator();
    //this.artist = this.spotifyService.getArtist(this.artistId);
    //this.artist = data;
    //console.log("promise:" + this.artist);
    this.spotifyService.getRelatedArtists(this.artistId).then((data) => {
      this.relatedArtists = data;
      console.log("related object: " + this.relatedArtists); //good
      console.log("related object 1: " + this.relatedArtists[0].name); //good
    });
    this.spotifyService.getTopTracksForArtist(this.artistId).then((data) => {
      this.topTracks = data;
      console.log("topTrack object: " + this.topTracks); //good
      console.log("topTrack 1: " + this.topTracks[0].name);//good
    });*/
  }

  logging()
  {
    
  }

  

  /*
  this.searchCategory = (<HTMLInputElement>document.getElementById('category')).value;
    console.log("category" + this.searchCategory);
    this.spotifyService.searchFor(this.searchCategory, this.searchString).then((data) => {
      this.resources = data;
      //console.log("resources: " + this.resources);
    });

    // TRACK RESOURCE DATA
    this.spotifyService.searchFor(this.searchCategory, this.searchString).then((data) => {
      this.tracks = data;

  */

}