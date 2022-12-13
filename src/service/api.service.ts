import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postCategory(data:any){
    return this.http.post<any>("http://localhost:3000/posts",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getCategory(){
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateCategory(data : any, id:any){
    console.log(data);
    return this.http.put<any>("http://localhost:3000/posts/" +id,data) //http observable
    .pipe(map((res:any)=>{ //pipe tranforms the data rcvd from api and map creates an array
      return res;
    }))
  }
  deleteCategory(id : number){
    return this.http.delete<any>("http://localhost:3000/posts/" +id)
    .pipe(map((res:any)=>{
      return res;
    }))
  } 
}
