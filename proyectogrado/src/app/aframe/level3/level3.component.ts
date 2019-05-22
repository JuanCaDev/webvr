import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-level3',
  templateUrl: './level3.component.html',
  styleUrls: ['./level3.component.scss']
})
export class Level3Component implements OnInit {
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
