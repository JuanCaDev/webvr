import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { StudentInterface } from 'src/app/models/student';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

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

  students: StudentInterface[];

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private db: AngularFirestore,
    private route: Router) { }

  ngOnInit() {
    this.authService.isAuth().onAuthStateChanged((user: any) => {
      if (user) {
        this.teacherId = user.uid;
        this.dataService.getOneTeacher(this.teacherId).subscribe(
          (data: any) => {
            console.log(data);
            if (!data) {
              this.authService.logout();
              this.route.navigate(['/login']);
            } else {
              console.log('Es un profesor');
            }
          },
          error => {
            this.authService.logout();
            this.route.navigate(['/login']);
          }
        );
        console.log(user);
        this.getStudents(this.teacherId);
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
            data => {
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
              this.dataService.addStudent(student);
              this.dataService.toast('Estudiante creado correctamente');
            },
            error => {
              this.dataService.toast('Error al agregar estudiante');
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

  getAllStudents() {
    this.dataService.getAllStudents().subscribe(data => {
      console.log(data);
    });
  }
}
