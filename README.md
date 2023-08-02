# Sveltekit HTML Minifier

Sveltekit Adapter to Minify the preload HTML page in case using CSR/Preload by [html-minifier-terser](https://github.com/terser/html-minifier-terser).

## Installation

`npm i -D sveltekit-html-minifier`

## Usage

Add the adapter to your `svelte.config.js` file. Place your default adapter as the first parameter. This will run after the default adapter has finished rendering.

```js
import adapter from "@sveltejs/adapter-static";
import htmlMinifierAdaptor from "sveltekit-html-minifier";

export default {
  kit: {
    adapter: htmlMinifierAdaptor(adapter()),
  },
};
```

### Options

You can pass additional options to the adapter. For example

```js
import adapter from "@sveltejs/adapter-static";
import htmlMinifierAdaptor from "sveltekit-html-minifier";

export default {
  kit: {
    adapter: htmlMinifierAdaptor(
      adapter({
        pages: "build",
      }),
      {
        // your build path (same as adapter static pages)
        pages: "build",
        // custom html-minifier-terser options
        // https://github.com/terser/html-minifier-terser#options-quick-reference
        minifierOptions: {},
      }
    ),
  },
};
```

- `pages` (string): Specifies the build path. This should be the same as the adapter static pages.
- `minifierOptions` (object): Custom options for [html-minifier-terser](https://github.com/terser/html-minifier-terser#options-quick-reference).
