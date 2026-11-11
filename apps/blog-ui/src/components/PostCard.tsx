import { Link } from "react-router-dom";
import { formatPostDate } from "../format/date.ts";

export interface PostSummary {
  slug: string;
  title: string;
  author: string;
  tags: string[];
  publishedAt: Date;
}

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <article className="post-card">
      <h2>
        <Link to={`/posts/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="byline">
        {post.author} · <time dateTime={post.publishedAt.toISOString()}>{formatPostDate(post.publishedAt)}</time>
      </p>
      <ul className="tags">
        {post.tags.map((t) => (
          <li key={t}><Link to={`/tags/${t}`}>#{t}</Link></li>
        ))}
      </ul>
    </article>
  );
}
