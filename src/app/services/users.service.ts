import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User, UserApi, UsersApiResponse, UsersList } from '../models/user.type';



const USER_URL = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersListSubject = new Subject<UsersList<Array<User>>>();

  constructor(private http: HttpClient) { }

  getUsers(pageNumber = 1, search: string = null): void {
    let params = new HttpParams().set('page', String(pageNumber));

    if (search) {
      params = params.set('search', search);
    }

    this.http.get<UsersList<Array<UserApi>>>(USER_URL, { params }).pipe(
      map(res => ({
        ...res,
        data: res.data.map(employee => (new User(employee))),
      }))
    ).subscribe(res => this.usersListSubject.next(res));
  }

  createUser(user: UserApi): Observable<User> {
    return this.http.post<UserApi>(USER_URL, user).pipe(
      map(res => (new User(res)))
    );
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<UserApi>(`${USER_URL}/${userId}`).pipe(
      map(res => (new User(res)))
    );
  }

  updateUser(userId: number, user: UserApi): Observable<User> {
    return this.http.put<UserApi>(`${USER_URL}/${userId}`, user).pipe(
      map(res => (new User(res)))
    );
  }

  deleteUser(userId: number): Observable<UsersList<any>> {
    return this.http.delete<UsersList<any>>(`${USER_URL}/${userId}`);
  }
}
