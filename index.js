const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url + ".html"
  );

  fs.readFile(filePath, (err, content) => {
    if (err) {
      fs.readFile(
        // Read the error page
        path.join(__dirname, "public", "404.html"),
        (err, fourOFour) => {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(fourOFour, "utf8");
        }
      );
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content, "utf8");
    }
  });
});

server.listen(8080, () => console.log("Server running"));
