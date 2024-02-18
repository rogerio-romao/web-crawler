const htmlString1 = `
  <html>
  <body>
  <a href="/google">Google</a>
  <a href="/github">GitHub</a>
  <a href="/microsoft">Microsoft</a>
  </body>
  </html>
`;

const htmlString2 = `
  <a href="https://www.google.com">Google</a>
  <a href="https://www.github.com">GitHub</a>
  <a href="https://www.microsoft.com">Microsoft</a>
  <a href="https://www.apple.com">Apple</a>
  <a href="https://www.amazon.com">Amazon</a>
`;

const htmlString3 = `
  <html>
  <body>
  <div>no links here</div>
  </body>
  </html>
`;

module.exports = {
    htmlString1,
    htmlString2,
    htmlString3,
};
