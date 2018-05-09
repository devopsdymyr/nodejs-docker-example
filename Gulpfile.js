var gulp = require('gulp');
var zip = require('gulp-zip');
var del = require('del');
var install = require('gulp-install');
var runSequence = require('run-sequence');
// AWS libs
var config = require("./etc/aws.js");
var AWS = require('aws-sdk');
var awsBeanstalk = require("node-aws-beanstalk");

var beanstalk = new AWS.ElasticBeanstalk({
    region: config.region,
    accessKeyId: 'accessKeyId' in config ? config.accessKeyId : '',
    secretAccessKey: 'secretAccessKey' in config ? config.secretAccessKey : ''
  });

gulp.task('clean', function() {
  return del(['./dist', './dist.zip']);
});

gulp.task('js', function() {
  return gulp.src('src/**/*')
    .pipe(gulp.dest('dist/'));
});

gulp.task('node-mods', function() {
  return gulp.src('./package.json')
    .pipe(gulp.dest('dist/'))
    .pipe(install({production: true}));
});

gulp.task('zip', function() {
  return gulp.src(['dist/**/*', 'Dockerfile', 'package.json'])
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('upload', function(callback) {
  awsBeanstalk.deploy('./dist.zip', config, callback, console.log);
});

// update task can be used to update the configured environment
gulp.task('update', function(callback) {
  awsBeanstalk.update(config, callback);
});

gulp.task('deploy', function(callback) {
  return runSequence(
    ['clean'],
    ['js', 'node-mods'],
    ['zip'],
    ['update'],
    ['upload'],
    callback
  );
});
