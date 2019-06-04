import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-level2',
  templateUrl: './level2.component.html',
  styleUrls: ['./level2.component.scss']
})
export class Level2Component implements OnInit {
  studentUid: string;

  audioMusic: any = new Audio('./assets/sound/level2/music.mp3');
  audioWelcome: any = new Audio('./assets/sound/level2/welcome.mp3');
  audioGood: any = new Audio('./assets/sound/good.mp3');
  audioIncorrect: any = new Audio('./assets/sound/incorrect.mp3');
  audioWelcomeHomework5: any = new Audio('./assets/sound/level2/welcomeHomework5.mp3');
  audioHomework56: any = new Audio('./assets/sound/level2/homework56.mp3');
  audioWelcomeHomework6: any = new Audio('./assets/sound/level2/welcomeHomework6.mp3');
  remember56: any = new Audio('./assets/sound/level2/remember56.mp3');
  audioWelcomeHomework7: any = new Audio('./assets/sound/level2/welcomeHomework7.mp3');
  audioHomework78: any = new Audio('./assets/sound/level2/homework78.mp3');
  audioWelcomeHomework8: any = new Audio('./assets/sound/level2/welcomeHomework8.mp3');
  remember78: any = new Audio('./assets/sound/level2/remember78.mp3');

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
                  console.log('Tareas del nivel 2 finalizadas');
                },
                rej => {
                  this.scene = document.getElementById('scene');
                  this.level2Plane();
                  this.audioMusic.play();
                  this.audioMusic.volumne = 0.3;
                  setTimeout(() => {
                    this.audioMusic.volume = 0.04;
                    this.audioWelcome.play();
                    setTimeout(() => {
                      this.startLevel2(this.studentUid);
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

  level2Plane() {
    this.scene.innerHTML = `
      <a-plane id="level2" color="#7BC8A4" width="3" height="1" depth="0.001"
        position="1 1.5 0.5"
        text="align: center; value: Nivel 2; width: 10"
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
        levels.level2.homework1 !== undefined &&
        levels.level2.homework2 !== undefined &&
        levels.level2.homework3 !== undefined &&
        levels.level2.homework4 !== undefined
      ) {
        this.audioMusic.pause();
        this.audioWelcome.pause();
        this.router.navigate(['../../game/level3']);
        res();
      } else {
        rej();
      }
    });
    return promise;
  }

  startLevel2(uid: string) {
    this.dataService.getOneStudent(uid).subscribe(
      (data: any) => {
        if (data.levels.level2.homework5 === undefined) {
          setTimeout(() => {
            console.log('Homework 5');
            this.homework5();
          }, 3000);
        } else if (data.levels.level2.homework6 === undefined) {
          setTimeout(() => {
            console.log('Homework 6');
            this.homework6();
          }, 3000);
        } else if (data.levels.level2.homework7 === undefined) {
          setTimeout(() => {
            console.log('Homework 7');
            this.homework7();
          }, 3000);
        } else if (data.levels.level2.homework8 === undefined) {
          setTimeout(() => {
            console.log('Homework 8');
            this.homework8();
          }, 3000);
        } else {
          setTimeout(() => {
            console.log('Tareas Nivel 2 finalizadas');
            this.router.navigate(['../../game/level3']);
          }, 9000);
        }
      }
    );
  }

  homework5() {
    this.audioWelcomeHomework5.play();

    const car = document.getElementById('bodega');
    car.addEventListener('click', () => {
      this.audioHomework56.play();
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
                  level2: { homework5: 5 }
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
                  level2: { homework5: 0 }
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

  homework6() {
    this.audioWelcomeHomework6.play();

    const elf = document.getElementById('letrero');
    elf.addEventListener('click', () => {
      this.audioHomework56.play();
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
                  level2: { homework6: 5 }
                }
              };
              this.audioGood.play();
              this.scene.innerHTML = '';
              setTimeout(() => {
                this.remember56.play();
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
                  level2: { homework6: 0 }
                }
              };
              this.audioIncorrect.play();
              this.scene.innerHTML = '';
              setTimeout(() => {
                this.remember56.play();
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

  homework7() {
    this.audioWelcomeHomework7.play();

    const elf = document.getElementById('gallina');
    elf.addEventListener('click', () => {
      this.audioHomework78.play();
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
                  level2: { homework7: 5 }
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
                  level2: { homework7: 0 }
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

  homework8() {
    this.audioWelcomeHomework8.play();

    const elf = document.getElementById('arbusto');
    elf.addEventListener('click', () => {
      this.audioHomework78.play();
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
                  level2: { homework8: 5, finish: true }
                }
              };
              this.audioGood.play();
              this.scene.innerHTML = '';
              setTimeout(() => {
                this.remember78.play();
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
                  level2: { homework8: 0, finish: true }
                }
              };
              this.audioIncorrect.play();
              this.scene.innerHTML = '';
              setTimeout(() => {
                this.remember78.play();
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
