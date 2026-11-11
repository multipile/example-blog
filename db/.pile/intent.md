The shape of the blog's data in Postgres, and every step that brought it to that shape.

What belongs here is the schema, written as migrations that are applied in order and never edited once they have run, the script that applies them, and the seed data to develop against. Queries do not belong here: each part that reads or writes the data keeps its own.

Read this pile to find out what the blog stores and how a database is brought up to date. Change it when what the blog stores changes.
