import { promises } from 'fs';
import path from 'path';

export interface Post {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  path: string;
  featured: boolean;
}

export async function getAllPosts(): Promise<Post[]> {
  const filepath = path.join(process.cwd(), 'data', 'posts.json');
  return promises
    .readFile(filepath, 'utf-8')
    .then<Post[]>(JSON.parse)
    .then((data) => data.sort((a, b) => (a.date > b.date ? -1 : 1)));
}

export async function getPost(id: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.id === id);
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.featured);
}
