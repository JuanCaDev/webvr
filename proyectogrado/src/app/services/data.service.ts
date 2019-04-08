import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { StudentInterface } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    public db: AngularFirestore) { }

  getAllTeachers() {
    return this.db.collection('teachers').valueChanges();
  }

  getOneTeacher(uid: string) {
    return this.db.collection('teachers').doc(uid).valueChanges();
  }

  getAllStudents() {
    return this.db.collection('students').valueChanges();
  }

  getOneStudent(uid: string) {
    return this.db.collection('students').doc(uid).valueChanges();
  }

  addStudent(student: StudentInterface) {
    return this.db.collection('students').doc(student.uid).set(student);
  }

  updateStudent(student: StudentInterface) {

  }

  deleteStudent(id: string) {

  }

  toast(text: string) {
    M.toast({html: text});
  }

}
