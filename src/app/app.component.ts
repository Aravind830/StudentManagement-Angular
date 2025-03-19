import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { student } from './Interface/student.interface';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  formValitity: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]),
    age: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    course: new FormControl('', Validators.required),
    entrolledDate: new FormControl('', Validators.required)
  });

  constructor(private stuService: ApiServiceService, private rout: Router) {
    // this.students = stuService.getStudents();
  }
  ngOnInit(): void {
    this.rout.navigate(['/login']);
  }

  stu: student = {
    id: 0,
    name: '',
    age: 0,
    email: '',
    course: '',
    entrolledDate: null
  }

  students: student[] = [];
  isStu = false;
  selected: string = '';
  isValid = false;
  isName = true;
  searchName = false;
  isSearch = false;
  isNameRe=true;
  isCourRe=true;
  isLogged=false;


  title = 'Angular-Integration';

  onAct(act: string) {
    this.selected = act;
    if (act == "add" || act == "edit" || act == "remove" || act == "search" || act == "Asc" || act=="Desc") {
      this.isStu = true;
      if (act == "Asc") {
        this.students.sort((i, j) => i.age - j.age);
      }else{
        this.students.sort((i, j) => j.age - i.age);
      }
      console.log(this.students);
    }
  }

  onAdd() {
    this.isValid = true;
    if (this.formValitity.valid) {
      this.stuService.create(this.formValitity.value).subscribe(data=>{
        if(data)
          console.log("Successfully Added");
        else
        console.log("Not Added");
      });
      this.rout.navigate(['/student']);
      this.isStu = false;
      this.formValitity.reset();
      this.isValid = false;
    }
  }

  onUpdate(stu: student) {
    this.isValid = true;
    if (this.formValitity.valid) {
      this.stuService.updateById(stu).subscribe(data=>{
        if(data)
          console.log("Updated");
        else
        console.log("not Updated");
      });
      this.rout.navigate(['/student']);
      this.isStu = false;
      this.formValitity.reset();
      this.isValid = false;
    }
  }

  //open Form base Remove
  onDelt(stu: student) {
    debugger
    this.stuService.removeById(stu.id);
    this.rout.navigate(['/student']);
    this.isStu = false;
    this.stu.id = 0;
  }

  onSearch(stu: student) {
    const s = this.students.find(i => i.id == stu.id)
    console.log(s);
    if (s)
      this.formValitity.patchValue(s);
  }

  s: student[] = [];
  studs: student[] = [];

  isAvailable = false;
  onName(stu: student) {
    // this.isName = true;
    this.isCourRe=true;    
    if (stu.name != null && stu.name) {
      console.log("Search Name", stu.name);
      const s = this.students.filter(i => i.name === stu.name);
      console.log(s);
      this.studs = s;
      this.searchName = true;
      this.isName = false;
      this.formValitity.reset();
    } else {
      this.isName = true;
      // this.isSearch = true;
      this.isNameRe=false;
    }
    console.log("Form valid",this.formValitity.invalid)
  }

  onCourse(stu: student) {
    console.log(this.formValitity.value);
    this.isName = false;
    this.isSearch = !this.isSearch;
    this.isNameRe=true;
    debugger
    if (stu.course != null && stu.course) {
      const s = this.students.filter(i => i.course === stu.course);
      console.log(s);
      this.studs = s;
      this.searchName = true;
      this.formValitity.reset();
    } else {
      this.isSearch = true;
      this.isCourRe=false;
    }
  }

  onBack() {
    this.rout.navigate(['/student']);
    this.isStu = false;
  }

  onBackToSearch() {
    debugger
    this.isStu = true;
    this.selected = "search";
    this.searchName=!this.searchName;
    this.isName=!this.isName;
  }

  onLog(islog:boolean){
    this.isLogged=islog;
  }
}
