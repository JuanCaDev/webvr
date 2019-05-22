import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-level2',
  templateUrl: './level2.component.html',
  styleUrls: ['./level2.component.scss']
})
export class Level2Component implements OnInit {
  audioMusic = new Audio('./assets/sound/level3/music.mp3');

  constructor() { }

  ngOnInit() {
    if (this.audioMusic) {
      console.log('Música');
      this.audioMusic.play();
    } else {
      console.log('Error al traer la música');
    }
  } 
}
