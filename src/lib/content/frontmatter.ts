export interface ParsedFrontmatter {
  data: Record<string, string | string[] | boolean>;
  content: string;
}

const LIST_FIELDS = new Set(["keywords", "tags", "relatedSlugs"]);
const BOOLEAN_FIELDS = new Set(["featured", "draft"]);

export function parseFrontmatter(raw: string): ParsedFrontmatter {
  const trimmed = raw.replace(/^\uFEFF/, "");
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(trimmed);

  if (!match) {
    return { data: {}, content: trimmed.trim() };
  }

  const [, frontmatterBlock, body] = match;
  const data: Record<string, string | string[] | boolean> = {};

  const lines = frontmatterBlock.split(/\r?\n/);
  let currentKey: string | null = null;
  let currentList: string[] | null = null;

  for (const line of lines) {
    const listItemMatch = /^\s*-\s+(.*)$/.exec(line);
    if (listItemMatch && currentKey && currentList) {
      currentList.push(stripQuotes(listItemMatch[1].trim()));
      continue;
    }

    const kvMatch = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
    if (!kvMatch) continue;

    const [, key, rawValue] = kvMatch;
    currentKey = key;
    currentList = null;

    if (rawValue.trim() === "") {
      if (LIST_FIELDS.has(key)) {
        currentList = [];
        data[key] = currentList;
      } else {
        data[key] = "";
      }
      continue;
    }

    if (LIST_FIELDS.has(key)) {
      data[key] = rawValue
        .split(",")
        .map((v) => stripQuotes(v.trim()))
        .filter(Boolean);
    } else if (BOOLEAN_FIELDS.has(key)) {
      data[key] = rawValue.trim().toLowerCase() === "true";
    } else {
      data[key] = stripQuotes(rawValue.trim());
    }
  }

  return { data, content: body.trim() };
}

function stripQuotes(value: string): string {
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  return value;
}
