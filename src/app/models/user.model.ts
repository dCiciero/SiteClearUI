export interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    roles: string[],
    role: string,
    roleId: number,
    token: string
    department: string,
    workSation: string[]
}
