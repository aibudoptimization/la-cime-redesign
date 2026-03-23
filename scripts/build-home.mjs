import fs from "fs";

let body = fs.readFileSync("src/components/_body.txt", "utf8");
body = body.replace(/<!--[\s\S]*?-->\n?/g, "");
body = body.replace(/referrerpolicy=/g, "referrerPolicy=");
body = body.replace(/tabindex="-1"/g, "tabIndex={-1}");
body = body.replace(
  /(<iframe[\s\S]*?)>\s*<\/iframe>/,
  "$1 />"
);

const out = `export default function LaCimeHome() {
  return (
    <>
${body}
    </>
  );
}
`;

fs.writeFileSync("src/components/LaCimeHome.tsx", out);
console.log("LaCimeHome.tsx written");
