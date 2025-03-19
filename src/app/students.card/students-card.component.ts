import { Component, EventEmitter, Input, Output } from '@angular/core';
import { student } from '../Interface/student.interface';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-students-card',
  standalone: false,
  templateUrl: './students-card.component.html',
  styleUrl: './students-card.component.css'
})
export class StudentsCardComponent {
  addForm: any;

  constructor(private rout:Router,private serv:ApiServiceService){
    this.serv.getStudents().subscribe(data=>{
      this.studentss=data
    }
    );
  }

  studentss: student[]=[]
  isEdit=false;
  isDelt=false;
  isAdd=false;
  isDrop=false;
  isLogged=true;

 stu:student={
   id: 0,
   name: '',
   email: '',
   course: '',
   entrolledDate: null,
   age: 0
 };
  
  // @Output() added=new EventEmitter<any>()

  // onAdd(){
  //   this.added.emit()
  //  this.isAdd=true;
  // }
  // onEdit(stu:student){
  //   debugger
  //   this.rout.navigate(['/curd'])
  //   console.log("Edit Works.!");
  //   console.log("Data:",stu);
  //   // this.updateStu.id=this.stu.id;
  //   // this.updateStu.name=this.stu.name;
  //   // this.updateStu.email=this.stu.email;
  //   // this.updateStu.course=this.stu.course;
  //   // this.updateStu.entrolledDate=this.stu.entrolledDate;
  // }
  // onRemove(){
  //   this.isDelt=true;
  // }
  // onAdded(stu:student){
  //   this.serv.create(stu);
  //   this.isAdd=false;
  // }
  @Output() actStu=new EventEmitter<any>();

  onAction(act:string){
    this.rout.navigate(['/curd'])
    this.actStu.emit(act)
    console.log(act);
  }

  //Remove Student Based on Click (Remove)
  onRemove(stuId:number){
    if(window.confirm("Confirm to Remove?")){
    console.log(stuId);
    this.serv.removeById(stuId).subscribe(data=>{
      if(data)
        console.log("Removed");
      else
      console.log("Not Removed");
    });
    }
  }

  onDrop(){
    this.isDrop=!this.isDrop;
  }

  @Output() logg=new EventEmitter<boolean>()
  onExit(){
    if(window.confirm("Are Sure to Log out?")){
    this.rout.navigate(['/login']);
    this.isDelt=!this.isDelt;
    this.logg.emit(!this.isLogged);
    console.log(this.isLogged);
    }
  }
}
