const path = require('path');
//https://nodejs.org/api/path.html

module.exports = {
    // le fait de mettre seulement 'src/' sans préciser le nom du fichier .js permet de récupérer tous les fichiers js dans le dossier
    entry: path.resolve(__dirname, 'src/'),
    devtool: 'inline-source-map',
    resolve: {
        // on définit les différents types de fichier js qu'on utilise (.js, .ts ...)
        extensions: ['.js']
    },
    devServer:{
        // le fichier sera créé dans le dossier /dist lors du dev
        publicPath: '/dist/'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/')
    }
};