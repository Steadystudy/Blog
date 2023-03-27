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

export type PostData = Post & { content: string; next: Post | null; prev: Post | null };

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

export async function getNonFeaturedPosts(): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => !post.featured);
}

export async function getPostData(fileName: string): Promise<PostData> {
  const posts = await getAllPosts();
  const idx = posts.map((post) => post.path).indexOf(fileName);
  const post = posts[idx];

  if (!post) {
    throw new Error(`${fileName}에 해당하는 포스트를 찾을 수 없음`);
  }
  const prev = idx < posts.length ? posts[idx + 1] : null;
  const next = idx > 0 ? posts[idx - 1] : null;
  const filepath = path.join(process.cwd(), 'data', 'posts', `${fileName}.md`);
  const content = await promises.readFile(filepath, 'utf-8');

  return { ...post, content, prev, next };
}
