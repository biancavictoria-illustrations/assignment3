import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  searchString:string;
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[];
  tracks:ResourceData[];

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  search() {
    //this.spotifyService.searchFor(searchCategory, searchString)
    //TODO: call search function in spotifyService and parse response

    // GRABS HTML INPUT OBJECT
    this.searchString = (<HTMLInputElement>document.getElementById('inputText')).value;
    //console.log("word: " + this.searchString);
    this.searchCategory = (<HTMLInputElement>document.getElementById('category')).value;
    console.log("category" + this.searchCategory);
    this.spotifyService.searchFor(this.searchCategory, this.searchString).then((data) => {
      this.resources = data;
      //console.log("resources: " + this.resources);
    });

    // TRACK RESOURCE DATA
    this.spotifyService.searchFor(this.searchCategory, this.searchString).then((data) => {
      this.tracks = data;
      //console.log("resources: " + this.resources);
    });
    
    //console.log("this.resources: " + this.resources);
  }

  

}
