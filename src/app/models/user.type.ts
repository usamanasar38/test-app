export interface UserApi {
    id?: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface UsersApiResponse<T> {
    data?: T;
}
export interface UsersList<T> extends UsersApiResponse<T> {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
}

export class User {
    id: number;

    // email
    email: string;

    // first_name
    firstName: string;

    // last_name
    lastName: string;

    // profile_image
    avatar: string;

    constructor(employee: UserApi) {
        this.id = employee.id;
        this.email = employee.email;
        this.firstName = employee.first_name;
        this.lastName = employee.last_name;
        this.avatar = employee.avatar;
    }

}
