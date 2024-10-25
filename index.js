import path from "node:path";
import { readFileSync, writeFileSync } from "node:fs";
import minifier from "html-minifier-terser";

/** @type {import('.').default} */
export default function (insideAdapter, options) {
  const name = "sveltekit-html-minifier";
  return {
    name: insideAdapter ? `${name}, ${insideAdapter.name}` : name,
    async adapt(builder) {
      if (insideAdapter) {
        await insideAdapter.adapt(builder);
      }

      /** @type {import('.').Options} */
      const mergedOptions = {
        pages: "build",
        ...options,
        minifierOptions: {
          removeAttributeQuotes: true,
          minifyJS: true,
          minifyCSS: true,
          useShortDoctype: true,
          ...options?.minifierOptions,
        },
      };

      builder.prerendered.pages.forEach(async (page) => {
        const htmlPath = path.join(mergedOptions.pages, page.file);

        builder.log.info(`Minify HTML ${htmlPath}`);

        // read HTML file
        const html = readFileSync(htmlPath).toString();

        // minify HTML
        const minHTML = await minifier.minify(
          html,
          mergedOptions.minifierOptions
        );

        // write minified HTML
        await writeFileSync(htmlPath, minHTML);
      });
    },
  };
}
