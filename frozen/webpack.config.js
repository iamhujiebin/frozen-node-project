const path = require('path');

module.exports = {
    mode: "development",
    entry: path.join(__dirname, "FrontProject", "src", "main.js"),
    output: {
        path: path.join(__dirname, "public"),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: 'html-loader'
            }
        ]
    }
}