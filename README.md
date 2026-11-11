# example-blog

A small blog laid out in piles, to show what [multipile](https://multipile.dev)
gives a pull request: the change shown pile by pile, the diagrams it touches,
and a review of it against what each pile is for. Open the
[pull requests](https://github.com/multipile/example-blog/pulls) to see one.

The blog itself is the pages readers see, the service that serves them posts,
the service that signs authors in, and the database they keep their data in.

| Pile | Path | What it is for |
| --- | --- | --- |
| `@blog` | `:/` | the repository as a whole |
| `@blog-ui` | `apps/blog-ui/` | the pages a reader sees |
| `@posts` | `services/posts/` | the API the pages read posts from |
| `@auth` | `services/auth/` | how an author proves who they are |
| `@db` | `db/` | the schema and its migrations |
| `@shared` | `packages/shared/` | the small types every part passes around |
| `@ci` | `.github/` | what runs on every pull request |
| `@piles` | `piles/` | the words the piles' links are written in |

Run `pile list` to see every pile with its headline. Each pile says why it
is one thing in its `.pile/intent.md`.

## Develop

```sh
npm install
npm run dev --workspace apps/blog-ui
```

## Pull requests

Every pull request gets two comments, each edited on every push:

- `pile gitdiff` lists the piles it changed, each with its intent's headline,
  and shows the diagrams in `.pile/diagrams/` it touches: one it edits as an
  animation from before to after, one whose piles it changed with their
  boxes marked, and one it adds as it is. The action
  [`multipile/generate-pile-diff-action`](https://github.com/multipile/generate-pile-diff-action)
  posts it, and makes the prompt for the review.
- An agent reviews the change pile by pile, against each intent and the
  pull request's description. The review needs the repository secret
  `CLAUDE_CODE_OAUTH_TOKEN`, from `claude setup-token`, and is skipped
  without it.

## Licence

MIT. See [LICENSE](LICENSE).
