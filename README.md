# how-long

This is a project for tracking duration since certain past events and until certain future events.

## Motivation

I created this project with one thing in mind: I wish to participate in 2024 Presidential Election in Indonesia. In order to do so, I need to be more "awake" of the stuff happening in Indonesia. Since my memory capacity is limited and I might forget stuff, I decided to create some kind of "diary" in the form of this project.

One of the flaws of election is that, candidates will do whatever they can to make the citizens choose them. There are 3 red flags (at least) for me personally:

1. Doing good things **only** during the campaign and not during the actual "work" (after getting elected).
2. Being unaware of people's plight when "spreading their wings", e.g. putting their name in a big advertisement space when people are still experiencing crisis from the pandemic.
3. Not giving credits to other people who work/worked for them.

These parameters above I will use to "filter" candidates and political parties. I will not measure by "yes" or "no", but perhaps a little bit more statistical, like "average bad things done per day" or "average time between bad things".

### Other use cases

There are other use cases for using this project, such as:

1. Tracking the last time you got a panic attack.
2. Tracking the last time you bought an expensive meal.
3. Tracking the last time you exercised.
4. Tracking the time until a certain date, e.g. wedding anniversary.

...and perhaps a lot more. Moreover, since this is deployed as a static site, of course you can also make it private. For example, in Netlify, you can [set Basic Authentication header](https://docs.netlify.com/visitor-access/password-protection/#selective-protection-with-basic-authentication) so users coming to your site need to provide the credentials first before being able to see the content. That way, your "diary" is secure and you can access them anytime, anywhere, so long as you have and/or remember your credentials.

## Development

### Prerequisites

1. [Yarn](https://yarnpkg.com/) Classic (v1)
2. [Node.js®](https://nodejs.org/) LTS (at least v14)

After that, on root project, do this to install the dependencies:

```bash
yarn
```

### Running the server

```bash
# Generate the collections from Markdown to JSON.
yarn c:g
# Run the server, which opens on port 3000.
yarn dev
```

Then, go to http://localhost:3000 to see the UI.

## How it works

This project is powered by [Astro](https://github.com/withastro/astro) and [Tailwind CSS](https://tailwindcss.com). There are 2 parts of this project:

1. [The application folder](packages/app). This contains the Tailwind setup, as well as the layouts and components.
2. [The scripts folder](packages/scripts). This contains the scripts for running and building the project.

When we do `yarn c:g` (alias for `yarn collections:generate`), we are transforming all the things inside [collections](collections) into a single JSON. This JSON contains all the collections, in which, each collection contains one or more events. Each event has a `description` field, which contains a HTML string. This HTML string will be transformed to a React element later during the server-side rendering (SSR).

## API Reference

Before going to the technical section, there are 2 terms that are used in this project: **collections** and **events**.

1. **Collections:** each collection contains one or more events. The purpose of a collection is only to "group" these events.
2. **Events:** an event is the "smallest" object in this project. Each event should have a title, date/time of occurrence, and description.

### Markdown

Let's take the [Test Collections](packages/scripts/src/collections/test-collections-md/arsenal) folder as an example. It has an `index.md` file, along with other Markdown files. Here is the content for `index.md`:

```yaml
---
title: Arsenal
---
```

Currently, this `index.md` file is only meant to give "name" to the title category. So, instead of having the "slug" as the title, we can have a proper "title cased name" that is free from hacky stuff. Other than `index.md`, each Markdown file represent a "collection of events". For example:

```
---
title: Last Won a Match
---

## Arsenal 2-0 Newcastle United

<!-- datetime: 2021-11-27T12:30:00.000Z -->

Arsenal won 2-0 against Newcastle United in a Premier League match as Bukayo Saka and Gabriel Martinelli scored.

## Arsenal 1-0 Norwich City

<!-- datetime: 2021-09-11T16:00:00.000Z -->

Arsenal won 1-0 against Norwich City in a Premier League match, with Pierre-Emerick Aubameyang scoring the only goal.
```

As usual, at the top, we have the frontmatter. This will be used to identify the "collection" name in the form of `title` field.

After the frontmatter, we will have these structure:

1. **Heading 2**: this will be the title of the event.
2. **ISO8601 date comment**: this will be the date of occurrence of the event.
3. **Description**: one or more paragraphs that describe how the event unfolds. All of the Markdown text here will be transformed to proper React elements during the build time.

### JSON

The data structure for the generated JSON can be seen in the [`json.ts`](packages/app/src/helpers/collections/json.ts) file.

```ts
export interface Collection {
  slug: string;
  expression?: 'since' | 'until';
  category: string;
  title: string;
  parentTitle: string;
  events: Array<{
    title: string;
    description: string;
    // This is ISO8601 string.
    datetime: string;
    meta: {
      description: string;
    };
  }>;
}

export interface CategorizedCollectionItem {
  title: string;
  slug: string;
  collections: Collection[];
}
```

All of the optional fields are generated during the build time (`yarn start`, `yarn dev`, and `yarn build`), whereas the required fields are generated during the generate time (`yarn c:g`).

## License

MIT
