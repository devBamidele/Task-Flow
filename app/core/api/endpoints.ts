

namespace Endpoints {
    export const baseUrl = 'https://todo-app-gcp.uc.r.appspot.com';
    const taskBase = `${baseUrl}/tasks`;

    // Authentication
    export const login = `/auth/login`;
    export const signup = `${baseUrl}/auth/register`;

    // Tasks
    export const taskGetAll = `${taskBase}/all`;
    export const taskGet = (id: string) => `${taskBase}/${id}`;
    export const taskAdd = `${taskBase}/add`;
    export const taskUpdate = (id: string) => `${taskBase}/update/${id}`;
    export const taskDelete = (id: string) => `${taskBase}/${id}`;
}

export default Endpoints;
