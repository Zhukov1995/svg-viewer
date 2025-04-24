module.exports = {
    input: 'src/core.js',
    output: [{
        file: 'build/bundle_cjs.js',
        format: 'cjs'
    },
    {
        file: 'build/bundle_es.js',
        format: 'es'
    }]
}