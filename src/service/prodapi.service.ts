import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdapiService {

  constructor(private http: HttpClient) { }
  postProduct(data:any){
    return this.http.post<any>("http://localhost:3000/comments",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getProduct(){
    return this.http.get<any>("http://localhost:3000/comments")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateProduct(data : any, id:any){
    console.log(data);
    return this.http.put<any>("http://localhost:3000/comments/" +id,data) //http observable
    .pipe(map((res:any)=>{ //pipe tranforms the data rcvd from api and map creates an array
      return res;
    }))
  }
  deleteProduct(id : number){
    return this.http.delete<any>("http://localhost:3000/comments/" +id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
