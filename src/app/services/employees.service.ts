import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Employee, EmployeeApi } from '../models/employee.type';

interface EmployeeApiResponse<T> {
  status: string;
  data?: T;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<EmployeeApiResponse<Array<EmployeeApi>>>(`${environment.apiUrl}/employees`).pipe(
      map(res => (res.data.map(employee => (new Employee(employee)))))
    );
  }

  createEmployee(employee: EmployeeApi): Observable<Employee> {
    return this.http.post<EmployeeApiResponse<EmployeeApi>>(`${environment.apiUrl}/create`, employee).pipe(
      map(res => (new Employee(res.data)))
    );
  }

  getEmployee(employeeId: number): Observable<Employee> {
    return this.http.get<EmployeeApiResponse<EmployeeApi>>(`${environment.apiUrl}/employee/${employeeId}`).pipe(
      map(res => (new Employee(res.data)))
    );
  }

  updateEmployee(employeeId: number, employee: EmployeeApi): Observable<Employee> {
    return this.http.put<EmployeeApiResponse<EmployeeApi>>(`${environment.apiUrl}/update/${employeeId}`, employee).pipe(
      map(res => (new Employee(res.data)))
    );
  }

  deleteEmployee(employeeId: number): Observable<EmployeeApiResponse<any>> {
    return this.http.delete<EmployeeApiResponse<any>>(`${environment.apiUrl}/delete/${employeeId}`);
  }
}
