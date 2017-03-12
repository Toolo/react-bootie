module.exports = {
    stripPrefix: 'build/',
    staticFileGlobs: [
        'build/*.html',
        'build/manifest.json',
        'build/static/**/!(*map*)'
    ],
    dontCacheBustUrlsMatching: /\.\w{8}\./,
    swFilePath: 'build/service-worker.js',
    runtimeCaching: [{
        urlPattern: /^https:\/\/1qkzhufsm1\.execute-api\.us-east-1\.amazonaws\.com\/dev\/events/,
        handler: 'networkFirst'
    }]
};
