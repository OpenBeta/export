import expect from "expect";
import { toMatchSnapshot } from "expect-mocha-snapshot";
import os from "os"
import fs from "fs";
import path from "path";

import { to_jsonlines } from "../src/export.mjs";

expect.extend({ toMatchSnapshot });

describe("End to end test", function () {
  it("Export test", async function () {
    const outDir = fs.mkdtempSync(path.posix.join("output", "test-"), {
      recursive: true,
    });
    const outfile = path.posix.join(outDir, "test.jsonlines");

    await to_jsonlines("examples", outfile);

    expect(fs.readFileSync(outfile).toString("utf-8")).toMatchSnapshot(this);
  });
});
