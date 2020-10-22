const { runLoaders } = require('loader-runner');
const path = require('path');
const fs = require('fs');

runLoaders({
    resource: [
        path.resolve('./index.css')
    ],
    // String: Absolute path to the resource (optionally including query string)

    loaders: [
        {
            loader: path.resolve('./loader.js'),
            options: {
                images: []
            }
        }
    ],
    // String[]: Absolute paths to the loaders (optionally including query string)
    // {loader, options}[]: Absolute paths to the loaders with options object

    context: { minimize: true },
    // Additional loader context which is used as base context

    readResource: fs.readFile.bind(fs)
    // A function to read the resource
    // Must have signature function(path, function(err, buffer))

}, function(err, result) {
    err ? console.log(err) : console.log(result);
});
