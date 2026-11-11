## Piles

This repository declares piles: subtrees that each have a `.pile/` directory
and say in its `intent.md` why they are one thing. Work in it with the
`pile` command. Start every session with `pile guide`, and read what it
prints whole: it says how to read the repository by pile, and lists the
workflows and pages the binary carries. `pile doctor` must exit 0 before a
commit. `pile` makes no commit: commit with git, as this repository's own
rules say.

## Working in this repository

A small TypeScript blog in npm workspaces. Each workspace is a pile, and so
is the database's folder.

- Read a pile's intent before you change it, and keep it true in the same
  commit.
- A change that touches a pile it was not asked to touch says why in its
  description.
- Run `npm test` before a commit.
