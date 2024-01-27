# About this Project

This website gathers near real-time data about available apartments in Berlin, straight from the real estate management websites themselves. While it's near impossible to find affordable housing, we try declutter and present the listings as soon as they go online. We do this by scraping berlins estate management sites at least once every hour.
**"But aren't there a lot of websites to scrape?"** you might ask. Well yes.. and that's why we need your help:

## How to contribute

There are too many real estate managements for the two of us to go through by ourselves. Your help is greatly appreciated if you are able to build scrapers for new sites. Here's a guide on how to get started:

### Our Tech Stack

Before thinking about helping it might be useful to see if you can imagine working with the tools we use. The higher up the list, the more prominent - so it would be useful if you have some experience in at least the first two. Here's a list:

- Vue.js / Nuxt
- TypeScript
- Tailwind
- [Zod](https://zod.dev/) (for Schema Validation)
- [Drizzle](https://orm.drizzle.team/) (a Typescript [ORM](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping))
- [trpc](https://trpc.io/) (for End-to-End type safety)

### Get set up

1.  Clone the repository
2.  Open a terminal in the project directory and type `npm install` to download all necessary dependencies

Run this project locally using `npm run dev`

### Writing a scraper

Go into **data/propertyManagements/** and then pick any of the existing scrapers to use as a guideline.
When you are happy with your result just make a pull request. Then we'll look over it one more time to see if everything works as expected and take it live :)

### Drizzle Commands

After a schema update, run these commands to update the local db:

```
npx drizzle-kit generate:sqlite
npx drizzle-kit push:sqlite
```

##### Project Info

This project was created as part of the "Web Technologien" module at [HTW-Berlin](https://www.htw-berlin.de/).
