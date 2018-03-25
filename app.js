const config = require('./webpack.config');
const path = require('path');
const port = (process.env.PORT || 3000);
const request = require('request');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const server = new WebpackDevServer(webpack(config), {
  historyApiFallback: true,
  disableHostCheck: true,
  publicPath: config.output.publicPath,
  hot: true,
  setup: function(app) {
    app.get('/instagram', (req, res) => {
      request.get('https://www.instagram.com/anya_tran/?__a=1', (err, response, body) => {
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
