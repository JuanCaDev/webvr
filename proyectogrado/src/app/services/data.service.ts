import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Student } from '../models/student';

import * as M from 'materialize-css';
import { Coordinator } from '../models/coordinator';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    public db: AngularFirestore
  ) { }

  // Users: general
  createUser(type: string, object: any) {
    return this.db.collection(type).doc(object.uid).set(object);
  }

  updateUser(type: string, object: any) {
    return this.db.collection(type).doc(object.uid).set(object, {merge: true});
  }

  // Teacher
  getOneTeacher(uid: string) {
    return this.db.collection('teachers').doc(uid).valueChanges();
  }

  deleteTeacher(uid: string) {
    return this.db.collection('teachers').doc(uid).delete();
  }

  // Student
  getOneStudent(uid: string) {
    return this.db.collection('students').doc(uid).valueChanges();
  }

  // -----------

  // Users

  // getOneUser(uid: string) {
  //   return this.db.collection('users').doc(uid).valueChanges().subscribe(
  //     (data: any) => console.log(data)
  //   );
  // }

  // Profesores

  // getAllTeachers() {
  //   return this.db.collection('teachers').valueChanges();
  // }

  // Estudiantes

  // getAllStudents() {
  //   return this.db.collection('students').valueChanges();
  // }

  

  // addStudent(student: Student) {
  //   return this.db.collection('students').doc(student.uid).set(student);
  // }

  // updateStudent(student: Student) {

  // }

  // deleteStudent(id: string) {

  // }

  // Coordinadores

  // addCoordinator(coordinator: StudentInterface) {
  //   return this.db.collection('students').doc(student.uid).set(student);
  // }

}
