const path = require('path');

module.exports = {
    target: 'node',
    mode: 'production',
    module: {
        rules: [
          {
            test: /\.ts$/,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/,
            use: {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                compilerOptions: {
                  inlineSourceMap: true
                }
              }
            }
          }
        ]
      },
}