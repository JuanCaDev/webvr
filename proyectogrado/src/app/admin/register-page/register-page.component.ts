import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  doc: string;
  name: string;
  email: string;
  password: string;
  type: string;
  code: string;

  constructor(
    private authService: AuthService,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {}

  registerUser(doc: number, name: string, email: string, password: string, type: string, code: number) {
    console.log('User', doc, name, email, password, type, code);
    switch (type) {
      case 'student':
        this.authService.registerUser(this.email, this.password).then(
          (data: any) => {
            const student = {
              uid: data.user.uid,
              doc,
              name,
              email,
              teacher: code,
              levels: {
                level1: {},
                level2: {},
                level3: {}
              }
            };
            this.db.collection('teachers', ref => ref.where(
              'doc', '==', student.teacher).limit(1)
            ).get().subscribe(
              (querySnapshot: any) => {
                if (querySnapshot.empty) {
                  alert('El profesor no existe');
                  this.deleteUser();
                }
                querySnapshot.forEach((doc: any) => {
                  const newStudent = doc.data();
                  // Obtener profesores
                  console.log('Estudiantes', doc.data().students);
                  const students = doc.data().students || [];
                  // Agregar nuevo profesor
                  students.push(student.uid);
                  // Agregar nuevo array a profesor
                  newStudent.students = students;
                  console.log(newStudent);
                  // Actualizar profesor
                  this.dataService.updateUser('teachers', newStudent)
                    .then(() => {
                      // Agregar Estudiante a db
                      this.dataService.createUser('students', student)
                        .then(() => {
                          alert('Usuario registrado correctamente');
                          this.router.navigate(['game/level1']);
                        })
                        .catch(() => alert('Error al registrar: Verifique todos los campos'));
                    })
                    .catch(() => {
                      alert('Error al registrar: contactar');
                      this.deleteUser();
                    });
                });
              }
            );
          }
        ).catch(() => alert('Error al registrar: Verifique todos los campos'));
        break;
      case 'teacher':
        this.authService.registerUser(this.email, this.password).then(
          (data: any) => {
            const teacher = {
              uid: data.user.uid,
              doc,
              name,
              email,
              coordinator: code
            };
            this.db.collection('coordinators', ref => ref.where(
              'doc', '==', code).limit(1)
            ).get().subscribe(
              (querySnapshot: any) => {
                console.log(querySnapshot);
                if (querySnapshot.empty) {
                  alert('El coordinador no existe');
                  this.deleteUser();
                }
                querySnapshot.forEach((doc: any) => {
                  const newCoordinator = doc.data();
                  // Obtener coordinadores
                  console.log('Profesores', doc.data().teachers);
                  const teachers = doc.data().teachers || [];
                  // Agregar nuevo coordinador
                  teachers.push(teacher.uid);
                  // Agregar nuevo array a coordinador
                  newCoordinator.teachers = teachers;
                  console.log(newCoordinator);
                  // Actualizar Coordinador
                  this.dataService.updateUser('coordinators', newCoordinator)
                    .then(() => {
                      // Agregar Profesor a db
                      this.dataService.createUser('teachers', teacher)
                        .then(() => {
                          alert('Usuario registrado correctamente');
                          this.router.navigate(['']);
                        })
                        .catch(() => alert('Error al registrar: Verifique todos los campos'));
                    })
                    .catch(() => {
                      alert('Error al registrar: contactar');
                      this.deleteUser();
                    });
                });
              }
            );
          }
        ).catch(() => alert('Error al registrar: Verifique todos los campos'));
        break;
      case 'coordinator':
        this.authService.registerUser(this.email, this.password).then(
          (data: any) => {
            const coordinator = {
              uid: data.user.uid,
              doc,
              name,
              email
            };
            this.dataService.createUser('coordinators', coordinator)
              .then(() => {
                alert('Usuario registrado correctamente');
                this.router.navigate(['admin']);
              })
              .catch(() => alert('Error al registrar: Verifique todos los campos'));
          }
        );
        break;
    }
  }

  deleteUser() {
    const user = this.afAuth.auth.currentUser;
    user.delete().then(() => {
      alert('El usuario no ha sido registrado');
    }).catch(() => {
      alert('Ha ocurrido un error: contactar');
    });
  }

}
