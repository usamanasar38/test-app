export interface EmployeeApi {
    id?: number;
    employee_name: string;
    employee_salary: number;
    employee_age: number;
    profile_image: string;
}

export class Employee {
    id: number;

    // employee_name
    employeeName: string;

    // employee_salary
    employeeSalary: number;

    // employee_age
    employeeAge: number;

    // profile_image
    profileImage: string;

    constructor(employee: EmployeeApi) {
        this.id = employee.id;
        this.employeeName = employee.employee_name;
        this.employeeSalary = employee.employee_salary;
        this.employeeAge = employee.employee_age;
        this.profileImage = employee.profile_image;
    }

}
