import { Elysia, t } from 'elysia';
import { index, show, store, update, destroy } from './handlers';

const postRoutes = new Elysia({ prefix: '/posts' })
    .get('/', () => index())
    .get('/:id', ({ params: { id } }) => show(id), {
        params: t.Object({
            id: t.Numeric(),
        }),
    })
    .post('/', ({ body }) => store(body), {
        body: t.Object({
            title: t.String({
                minLength: 3,
                maxLength: 50,
            }),
            content: t.String({
                minLength: 3,
                maxLength: 50,
            }),
        }),
    })
    .patch('/:id', ({ params: { id }, body }) => update(id, body), {
        params: t.Object({
            id: t.Numeric(),
        }),
        body: t.Object(
            {
                title: t.Optional(
                    t.String({
                        minLength: 3,
                        maxLength: 50,
                    })
                ),
                content: t.Optional(
                    t.String({
                        minLength: 3,
                        maxLength: 50,
                    })
                ),
            },
            {
                minProperties: 1,
            }
        ),
    })
    .delete('/', ({ body }) => destroy(body), {
        body: t.Object({
            id: t.Numeric(),
        }),
    });

export default postRoutes;
