export default {

    Url: 'https://todo-app-gcp.uc.r.appspot.com',

    Auth: {
        Login: '/auth/login',
        SignUp: '/auth/register'
    },

    Task: {
        Base: '/tasks',
        GetAll: '/all',
        Get: '/:id',
        Add: '/add',
        Update: '/update/:id',
        Delete: '/:id',
    },
} as const;