import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDir = path.join(process.cwd(), 'posts');

export type Post = {
    id: string;
    title: string;
    date: string;
    thumbnail: string;
}

export const getPosts = (): Post[] => {
    const fileNames = fs.readdirSync(postsDir);
    const allPosts = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDir, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf-8');
        const matterRes = matter(fileContents);

        return { id, ...matterRes.data as Omit<Post, 'id'> };
    });

    return allPosts;
}

type Params = {
    id: string;
}


export const getAllPostIds = (): { params: Params }[] => {
    const fileNames = fs.readdirSync(postsDir);
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    });
}


export const getPostById = async (id: string) => {
    const fullPath = path.join(postsDir, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, 'utf-8');
    const matterRes = matter(fileContent);
    const blogContent = await remark()
        .use(html)
        .process(matterRes.content);

    const blogContentHTMl = blogContent.toString();

    return {
        id,
        blogContentHTMl,
        ...matterRes.data,
    };
}
