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
  studentsUid: string[];
  students: Teacher[] = [];
  studentSelected: Teacher;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.authService.isAuth().onAuthStateChanged((user: any) => {
      if (user) {
        console.log(user);
        this.db.collection('teachers').doc(user.uid).get().subscribe(
          (doc) => {
            if (doc.exists) {
              this.studentsUid = doc.data().students;
              this.getStudents();
              console.log(this.studentsUid);
            } else {
              this.authService.logout();
              this.router.navigate(['login']);
              alert('No tienes permiso para acceder');
            }
          },
          error => {
            console.log('Error al buscar Profesor');
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

  ngOnInit() {
  }

  getStudents() {
    this.studentsUid.forEach(student => {
      this.dataService.getOneStudent(student).subscribe(
        (data: any) => {
          this.students.push(data);
          console.log(this.students);
        },
        error => console.log('Error al traer profesores')
      );
    });
  }

  selectStudent(student: Student) {
    this.studentSelected = student;
    console.log(this.studentSelected);
  }
}
