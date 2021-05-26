import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User, UserApi } from '../models/employee.type';

interface EmployeeApiResponse<T> {
  status: string;
  data?: T;
}

const USER_URL = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<User[]> {
    return this.http.get<EmployeeApiResponse<Array<UserApi>>>(USER_URL).pipe(
      map(res => (res.data.map(employee => (new User(employee)))))
    );
  }

  createEmployee(user: UserApi): Observable<User> {
    return this.http.post<EmployeeApiResponse<UserApi>>(USER_URL, user).pipe(
      map(res => (new User(res.data)))
    );
  }

  getEmployee(userId: number): Observable<User> {
    return this.http.get<EmployeeApiResponse<UserApi>>(`${USER_URL}/${userId}`).pipe(
      map(res => (new User(res.data)))
    );
  }

  updateEmployee(userId: number, user: UserApi): Observable<User> {
    return this.http.put<EmployeeApiResponse<UserApi>>(`${USER_URL}/${userId}`, user).pipe(
      map(res => (new User(res.data)))
    );
  }

  deleteEmployee(userId: number): Observable<EmployeeApiResponse<any>> {
    return this.http.delete<EmployeeApiResponse<any>>(`${USER_URL}/${userId}`);
  }
}
