import path from 'path';
import fs from 'fs';
// import matter from 'matter';
import matter from 'gray-matter';

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
