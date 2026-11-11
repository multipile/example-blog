import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatPostDate } from "../format/date.ts";

interface FullPost {
  title: string;
  author: string;
  body: string;
  publishedAt: Date;
}

export function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState<FullPost | null>(null);

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then((r) => r.json())
      .then((p) => setPost({ ...p, publishedAt: new Date(p.publishedAt) }));
  }, [slug]);

  if (!post) return <main aria-busy="true" />;
  return (
    <main>
      <h1>{post.title}</h1>
      <p className="byline">
        {post.author} · <time dateTime={post.publishedAt.toISOString()}>{formatPostDate(post.publishedAt)}</time>
      </p>
      <div className="body">{post.body}</div>
    </main>
  );
}
