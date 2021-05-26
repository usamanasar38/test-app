import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User, UserApi, UsersApiResponse, UsersList } from '../models/user.type';



const USER_URL = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<UsersList<Array<User>>> {
    return this.http.get<UsersList<Array<UserApi>>>(USER_URL).pipe(
      map(res => ({
        ...res,
        data: res.data.map(employee => (new User(employee))),
      }))
    );
  }

  createEmployee(user: UserApi): Observable<User> {
    return this.http.post<UserApi>(USER_URL, user).pipe(
      map(res => (new User(res)))
    );
  }

  getEmployee(userId: number): Observable<User> {
    return this.http.get<UserApi>(`${USER_URL}/${userId}`).pipe(
      map(res => (new User(res)))
    );
  }

  updateEmployee(userId: number, user: UserApi): Observable<User> {
    return this.http.put<User>(`${USER_URL}/${userId}`, user);
  }

  deleteEmployee(userId: number): Observable<UsersList<any>> {
    return this.http.delete<UsersList<any>>(`${USER_URL}/${userId}`);
  }
}
