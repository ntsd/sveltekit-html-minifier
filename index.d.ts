import { Adapter } from "@sveltejs/kit";
import { type Options as minifierOptions } from "html-minifier-terser";

interface Options {
  pages?: string;
  minifierOptions?: minifierOptions;
}

export default function adapter(
  insideAdapter?: Adapter,
  options?: Options
): Adapter;
