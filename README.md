# Sunup to Supper

A personal food planner: breakfast, lunch and dinner dishes with full recipes, set over a scroll-driven film of a New York penthouse kitchen moving from sunrise to night.

- Scrolling scrubs through the film frame by frame (`app.js`), with a clock and colour grade that follow the time of day.
- Dishes and recipes live in `dishes.js`; edit that file to change the menu.
- Frames are packed into `pack*.webp` files indexed by `frames-index.js`.

Static site, no build step. Deploy with `npx vercel --prod`.
