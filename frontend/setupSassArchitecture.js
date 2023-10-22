const fs = require("fs");
const path = require("path");

// Set the base directory to the directory where the script is located
const baseDirectory = __dirname;

// Define the folder and file structure
const structure = [
  "assets/styles/css/",
  "assets/styles/css/index.css",
  "assets/styles/sass/",
  "assets/styles/sass/abstracts/",
  "assets/styles/sass/abstracts/_functions.scss",
  "assets/styles/sass/abstracts/_mixins.scss",
  "assets/styles/sass/abstracts/_variables.scss",
  "assets/styles/sass/base/",
  "assets/styles/sass/base/_base.scss",
  "assets/styles/sass/base/_typography.scss",
  "assets/styles/sass/components/",
  "assets/styles/sass/components/_buttons.scss",
  "assets/styles/sass/components/_forms.scss",
  "assets/styles/sass/layout/",
  "assets/styles/sass/layout/_layout.scss",
  "assets/styles/sass/pages/",
  "assets/styles/sass/pages/_home.scss",
  "assets/styles/sass/themes/",
  "assets/styles/sass/vendors/",
  "assets/styles/main.scss",
  "assets/img/",
  "assets/img/icons/",
  "components/",
  "components/SignUpForm.jsx",
  "components/templates/",
  "components/templates/ButtonTemplate.jsx",
];

// Function to create the folder and file structure
function createStructure(baseDirectory, structure) {
  structure.forEach((item) => {
    const fullPath = path.join(baseDirectory, item);
    if (item.endsWith("/")) {
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`Directory created: ${fullPath}`);
      }
    } else {
      fs.writeFileSync(fullPath, "");
      console.log(`File created: ${fullPath}`);
    }
  });
}

// Function to create specific content for the partials
function createPartialsContent(baseDirectory) {
  const variablesContent = `
// ################### BOOTSTRAP OVERRIDE ###################
$spacer: 2rem !default;
$spacer-multiplier-0: 0.25;
$spacer-multiplier-1: 0.5;
$spacer-multiplier-2: 0.75;
$spacer-multiplier-3: 1.5;
$spacer-multiplier-4: 2.25;
$spacer-multiplier-5: 3;
$spacer-multiplier-6: 6;
$spacer-multiplier-auto: 1;
$spacers: (
  0: $spacer * $spacer-multiplier-0,
  1: $spacer * $spacer-multiplier-1,
  2: $spacer * $spacer-multiplier-2,
  3: $spacer * $spacer-multiplier-3,
  4: $spacer * $spacer-multiplier-4,
  5: $spacer * $spacer-multiplier-5,
  6: $spacer * $spacer-multiplier-6,
  auto: auto,
);
:root {
  --default-font-size: 1.4rem;
}
    `;
  fs.writeFileSync(
    path.join(baseDirectory, "assets/styles/sass/abstracts/_variables.scss"),
    variablesContent
  );

  const baseContent = `
// RESET
*,
::after,
::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}
html {
  font-size: 62.5%;
  scroll-behavior: smooth;
}
body,
button,
input {
  box-sizing: border-box;
}
::selection {
  /* TBD */
}
    `;
  fs.writeFileSync(
    path.join(baseDirectory, "assets/styles/sass/base/_base.scss"),
    baseContent
  );

  const typographyContent = `
*,
*:before,
*:after {
  font-family: Noto Sans;
  font-size: var(--default-font-size);
  font-weight: 400;
  line-height: 1.5;
  color: var(--grayscale-80);
}
input,
button {
  font-family: inherit;
  font-size: inherit;
}
    `;
  fs.writeFileSync(
    path.join(baseDirectory, "assets/styles/sass/base/_typography.scss"),
    typographyContent
  );
}

// Create the folder and file structure
createStructure(baseDirectory, structure);

// Create specific content for the partials
createPartialsContent(baseDirectory);

// Define the import statements for main.scss
const importStatements = [
  '@import "sass/abstracts/variables";',
  '@import "../../../node_modules/bootstrap/scss/bootstrap";',
  '@import "sass/abstracts/functions";',
  '@import "sass/abstracts/mixins";',
  '@import "sass/base/base";',
  '@import "sass/base/typography";',
  '@import "sass/components/buttons";',
  '@import "sass/components/forms";',
  '@import "sass/layout/layout";',
  '@import "sass/pages/home";',
].join("\n");

// Write the import statements to main.scss
const mainScssPath = path.join(baseDirectory, "assets/styles/main.scss");
fs.writeFileSync(mainScssPath, importStatements);
console.log(`Import statements written to ${mainScssPath}`);

console.log("Folder and file structure created successfully!");
