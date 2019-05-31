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
              // Obtener elementos por id
              // this.questionEntity = document.getElementById('question');
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
    // this.authService.isAuth().onAuthStateChanged(user => {
    //   this.car = document.getElementById('car');
    //   this.elf = document.getElementById('elf');
    //   this.questionEntity = document.getElementById('question');
    //   if (user) {
    //     console.log('Usuario logueado');
    //     console.log(user);
    //     this.studentId = user.uid;
    //     // Comprobar que es estudiante
    //     // this.dataService.getOneStudent(this.studentId).subscribe(
    //     //   (data: any) => {
    //     //     if (data) {
    //     //       console.log(data);
    //     //       console.log('Es un estudiante');
    //     //     } else {
    //     //       this.authService.logout();
    //     //       this.route.navigate(['/login']);
    //     //     }
    //     //   },
    //     //   error => {
    //     //     this.authService.logout();
    //     //     this.route.navigate(['/login']);
    //     //   }
    //     // );

    //     // this.startLevel1();
    //     this.audioMusic.play();
    //     this.audioMusic.volumne = 0.6;
    //     setTimeout(() => {
    //       this.audioMusic.volume = 0.05;
    //       this.audioWelcome.play();
    //       setTimeout(() => {
    //         this.audioWelcomeHomework1.play();
    //       }, 6000);
    //     }, 5000);
    //   } else {
    //     console.log('Usuario no logueado');
    //   }
    // });
  }

  // startLevel1() {
  //   this.dataService.getOneStudent(this.studentId).subscribe((user: any) => {
  //     console.log(user.levels.level1.homework1 === undefined);
  //     this.car.addEventListener('click', () => {
  //       if (user.levels.level1.homework1 === undefined) {
  //         this.homework1(
  //           '__ carro es de color verde',
  //           ['El', 'La', 'Unos']
  //         );
  //       } else {
  //         alert('Ya realizaste esta tarea');
  //       }
  //     });
  //     this.elf.addEventListener('click', () => {
  //       if (user.levels.level1.homework2 === undefined) {
  //         this.homework2(
  //           '__ enanos del bosque',
  //           ['Un', 'El', 'Los']
  //         );
  //       } else {
  //         alert('Ya realizaste esta tarea');
  //       }
  //     });
  //   });
  // }

  // homework1(question: string, answers: any) {
  //   this.audioHomework1.play();
  //   console.log(this.car);
  //   // Plane de pregunta
  //   console.log(this.questionEntity);
  //   this.questionEntity.innerHTML += `
  //       <a-plane color="#7BC8A4" width="3" height="1" depth="0.001"
  //       position="0 2.5 -2.5">
  //         <a-text value="${question}" align="center"></a-tex>
  //       </a-plane>
  //     `;
  //   let contador = -2.1;
  //   let aBox: any;
  //   // Plane de respuesta
  //   answers.forEach(answer => {
  //     this.questionEntity.innerHTML += `
  //       <a-plane color="#7BC8A4" width="1.2" height="1" depth="0.001"
  //       position="${contador} 1.2 -2.5">
  //         <a-text value="${answer}" align="center"></a-tex>
  //       </a-plane>
  //     `;
  //     contador += 2.1;
  //   });

  //   // Añadiendo evento click a las cajas
  //   aBox = this.questionEntity.querySelectorAll('a-plane');
  //   console.log(aBox);
  //   aBox.forEach(box => {
  //     box.addEventListener('click', () => {
  //       if (box === aBox[1]) {
  //         this.db.collection('students').doc(this.studentId).set({
  //           levels: {
  //             level1: { homework1: 5}
  //           }
  //         }, { merge: true }).then(
  //           () => {
  //             alert('Muy bien');
  //             this.audioGood.play();
  //             this.questionEntity.innerHTML = '';
  //             this.car.setAttribute('animation', 'property: position; to: 2.4 0 2; dur: 2000');
  //             setTimeout(() => {
  //               this.car.removeAttribute('animation');
  //               this.car.setAttribute('animation', 'property: position; to: 0 0 0; dur: 2000');
  //               setTimeout(() => {
  //                 this.audioWelcomeHomework2.play();
  //               }, 3000);
  //             }, 5000);
  //           }
  //         );
  //       } else {
  //         this.db.collection('students').doc(this.studentId).set({
  //           levels: {
  //             level1: { homework1: 1}
  //           }
  //         }, { merge: true }).then(
  //           () => {
  //             alert('Respuesta incorrecta');
  //             this.audioIncorrect.play();
  //             this.questionEntity.innerHTML = '';
  //           }
  //         );
  //       }
  //     });
  //   });
  // }

  // homework2(question: string, answers: any) {
  //   this.audioHomework2.play();
  //   console.log(this.elf);
  //   // Plane de pregunta
  //   console.log(this.questionEntity);
  //   this.questionEntity.innerHTML += `
  //       <a-plane color="#7BC8A4" width="3" height="1" depth="0.001"
  //       position="0 2.5 -2.5">
  //         <a-text value="${question}" align="center"></a-tex>
  //       </a-plane>
  //     `;
  //   let contador = -2.1;
  //   // Plane de respuesta
  //   answers.forEach(answer => {
  //     this.questionEntity.innerHTML += `
  //       <a-plane color="#7BC8A4" width="1.2" height="1" depth="0.001"
  //       position="${contador} 1.2 -2.5">
  //         <a-text value="${answer}" align="center"></a-tex>
  //       </a-plane>
  //     `;
  //     contador += 2.1;
  //   });

  //   // Añadiendo evento click a las cajas
  //   const aBox = this.questionEntity.querySelectorAll('a-plane');
  //   console.log(aBox);
  //   aBox.forEach(box => {
  //     box.addEventListener('click', () => {
  //       if (box === aBox[3]) {
  //         this.db.collection('students').doc(this.studentId).set({
  //           levels: {
  //             level1: { homework2: 5}
  //           }
  //         }, { merge: true }).then(
  //           () => {
  //             alert('Muy bien');
  //             this.audioGood.play();
  //             this.questionEntity.innerHTML = '';
  //             this.elf.setAttribute('animation', 'property: position; to: 2.4 -1.6 2; dur: 2000');
  //             setTimeout(() => {
  //               this.elf.removeAttribute('animation');
  //               this.elf.setAttribute('animation', 'property: position; to: 0 0 0; dur: 2000');
  //             }, 5000);
  //           }
  //         );
  //       } else {
  //         this.db.collection('students').doc(this.studentId).set({
  //           levels: {
  //             level1: { homework2: 1}
  //           }
  //         }, { merge: true }).then(
  //           () => {
  //             alert('Respuesta incorrecta');
  //             this.audioIncorrect.play();
  //             this.questionEntity.innerHTML = '';
  //           }
  //         );
  //       }
  //     });
  //   });
  // }

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
          }, 2000);
        } else if (data.levels.level1.homework2 === undefined) {
          setTimeout(() => {
            console.log('Homework 2');
            this.homework2();
          }, 2000);
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
                }).catch(() => console.log('Error: contactar'));
            }
          });
        }
        i++;
      });
    });
  }
}
