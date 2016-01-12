/* eslint no-var: 0 */

require('babel-register');

var path = require('path');
var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var del = require('del');
var createTestTask = require('./js/test/createTestTask').default;
var createWebpackBuildTask = require('./js/webpack/createBuildTask').default;
var createWebpackWatchTask = require('./js/webpack/createWatchTask').default;
var createWebpackRunDevServerTask = require('./js/webpack/createRunDevServerTask').default;

var config = {
    production: false,
};

var paths = {
    devServerPort: 4000,
    webpackRoot: __dirname,
    documentRoot: path.join(__dirname, 'public'),
    assetsDir: './public/assets',
    publicPath: '/assets/',
    scripts: {
        src: ['js/**/*.js'],
        index: './js/index.js',
        outputName: 'bundle.js',
    },
    styles: {
        outputName: 'theme.css',
    },
};

gulp.task('clean', function (done) {
    del([paths.assetsDir]).then(function () {
        done();
    });
});

gulp.task('webpack', ['clean'], createWebpackBuildTask(gulpUtil, paths, (config.production ? 'production' : 'dev')));
gulp.task('watch', createWebpackWatchTask(gulpUtil, paths));
gulp.task('dev-server', ['clean'], createWebpackRunDevServerTask(paths));
gulp.task('test', createTestTask(gulp, 'js/**/__tests__/*Test.js'));

gulp.task('default', ['webpack']);
