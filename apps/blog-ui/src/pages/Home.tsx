import { useEffect, useState } from "react";
import { PostCard, type PostSummary } from "../components/PostCard.tsx";

export function Home() {
  const [posts, setPosts] = useState<PostSummary[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((rows: Array<Omit<PostSummary, "publishedAt"> & { publishedAt: string }>) =>
        setPosts(rows.map((p) => ({ ...p, publishedAt: new Date(p.publishedAt) }))),
      );
  }, []);

  return (
    <main>
      <h1>The blog</h1>
      {posts.map((p) => <PostCard key={p.slug} post={p} />)}
    </main>
  );
}
