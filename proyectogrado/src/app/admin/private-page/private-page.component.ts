import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Teacher } from 'src/app/models/teacher';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private-page',
  templateUrl: './private-page.component.html',
  styleUrls: ['./private-page.component.scss']
})
export class PrivatePageComponent implements OnInit {
  teachersUid: string[];
  teachers: Teacher[] = [];
  teacherSelected: Teacher;
  studentsLength: number;

  constructor(
    private authService: AuthService,
    private db: AngularFirestore,
    public dataService: DataService,
    private router: Router
  ) {
    this.authService.isAuth().onAuthStateChanged((user: any) => {
      if (user) {
        console.log(user);
        this.db.collection('coordinators').doc(user.uid).get().subscribe(
          (doc) => {
            if (doc.exists) {
              this.teachersUid = doc.data().teachers;
              console.log(this.teachersUid);
              if (this.teachersUid !== undefined) {
                this.getTeachers();
              }
            } else {
              this.authService.logout();
              this.router.navigate(['login']);
              alert('No tienes permiso para acceder');
            }
          },
          error => {
            console.log('Error al buscar Coordinador');
            this.authService.logout();
            this.router.navigate(['login']);
          }
        );
      } else {
        this.authService.logout();
        this.router.navigate(['login']);
        console.log('Error al buscar usuario autentificado');
      }
    });
  }

  ngOnInit() {
  }

  getTeachers() {
    this.teachersUid.forEach(teacher => {
      this.dataService.getOneTeacher(teacher).subscribe(
        (data: any) => {
          this.teachers.push(data);
          console.log(this.teachers);
        },
        error => console.log('Error al traer profesores')
      );
    });
  }

  selectTeacher(teacher: Teacher) {
    this.teacherSelected = teacher;
    this.studentsLength = this.teacherSelected.students.length;
    console.log(this.teacherSelected);
  }

  isCoordinator(uid: string) {
    this.db.collection('coordinators').doc(uid).get().subscribe(
      (doc) => {
        this.teachersUid = doc.data().teachers;
        this.getTeachers();
        console.log(this.teachersUid);
      },
      error => console.log('Error al buscar Coordinador')
    );
  }
}
