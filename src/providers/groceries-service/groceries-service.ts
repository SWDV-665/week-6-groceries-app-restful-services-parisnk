import {catchError, map} from 'rxjs/Operators';

import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable }  from 'rxjs/Observable';
import {Subject} from 'rxjs';

/*
  Generated class for the GroceriesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroceriesServiceProvider {

items: any = [];
dataChanged$: Observable<boolean>;
private dataChangeSubject: Subject<boolean>;
baseURL = 'http://localhost:8080';

constructor(public http : HttpClient) {
    console.log('Hello GroceriesServiceProvider Provider');
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
   }
//getting items
getItems() : Observable <object[]> {
  return this.http.get(this.baseURL + '/api/groceries/').pipe(
   map(this.extractData),
   catchError(this.handleError)
   );
  }
private extractData(res: Response){
  let body = res;
  return body || {};
}
private handleError(error: Response | any){
  let errMsg : string;
  if(error instanceof Response){
    const err = error || ''; 
  errMsg = `${error.status} - ${error.statusText || ''} ${err}`
  }
  else{
  errMsg = error.message ? error.message : error.ToString();
  }
  console.error(errMsg);
  return Observable.throw(errMsg);
}
//removing items
  removeItem(id){
   console.log("#### Remove Item - id = ", id);
   this.http.delete(this.baseURL + "/api/groceries/" + id).subscribe(res => {
    this.items = res;
    this.dataChangeSubject.next(true);
   });
  }
  //adding items
  addItem(item) {
    this.http.post(this.baseURL + "/api/groceries/", item).subscribe(res => {
    this.items = res;
    this.dataChangeSubject.next(true);
  });
}
//editing items
  editItem(item, index) {
   console.log("Editing item = ", item);
   this.http.put(this.baseURL + "/api/groceries/" + item._id, item).subscribe(res => {
   this.items = res;
    this.dataChangeSubject.next(true);
  });
  }
}