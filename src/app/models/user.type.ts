export interface UserApi {
    id?: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}
export interface UsersList<T> {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: T;
}

// created user class to transform API data. Data transformer layer
export class User {
    id: number;

    // email
    email: string;

    // first_name
    firstName: string;

    // last_name
    lastName: string;

    // avatar
    avatar: string;

    // initialize value with API data
    constructor(employee: UserApi) {
        this.id = employee.id;
        this.email = employee.email;
        this.firstName = employee.first_name;
        this.lastName = employee.last_name;
        this.avatar = employee.avatar;
    }

}
