import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Student } from 'src/app/models/student';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {
  student: Student;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // const id = this.route.snapshot.params.id;
    // this.getDetails(id);
  }

  getDetails(id: string) {
    // this.dataService.getOneStudent(id).subscribe(student => {
    //   this.student = student;
    //   console.log('Student view', student);
    // });
  }

  deleteStudent(id: string) {
    // this.dataService.deleteStudent(id);
    // this.router.navigate(['']);
  }

}
