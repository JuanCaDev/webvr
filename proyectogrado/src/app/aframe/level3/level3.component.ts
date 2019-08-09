import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-level3',
  templateUrl: './level3.component.html',
  styleUrls: ['./level3.component.scss']
})
export class Level3Component implements OnInit {
  studentUid: string;

  audioMusic: any = new Audio('./assets/sound/level3/music.mp3');
  audioWelcome: any = new Audio('./assets/sound/level3/welcome.mp3');
  audioGood: any = new Audio('./assets/sound/good.mp3');
  audioIncorrect: any = new Audio('./assets/sound/incorrect.mp3');
  audioWelcomeHomework9: any = new Audio('./assets/sound/level3/welcomeHomework9.mp3');
  audioHomework9: any = new Audio('./assets/sound/level3/homework9.mp3');
  audioWelcomeHomework10: any = new Audio('./assets/sound/level3/welcomeHomework10.mp3');
  audioHomework10: any = new Audio('./assets/sound/level3/homework10.mp3');
  remember910: any = new Audio('./assets/sound/level3/remember910.mp3');
  audioWelcomeHomework11: any = new Audio('./assets/sound/level3/welcomeHomework11.mp3');
  audioHomework11: any = new Audio('./assets/sound/level3/homework11.mp3');
  audioWelcomeHomework12: any = new Audio('./assets/sound/level3/welcomeHomework12.mp3');
  audioHomework12: any = new Audio('./assets/sound/level3/homework12.mp3');
  remember1112: any = new Audio('./assets/sound/level3/remember1112.mp3');

  questionEntity: any;
  scene: any;

  constructor(
    private authService: AuthService,
    private db: AngularFirestore,
    private dataService: DataService,
    private router: Router
  ) { }

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
                  console.log('Tareas del nivel 3 finalizadas');
                },
                rej => {
                  this.scene = document.getElementById('scene');
                  this.level3Plane();
                  this.audioMusic.play();
                  this.audioMusic.volumne = 0.3;
                  setTimeout(() => {
                    this.audioMusic.volume = 0.04;
                    this.audioWelcome.play();
                    setTimeout(() => {
                      this.startLevel3(this.studentUid);
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

  level3Plane() {
    this.scene.innerHTML = `
      <a-plane id="level3" color="#7BC8A4" width="3" height="1" depth="0.001"
        position="1 1.5 0.5"
        text="align: center; value: Nivel 3; width: 10"
        animation="property: position; to: 1 -1.5 -0.5; dur: 2000; delay: 9000">
      </a-plane>
    `;
  }

  questionPlane(question: string) {
    this.scene.innerHTML = `
      <a-plane color="#7BC8A4" width="3" height="1" depth="0.001"
               position="3.4 2.6 1.2">
               <a-text value="${question}" align="center"></a-tex>
      </a-plane>
    `;
  }

  answersPlane(answers: any) {
    let contador = 1.5;
    answers.forEach((answer: any) => {
      this.scene.innerHTML += `
        <a-plane color="#7BC8A4" width="1.2" height="1" depth="0.001"
        position="${contador} 1.3 1.2">
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
        levels.level3.homework9 !== undefined &&
        levels.level3.homework10 !== undefined &&
        levels.level3.homework11 !== undefined &&
        levels.level3.homework12 !== undefined
      ) {
        this.audioMusic.pause();
        this.audioWelcome.pause();
        alert('Haz completado todos los niveles.');
        this.authService.logout();
        // this.router.navigate(['../../game/level3']);
        res();
      } else {
        rej();
      }
    });
    return promise;
  }

  startLevel3(uid: string) {
    this.dataService.getOneStudent(uid).subscribe(
      (data: any) => {
        if (data.levels.level3.homework9 === undefined) {
          setTimeout(() => {
            console.log('Homework 9');
            this.homework9();
          }, 3000);
        } else if (data.levels.level3.homework10 === undefined) {
          setTimeout(() => {
            console.log('Homework 10');
            this.homework10();
          }, 3000);
        } else if (data.levels.level3.homework11 === undefined) {
          setTimeout(() => {
            console.log('Homework 11');
            this.homework11();
          }, 3000);
        } else if (data.levels.level3.homework12 === undefined) {
          setTimeout(() => {
            console.log('Homework 12');
            this.homework12();
          }, 3000);
        } else {
          setTimeout(() => {
            console.log('Tareas Nivel 3 finalizadas');
            alert('Haz completado todos los niveles. ¡Felicidades!');
            this.authService.logout();
          }, 9000);
        }
      }
    );
  }

  homework9() {
    this.audioWelcomeHomework9.play();

    const car = document.getElementById('bodega');
    car.addEventListener('click', () => {
      this.audioHomework9.play();
      this.questionPlane('Selecciona uno:');
      this.answersPlane(['Pedro', 'Carolina', 'Granja']);
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
                  level3: { homework9: 5 }
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
                  level3: { homework9: 0 }
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

  homework10() {
    this.audioWelcomeHomework10.play();

    const elf = document.getElementById('letrero');
    elf.addEventListener('click', () => {
      this.audioHomework10.play();
      this.questionPlane('Selecciona uno:');
      this.answersPlane(['Vaca', 'Colombia', 'Juan']);
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
                  level3: { homework10: 5 }
                }
              };
              this.audioGood.play();
              this.scene.innerHTML = '';
              setTimeout(() => {
                this.remember910.play();
                setTimeout(() => {
                  this.dataService.saveHomework(this.studentUid, calification)
                    .then(() => console.log('Respuesta de tarea guardada'))
                    .catch(() => console.log('Error: contactar'));
                }, 7000);
              }, 2000);
            } else {
              console.log('Respuesta incorrecta');
              const calification = {
                levels: {
                  level3: { homework10: 0 }
                }
              };
              this.audioIncorrect.play();
              this.scene.innerHTML = '';
              setTimeout(() => {
                this.remember910.play();
                setTimeout(() => {
                  this.dataService.saveHomework(this.studentUid, calification)
                    .then(() => console.log('Tarea guardada correctamente'))
                    .catch(() => console.log('Error: contactar'));
                }, 5000);
              }, 2000);
            }
          });
        }
        i++;
      });
    });
  }

  homework11() {
    this.audioWelcomeHomework11.play();

    const elf = document.getElementById('gallina');
    elf.addEventListener('click', () => {
      this.audioHomework11.play();
      this.questionPlane('Selecciona uno:');
      this.answersPlane(['Colombia', 'Ciudad', 'Pueblo']);
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
                  level3: { homework11: 5 }
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
                  level3: { homework11: 0 }
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

  homework12() {
    this.audioWelcomeHomework12.play();

    const elf = document.getElementById('arbusto');
    elf.addEventListener('click', () => {
      this.audioHomework12.play();
      this.questionPlane('Selecciona uno:');
      this.answersPlane(['Puerta', 'Piedra', 'Pedro']);
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
                  level3: { homework12: 5, finish: true }
                }
              };
              this.audioGood.play();
              this.scene.innerHTML = '';
              setTimeout(() => {
                this.remember1112.play();
                setTimeout(() => {
                  this.dataService.saveHomework(this.studentUid, calification)
                    .then(() => console.log('Tarea guardada correctamente'))
                    .catch(() => console.log('Error: contactar'));
                }, 7000);
              }, 2000);
            } else {
              console.log('Respuesta incorrecta');
              const calification = {
                levels: {
                  level3: { homework12: 0, finish: true }
                }
              };
              this.audioIncorrect.play();
              this.scene.innerHTML = '';
              setTimeout(() => {
                this.remember1112.play();
                setTimeout(() => {
                  this.dataService.saveHomework(this.studentUid, calification)
                    .then(() => console.log('Tarea guardada correctamente'))
                    .catch(() => console.log('Error: contactar'));
                }, 5000);
              }, 3000);
            }
          });
        }
        i++;
      });
    });
  }

}
