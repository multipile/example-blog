import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostCard, type PostSummary } from "../components/PostCard.tsx";

export function Tag() {
  const { tag = "" } = useParams();
  const [posts, setPosts] = useState<PostSummary[]>([]);

  useEffect(() => {
    fetch(`/api/posts?tag=${encodeURIComponent(tag)}`)
      .then((r) => r.json())
      .then((rows: Array<Omit<PostSummary, "publishedAt"> & { publishedAt: string }>) =>
        setPosts(rows.map((p) => ({ ...p, publishedAt: new Date(p.publishedAt) }))),
      );
  }, [tag]);

  return (
    <main>
      <h1>Posts tagged #{tag}</h1>
      {posts.map((p) => <PostCard key={p.slug} post={p} />)}
    </main>
  );
}
