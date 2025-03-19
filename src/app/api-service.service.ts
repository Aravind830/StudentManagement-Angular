import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { student } from './Interface/student.interface';
import { login } from './Interface/login.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  Students:student[]=[
    {
      id: 1,
      name: 'Aravind',
      age:23,
      email: 'aravind@gmail.com',
      course: 'Java',
      entrolledDate:new Date('2025-12-11')
    },
    {
      id: 2,
      name: 'Arvi',
      age:20,
      email: 'aravi@gmail.com',
      course: 'Python',
      entrolledDate:new Date('2025-12-10')
    },
    {
      id: 3,
      name: 'Vijay',
      age:30,
      email: 'vj@gmail.com',
      course: 'Python',
      entrolledDate:new Date('2024-11-10')
    },
    {
      id: 3,
      name: 'Ajith',
      age:28,
      email: 'ak@gmail.com',
      course: 'Java',
      entrolledDate:new Date('2023-12-10')
    },
    {
      id: 4,
      name: 'Surya',
      age:25,
      email: 'sr@gmail.com',
      course: 'GoLang',
      entrolledDate:new Date('2021-12-10')
    }
  ]

  stu:student={
    id: 0,
    name: '',
    age:0,
    email: '',
    course: '',
    entrolledDate: null
  }

  constructor(private http:HttpClient){}

  private apiUrl="http://localhost:3000/users";

  private apiUrlStu="http://localhost:3001/students";

  //From Students
  getStudents():Observable<student[]>{
    return this.http.get<student[]>(this.apiUrlStu);
  }

  removeById(stuId:number):Observable<number>{
    debugger
    return this.http.delete<number>(`${this.apiUrlStu}/${stuId}`);
    // const i=this.Students.findIndex(ind=>ind.id===Number(stuId))
    // if(i!=-1){
    //   this.Students.splice(i,1);
    //   console.log("removed",stuId);
    // }
  }

  updateById(stu:student):Observable<student>{
    return this.http.put<student>(this.apiUrlStu,stu);
    // const s=this.Students.find(i=>i.id===stu.id);
    // if(s){
    //   s.id=stu.id;
    //   s.name=stu.name;
    //   s.email=stu.email;
    //   s.course=stu.course;
    //   s.entrolledDate=stu.entrolledDate;
    // }
  }

  create(stu:student):Observable<student>{
    debugger
    return this.http.post<student>(this.apiUrlStu,stu);
  }

  //Login Register
  register(user:login):Observable<any>{
    return this.http.post<any>(this.apiUrl,user);
  }

  //Get All from Credential Json
  getAll():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }
}
