var purgecss = require("@fullhuman/postcss-purgecss");
var tailwind = require("tailwindcss");

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

module.exports = {
  plugins: [
    tailwind(),
    process.env.NODE_ENV == "production"
      ? purgecss({
          content: ["./index.html", "./js/**/*.js"],
          extractors: [
            {
              extractor: TailwindExtractor,
              extensions: ["html", "js"]
            }
          ]
        })
      : () => []
  ]
};
