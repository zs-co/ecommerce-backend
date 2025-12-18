import { Router } from 'express';
import UserRoutes from './user/user.routes.js';
import AuthRoutes from './auth/auth.routes.js';

const appRoutes = [
    { path: '/user', route: UserRoutes},
    { path: '/auth', route: AuthRoutes},
]; 

const rootRouter = Router(); 

appRoutes.forEach(({ path, route}) => rootRouter.use(path, route))

export default rootRouter; 