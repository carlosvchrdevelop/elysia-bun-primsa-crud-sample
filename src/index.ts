import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import postRoutes from './routes/posts';

const app = new Elysia();

app.use(
    cors({
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    })
)
    .use(swagger())
    .group('/api', (app) => app.use(postRoutes))
    .listen(process.env.PORT || 3001);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
