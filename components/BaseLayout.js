import { html } from "../lib/ui.js";

export function BaseLayout({
  slot = "",
  js = "test.js",
  css = "tabler.min.css",
  title = "",
}) {
  return html(
    `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    %%head%%
    <link rel="stylesheet" href="/%%css%%">
    <title>%%title%%</title>
</head>
<body style="overflow: hidden">
    
    %%slot%%
    <script src="%%js%%" defer></script>
</body>
</html>
`,
    { slot, js, css, title, head: "" }
  );
}
