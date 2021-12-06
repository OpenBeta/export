import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";

import { to_jsonlines } from "./export.mjs";

const sections = [
  {
    header: "Exporter tool",
    content: "Export OpenBeta content catalog to raw text",
  },
  {
    header: "Options",
    optionList: [
      {
        name: "basedir",
        typeLabel: "{underline directory}",
        description: "Path to content dir",
        alias: "d",
      },
      {
        name: "outfile",
        typeLabel: "{underline filename}",
        description: "Output filename",
        alias: "o",
      },
      {
        name: "help",
        type: Boolean,
        description: "Print this usage guide.",
      },
    ],
  },
];

// main script starts
var options = {};
try {
  options = commandLineArgs(sections[1].optionList);

  if (options.help || !(options.basedir && options.outfile)) {
    throw new Error("Show help");
  }
} catch (e) {
  const usage = commandLineUsage(sections);
  console.log(usage);
  process.exit(0);
}

const { basedir, outfile } = options;

await to_jsonlines(basedir, outfile);
