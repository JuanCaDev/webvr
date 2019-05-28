import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Student } from 'src/app/models/student';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/models/teacher';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  name: string;
  email: string;
  uid: string;
  teacher: string;
  password: string;
  currentLevel = 1;
  average = 0;
  levels = { level1: {}, level2: {}, level3: {}};

  teacherId: string;
  studentsInTeacher: string[] = [];

  students: Student[];

  isCoordinador: any = null;
  userUid: string = null;

  teachers: Teacher[];

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private db: AngularFirestore,
    private route: Router) { }

  ngOnInit() {
    this.authService.isAuth().onAuthStateChanged((user: any) => {
      if (user) {
        console.log(user);
        this.db.collection('coordinators').doc(user.uid).get().subscribe(
          (doc) => this.teachers = doc.data().teachers,
          error => console.log('Error al buscar Coordinador')
        );
      }
    });
  }

  addStudentInTeacher() {
    this.db.collection('teachers').get().subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        // Agregando estudiates a nuevo array
        this.studentsInTeacher = doc.data().students;
      });

      // Agregando nuevo estudiante al profesor
      this.db.collection('teachers').doc(this.teacherId).set({
        students: [...this.studentsInTeacher, this.uid]
      }, { merge: true })
        .then(() => {
          // Registro estudiante por correo
          this.authService.registerUser(this.email, this.password).then(
            (data: any) => {
              const student = {
                name: this.name,
                email: this.email,
                uid: data.user.uid,
                id: this.uid,
                teacher: this.teacherId,
                currentLevel: this.currentLevel,
                average: this.average,
                levels: this.levels
              };

              // Agrego estudiante a collección
              // this.dataService.addStudent(student);
              alert('Estudiante creado correctamente');
            },
            error => {
              alert('Error al agregar estudiante');
              console.log('Error', error);
            }
          );
        });
    });
  }

  getStudents(teacherId: string) {
    this.db.collection('students', ref => ref.where('teacher', '==', teacherId)).valueChanges()
      .subscribe((data: any) => {
        this.students = data;
      });
  }

  // getAllStudents() {
  //   this.dataService.getAllStudents().subscribe(data => {
  //     console.log(data);
  //   });
  // }
}
