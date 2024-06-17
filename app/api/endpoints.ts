

namespace Endpoints {
    export const baseUrl = 'https://todo-app-gcp.uc.r.appspot.com';
    const taskBase = `/tasks`;
    const authBase = `/auth`;

    // Authentication
    export const login = `${authBase}/login`;
    export const logout = `${authBase}/logout`;
    export const register = `${authBase}/register`;
    export const refresh = `${authBase}/refresh`;
    export const validateToken = `${authBase}/validate-token`;


    // Tasks
    export const taskGetAll = `${taskBase}/all`;
    export const taskGet = (id: string) => `${taskBase}/${id}`;
    export const taskAdd = `${taskBase}/add`;
    export const taskUpdate = `${taskBase}/update`;
    export const taskDelete = (id: string) => `${taskBase}/${id}`;
}

export default Endpoints;
