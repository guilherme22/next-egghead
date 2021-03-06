import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import Head from 'next/head'
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 0 2rem;
`;

const Main = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  `;

const BlogTitle = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  text-align: center;
  `

const List = styled.ul`
  list-style: square;
`;

const ListItem = styled.li`
  padding: 10px;
  text-transform: capitalize;
  margin: 40px 0;
  cursor: pointer;
  color: #252525;
  &:hover {
    background: #f0f0f0;
  }
`;

const PostTitle = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const title: string = 'Next.js + TypeScript';

export default function Home({ posts } : InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(posts);
  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta name="description" content="title" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <BlogTitle> {title} </BlogTitle>
        <Link href="/about">
          <a>About this blog</a>
        </Link>
        <List>
          {posts.map((post) => (
            <Link key={Math.random()} href="posts/[id]" as={`/posts/${post.id}`}>
              <ListItem key={post.id}>
                <PostTitle>{post.title}</PostTitle>
              </ListItem>
            </Link>
          ))}
        </List>
      </Main>
    </Container>
  )
}

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const getStaticProps = async () => {
  const res = await fetch('http://jsonplaceholder.typicode.com/posts');

  const posts: Post[] = await res.json();
  return {
    props: {
      posts,
    }
  }
  
}
