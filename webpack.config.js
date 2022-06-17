const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = (_env, argv) => {
  let devMode = argv.mode === 'development' ? true : false;
  console.log(devMode ? 'We\'re in Dev Mode.' : 'We\'re in Prod Mode.');

  return {
    entry: {
      index: ["./src/index.tsx"]
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'app.bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            },
          ],
        },
        {
          test: /\.tsx?$/,
          use: [{
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }]
        },
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        title: "BookStores",
        template: "./src/index.html",
        filename: "./index.html",
        chunksSortMode: "none",
        inlineSource: ".(css)$"
      })
    ],
    resolve: {
      modules: [
        path.resolve(__dirname, "/src"),
        path.resolve(__dirname, "node_modules/")
      ],
      extensions: [".ts", ".tsx", ".js", ".scss", ".css"]
    }
  }
}