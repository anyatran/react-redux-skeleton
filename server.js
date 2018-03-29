const config = require('./config/webpack.config.dev');
const path = require('path');
const port = (process.env.PORT || 3000);
const request = require('request');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const server = new WebpackDevServer(webpack(config), {
  historyApiFallback: true,
  publicPath: config.output.publicPath,
  disableHostCheck: true,
  hot: true,
  setup: function(app) {

    app.get('/events', (req, res) => {
      const options = {
        url: 'https://api.github.com/repos/rails/rails/pulls',
        headers: {
          'User-Agent': 'anyatran'
        }
      }
      request.get(options, (err, response, body) => {
        res.send(body);
      });
    });
  }
});
server.listen(port, function (err, result) {
  if (err) {
    console.log(err)
  }
  console.log(`Listening at http://localhost:${port}`)
});
