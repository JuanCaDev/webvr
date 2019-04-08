import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { TeacherInterface } from 'src/app/models/teacher';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-private-page',
  templateUrl: './private-page.component.html',
  styleUrls: ['./private-page.component.scss']
})
export class PrivatePageComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  teachers: Array<TeacherInterface>;

  constructor(
    private authService: AuthService,
    private db: AngularFirestore,
    public dataService: DataService) { }

  ngOnInit() {
    this.getAllTeachers();
    this.authService.isAuth().onAuthStateChanged(user => {
      console.log(user);
      console.log('Tipo uid: ', typeof user.uid);
    });
  }

  getAllTeachers() {
    this.dataService.getAllTeachers().subscribe(data => {
      this.teachers = data;
    });
  }

  addTeacher() {
    this.authService.registerUser(this.email, this.password)
      .then(data => {
        const teacher: TeacherInterface = {
          name: this.name,
          email: this.email,
          uid: data.user.uid,
          students: []
        };

        console.log('TeacherData', data);
        this.db.collection('teachers').doc(data.user.uid).set(teacher)
        .then(() => {
          this.dataService.toast('Profesor creado correctamente');
        })
        .catch(error => this.dataService.toast('Error al crear: ' + error));
      });
  }

  updateTeacher() {
  }

  deleteTeacher() {
  }

}
