//jukebox.js
// Generate HTML Elements via a create method

// add Song
// load songs!!!
// play a song
// pause a song (toggle)
// go backwards a song
// go forwards a song
// randomize playist


function Jukebox() {
  // to do: build out the OO Jukebox!!
  this.tracks = [];
  this.currentTrack = 0;
  this.el = {};
}



// Accept a song or an array of songs and add them to the tracks array
Jukebox.prototype.addSong = function(song) {
  if( Array.isArray(song) && song.every( s => s instanceof Song ) ) {
    Array.prototype.push.apply(this.tracks, song);
  } else if( song instanceof Song ) {
    this.tracks.push( song );
  } else {
    return false;
  }
  return true;
}
// Play the current song
Jukebox.prototype.play = function(){
  var currentSong = this.tracks[this.currentTrack];
  // determine whether we're played or paused
  this.el.audio.src = currentSong.file;
  this.el.artist.innerText = currentSong.artist;
  this.el.song.innerText = currentSong.name;
  this.el.audio.play();
  console.log(this.currentTrack)
  console.log(currentSong)
  console.log("Playing");
}


// Go back a song & play
Jukebox.prototype.back = function(){
  this.currentTrack -= 1;
  if (this.currentTrack < 0) {
    this.currentTrack = this.tracks.length-1
  }
    this.play();
  // to do: go back a song
}
// Go forward a song & play
Jukebox.prototype.next = function(){
  this.currentTrack += 1;
  this.play();
// this.el.audio.src = this.tracks [this.currentTrack].file;
//   this.el.audio.play();
// var song = this.tracks[this.currentTrack];
// this.el.audio.src = song.file;
// this.el.artist.innerText =song.artist;
// this.el.song.innerText = song.name;
}
// Play futured songs in shuffled order
Jukebox.prototype.shuffle = function(){
  this.currentTrack = parseInt(Math.random()*this.tracks.length);
  this.el.audio.src = this.tracks[this.currentTrack].file;
  this.play();
};
Jukebox.prototype.pause = function(){
this.el.audio.pause()
}

function Song(file, name, artist) {
  this.file = file;
  this.name = name;
  this.artist = artist;
}

// create will build out the HTML elements
// for our jukebox:
// info (artist/song) / controls (back/play/pause/forward/volume)
Jukebox.prototype.create = function(el, options){
  let banana = this; //banana saves the day

  el.innerHTML = `
  <audio></audio>
  <div class="info">
      <h3 class="name">${options.name}</h3>
      <div class="track"><span class="artist"></span> &mdash; <span class="song"></span></div>
    </div>
    <div class="controls">
      <i class="back fa fa-backward fa-2x"></i>
      <i class="pause fa fa-pause fa-2x"></i>
      <i class="play fa fa-play fa-2x"></i>
      <i class="next fa fa-forward fa-2x"></i>
      <i class="shuffle fa fa-random fa-2x"></i>
      <div class="volume"></div>
    </div>
    <div id="playlist">
			<ol id="list"></ol>
		</div>
    `;
  // ELEMENTS Stored here----
  this.el.main = el;                              // main jukebox container
  this.el.audio = el.querySelector("audio");      // audio tag
  this.el.artist = el.querySelector(".artist");   // artist area
  this.el.song = el.querySelector(".song");       // song area
  this.el.play = el.querySelector(".play"); // play/pause toggle
  this.el.pause = el.querySelector(".pause");
  this.el.back = el.querySelector(".back");       // back button
  this.el.next = el.querySelector(".next");       // next button
  this.el.shuffle = el.querySelector(".shuffle"); // shuffle button
  this.el.volume = el.querySelector(".volume"); // volume bar
  // SLIDER---
  noUiSlider.create(this.el.volume,{
    start: 0.8,
    range: {
      min:0,
      max: 1
    }
  });
  this.el.volume.noUiSlider.on('slide', function(){
    banana.el.audio.volume = parseFloat(banana.el.volume.noUiSlider.get());
  });
  // attach eventlisteners for our buttons
  // since the meaning of the "this" keyword variable changes
  // to refer to the button control within the addEventListener
  this.el.play.addEventListener("click",banana.play.bind(banana));
  this.el.pause.addEventListener("click",banana.pause.bind(banana));
  this.el.back.addEventListener("click",banana.back.bind(banana));
  this.el.next.addEventListener("click",banana.next.bind(banana));
  this.el.shuffle.addEventListener("click",banana.shuffle.bind(banana));
}
var player;
document.addEventListener("DOMContentLoaded",function(){
  player = new Jukebox();
  player.create(document.getElementById("jukebox"),{name: "Lets get Bach on Track"});
   player.addSong([
     new Song("Audio/What_Is_Love.m4a", "What is Love", "Haddaway"),
     new Song("Audio/JJFlash.m4a","Jumpin' Jack Flash","The Rolling Stones"),
     new Song("Audio/Fader.m4a","Fader","The Temper Trap"),
     new Song("Audio/Living.m4a", "Living", "Bakermat"),
     new Song("Audio/Tamacun.m4a", "Tamacun", " Rodrigo y Gabriela"),
     new Song("Audio/Play_That_Funky_Music.m4a", "Play That Funky Music", "Wild Cherry"),
   ])
 });

 //$("h1").fadeOut(8000);


/*this.currentTrack = (this.currentTrack + 1) % this.track.length - When reaches the end
 of the Array, OR:
      this.currentTrack += 1;
      if( this.currentTrack >= this.track.length ) {
      this.currentTrack = 0;
    }
    */

// math.random

//slider - on click in focus - key press events. add key press listeners to the key notes. x
