import fs from "node:fs";
import path from "node:path";
import { globby } from "globby";
import fm from "front-matter";
import { toString } from "mdast-util-to-string";
import { fromMarkdown } from "mdast-util-from-markdown";

export const convert_file = (baseDir, baseRegEx, fileName) => {
  const doc = fs.readFileSync(fileName, {
    encoding: "utf8",
  });

  const content = fm(doc);

  const mdast = fromMarkdown(content.body);

  const desc = [];
  for (const p of mdast.children.slice(1)) {
    if (p.type === "heading") break;
    const text = toString(p, { includeImageAlt: false });
    if (text.trim().length > 0) desc.push(text);
  }

  return {
    ...content.attributes,
    desc,
    src: path.posix.join(
      path.posix.basename(baseDir),
      fileName.replace(baseRegEx, "")
    ),
  };
};

/**
 * Export leaf areas (areas containing climbs)
 * @param baseDir
 */
export const to_jsonlines = async (contentDir, outputFile) => {
  // remove trailing slash
  const baseDir = contentDir.replace(/\/+$/g, "");

  // Get all leaf files, excluding dirs with only index.md
  const leafFiles = await globby([
    `${baseDir}/**/*.md`,
    `!${baseDir}/**/index.md`,
  ]);

  if (leafFiles.length === 0) {
    console.log("No files found");
    process.exit(0);
  }

  // Build a collection of leaf walls
  // 1. Remove file name from path
  // 2. Add to Set to remove duplicates
  const dirs = leafFiles.reduce((acc, curr) => {
    acc.add(path.dirname(curr));
    return acc;
  }, new Set());

  // de-dups
  const leafAreaPaths = [...dirs];

  // to make test deterministic
  leafAreaPaths.sort();

  fs.openSync(outputFile, "w");

  const baseRegEx = new RegExp(`^${baseDir}${path.sep}`, "g");
  leafAreaPaths.forEach((dir) => {
    const row = convert_file(baseDir, baseRegEx, dir + "/index.md");
    fs.appendFileSync(outputFile, JSON.stringify(row) + "\n");
  });

  console.log(`Records written: ${leafAreaPaths.length}`);
};
