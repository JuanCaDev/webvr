import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-level1',
  templateUrl: './level1.component.html',
  styleUrls: ['./level1.component.scss']
})
export class Level1Component implements OnInit {
  studentUid: string;

  audioMusic: any = new Audio('./assets/sound/music.mp3');
  audioWelcome: any = new Audio('./assets/sound/level1/welcome.mp3');
  audioGood: any = new Audio('./assets/sound/good.mp3');
  audioIncorrect: any = new Audio('./assets/sound/incorrect.mp3');
  audioWelcomeHomework1: any = new Audio('./assets/sound/level1/welcomeHomework1.mp3');
  audioHomework1: any = new Audio('./assets/sound/level1/homework1.mp3');
  audioWelcomeHomework2: any = new Audio('./assets/sound/level1/welcomeHomework2.mp3');
  audioHomework2: any = new Audio('./assets/sound/level1/homework2.mp3');
  remember12: any = new Audio('./assets/sound/level1/remember12.mp3');
  audioWelcomeHomework3: any = new Audio('./assets/sound/level1/welcomeHomework3.mp3');
  audioHomework3: any = new Audio('./assets/sound/level1/homework3.mp3');
  audioWelcomeHomework4: any = new Audio('./assets/sound/level1/welcomeHomework4.mp3');
  audioHomework4: any = new Audio('./assets/sound/level1/homework4.mp3');
  remember34: any = new Audio('./assets/sound/level1/remember34.mp3');

  questionEntity: any;
  scene: any;

  car: any;
  elf: any;

  constructor(
    private authService: AuthService,
    private db: AngularFirestore,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.isAuth().onAuthStateChanged((user: any) => {
      if (user) {
        console.log(user);
        this.db.collection('students').doc(user.uid).get().subscribe(
          (doc) => {
            if (doc.exists) {
              console.log(doc.data());
              this.studentUid = doc.data().uid;
              // Verificar si completó todas las tareas
              this.checkLevel(doc.data().levels).then(
                res => {
                  console.log('Tareas del nivel 1 finalizadas');
                },
                rej => {
                  this.scene = document.getElementById('scene');
                  this.level1Plane();
                  this.audioMusic.play();
                  this.audioMusic.volumne = 0.4;
                  setTimeout(() => {
                    this.audioMusic.volume = 0.05;
                    this.audioWelcome.play();
                    setTimeout(() => {
                      this.startLevel1(this.studentUid);
                    }, 6000);
                  }, 6000);
                }
              );
              
            } else {
              this.authService.logout();
              this.router.navigate(['login']);
              alert('No tienes permiso para acceder');
            }
          },
          error => {
            console.log('Error al buscar Estudiante');
            this.authService.logout();
            this.router.navigate(['login']);
          }
        );
      } else {
        this.authService.logout();
        this.router.navigate(['login']);
        alert('No tienes permiso para acceder');
        console.log('Error al buscar usuario');
      }
    });
  }

  level1Plane() {
    this.scene.innerHTML = `
      <a-plane id="level1" color="#7BC8A4" width="3" height="1" depth="0.001"
        position="0 1.5 -3.5"
        text="align: center; value: Nivel 1; width: 10"
        animation="property: position; to: 0 -1.5 -3.5; dur: 2000; delay: 9000">
      </a-plane>
    `;
  }

  questionPlane(question: string) {
    this.scene.innerHTML = `
      <a-plane color="#7BC8A4" width="3" height="1" depth="0.001"
               position="0 2.5 -3.5">
               <a-text value="${question}" align="center"></a-tex>
      </a-plane>
    `;
  }

  answersPlane(answers: any) {
    let contador = -2.1;
    answers.forEach((answer: any) => {
      this.scene.innerHTML += `
        <a-plane color="#7BC8A4" width="1.2" height="1" depth="0.001"
        position="${contador} 1.2 -3.5">
          <a-text value="${answer}" align="center"></a-tex>
        </a-plane>
      `;
      contador += 2.1;
    });
  }

  checkLevel(levels: any): Promise<{}> {
    // tslint:disable-next-line:no-unused-expression
    const promise = new Promise ((res, rej) => {
      if (
        levels.level1.homework1 !== undefined &&
        levels.level1.homework2 !== undefined &&
        levels.level1.homework3 !== undefined &&
        levels.level1.homework4 !== undefined
      ) {
        this.audioMusic.pause();
        this.audioWelcome.pause();
        this.router.navigate(['../../game/level2']);
        res();
      } else {
        rej();
      }
    });
    return promise;
  }

  startLevel1(uid: string) {
    this.dataService.getOneStudent(uid).subscribe(
      (data: any) => {
        console.log(data.levels.level1.homework1);
        console.log(!data.levels.level1.homework1);
        console.log(data.levels.level1.homework2);
        console.log(!data.levels.level1.homework2);
        if (data.levels.level1.homework1 === undefined) {
          setTimeout(() => {
            console.log('Homework 1');
            this.homework1();
          }, 3000);
        } else if (data.levels.level1.homework2 === undefined) {
          setTimeout(() => {
            console.log('Homework 2');
            this.homework2();
          }, 3000);
        } else if (data.levels.level1.homework3 === undefined) {
          setTimeout(() => {
            console.log('Homework 3');
            this.homework3();
          }, 3000);
        } else if (data.levels.level1.homework4 === undefined) {
          setTimeout(() => {
            console.log('Homework 4');
            this.homework4();
          }, 3000);
        } else {
          setTimeout(() => {
            console.log('Tareas Nivel 1 finalizadas');
            this.router.navigate(['../../game/level2']);
          }, 9000);
        }
      }
    );
  }

  homework1() {
    this.audioWelcomeHomework1.play();

    this.car = document.getElementById('car');
    this.car.addEventListener('click', () => {
      this.audioHomework1.play();
      this.questionPlane('__ carro es de color verde');
      this.answersPlane(['El', 'La', 'Unos']);
      // Respuestas plane
      const answersPlane = this.scene.querySelectorAll('a-plane');
      console.log(answersPlane);
      let i = 0;
      answersPlane.forEach((answer: any) => {
        if (i !== 0) {
          answer.addEventListener('click', () => {
            console.log('Presionada');
            if (answer === answersPlane[1]) {
              console.log('Respuesta correcta');
              const calification = {
                levels: {
                  level1: { homework1: 5 }
                }
              };
              this.dataService.saveHomework(this.studentUid, calification)
                .then(() => {
                  this.audioGood.play();
                  this.scene.innerHTML = '';
                }).catch(() => console.log('Error: contactar'));
            } else {
              console.log('Respuesta incorrecta');
              const calification = {
                levels: {
                  level1: { homework1: 0 }
                }
              };
              this.dataService.saveHomework(this.studentUid, calification)
                .then(() => {
                  this.audioIncorrect.play();
                  this.scene.innerHTML = '';
                }).catch(() => console.log('Error: contactar'));
            }
          });
        }
        i++;
      });
    });
  }

  homework2() {
    this.audioWelcomeHomework2.play();

    this.elf = document.getElementById('elf');
    this.elf.addEventListener('click', () => {
      this.audioHomework2.play();
      this.questionPlane('__ enanos del bosque');
      this.answersPlane(['Un', 'El', 'Los']);
      // Respuestas plane
      const answersPlane = this.scene.querySelectorAll('a-plane');
      console.log(answersPlane);
      let i = 0;
      answersPlane.forEach((answer: any) => {
        if (i !== 0) {
          answer.addEventListener('click', () => {
            console.log('Presionada');
            if (answer === answersPlane[3]) {
              console.log('Respuesta correcta');
              const calification = {
                levels: {
                  level1: { homework2: 5 }
                }
              };
              this.dataService.saveHomework(this.studentUid, calification)
                .then(() => {
                  this.audioGood.play();
                  this.scene.innerHTML = '';
                  setTimeout(() => {
                    this.remember12.play();
                    setTimeout(() => {}, 5000);
                  }, 2000);
                }).catch(() => console.log('Error: contactar'));
            } else {
              console.log('Respuesta incorrecta');
              const calification = {
                levels: {
                  level1: { homework2: 0 }
                }
              };
              this.dataService.saveHomework(this.studentUid, calification)
                .then(() => {
                  this.audioIncorrect.play();
                  this.scene.innerHTML = '';
                  setTimeout(() => {
                    this.remember12.play();
                    setTimeout(() => {}, 5000);
                  }, 2000);
                }).catch(() => console.log('Error: contactar'));
            }
          });
        }
        i++;
      });
    });
  }

  homework3() {
    this.audioWelcomeHomework3.play();

    this.elf = document.getElementById('toy1');
    this.elf.addEventListener('click', () => {
      this.audioHomework3.play();
      this.questionPlane('__ castillo grande');
      this.answersPlane(['Unos', 'El', 'Un']);
      // Respuestas plane
      const answersPlane = this.scene.querySelectorAll('a-plane');
      console.log(answersPlane);
      let i = 0;
      answersPlane.forEach((answer: any) => {
        if (i !== 0) {
          answer.addEventListener('click', () => {
            console.log('Presionada');
            if (answer === answersPlane[3]) {
              console.log('Respuesta correcta');
              const calification = {
                levels: {
                  level1: { homework3: 5 }
                }
              };
              this.dataService.saveHomework(this.studentUid, calification)
                .then(() => {
                  this.audioGood.play();
                  this.scene.innerHTML = '';
                }).catch(() => console.log('Error: contactar'));
            } else {
              console.log('Respuesta incorrecta');
              const calification = {
                levels: {
                  level1: { homework3: 0 }
                }
              };
              this.dataService.saveHomework(this.studentUid, calification)
                .then(() => {
                  this.audioIncorrect.play();
                  this.scene.innerHTML = '';
                }).catch(() => console.log('Error: contactar'));
            }
          });
        }
        i++;
      });
    });
  }

  homework4() {
    this.audioWelcomeHomework4.play();

    this.elf = document.getElementById('toy3');
    this.elf.addEventListener('click', () => {
      this.audioHomework4.play();
      this.questionPlane('__ cajas amarillas');
      this.answersPlane(['Unas', 'Las', 'Esas']);
      // Respuestas plane
      const answersPlane = this.scene.querySelectorAll('a-plane');
      console.log(answersPlane);
      let i = 0;
      answersPlane.forEach((answer: any) => {
        if (i !== 0) {
          answer.addEventListener('click', () => {
            console.log('Presionada');
            if (answer === answersPlane[1]) {
              console.log('Respuesta correcta');
              const calification = {
                levels: {
                  level1: { homework4: 5 }
                }
              };
              this.dataService.saveHomework(this.studentUid, calification)
                .then(() => {
                  this.audioGood.play();
                  this.scene.innerHTML = '';
                  setTimeout(() => {
                    this.remember34.play();
                    setTimeout(() => {}, 5000);
                  }, 2000);
                }).catch(() => console.log('Error: contactar'));
            } else {
              console.log('Respuesta incorrecta');
              const calification = {
                levels: {
                  level1: { homework4: 0 }
                }
              };
              this.dataService.saveHomework(this.studentUid, calification)
                .then(() => {
                  this.audioIncorrect.play();
                  this.scene.innerHTML = '';
                  setTimeout(() => {
                    this.remember34.play();
                  }, 3000);
                }).catch(() => console.log('Error: contactar'));
            }
          });
        }
        i++;
      });
    });
  }
}
