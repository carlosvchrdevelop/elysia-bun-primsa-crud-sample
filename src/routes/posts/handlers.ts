import { NotFoundError } from 'elysia';
import db from '../../db';

export const index = async () => {
    try {
        return await db.post.findMany({ orderBy: { createdAt: 'asc' } });
    } catch (e: unknown) {
        console.log(`Error getting posts: ${e}`);
    }
};

export const show = async (id: number) => {
    try {
        const post = await db.post.findUnique({ where: { id } });

        if (!post) {
            throw new NotFoundError('Post not found');
        }

        return post;
    } catch (e: unknown) {
        console.log(`Error getting post: ${e}`);
    }
};

export const store = async (options: { title: string; content: string }) => {
    try {
        const { title, content } = options;
        return await db.post.create({ data: { title, content } });
    } catch (e: unknown) {
        console.log(`Error creating post: ${e}`);
    }
};

export const update = async (
    id: number,
    options: { title?: string; content?: string }
) => {
    try {
        const { title, content } = options;
        return await db.post.update({
            where: { id },
            data: {
                ...(title ? { title } : {}),
                ...(content ? { content } : {}),
            },
        });
    } catch (e: unknown) {
        console.log(`Error updating post: ${e}`);
    }
};

export const destroy = async (options: { id: number }) => {
    try {
        const { id } = options;
        return await db.post.delete({
            where: { id },
        });
    } catch (e: unknown) {
        console.log(`Error deleting post: ${e}`);
    }
};
