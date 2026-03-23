import fs from "fs";

const path = "src/components/_body.txt";
let s = fs.readFileSync(path, "utf8");

s = s.replace(/style="([^"]+)"/g, (_, css) => {
  const parts = css
    .split(";")
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      const idx = p.indexOf(":");
      const k = p.slice(0, idx).trim();
      const v = p.slice(idx + 1).trim();
      const key = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      return `${key}: '${v.replace(/'/g, "\\'")}'`;
    });
  return `style={{ ${parts.join(", ")} }}`;
});

fs.writeFileSync(path, s);
console.log("styles fixed");
