'use strict';

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import browserify from 'gulp-browserify';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import concat from 'gulp-concat';
import sass from 'gulp-sass';

gulp.task('css', () => {
	gulp.src(['src/scss/main.scss'])
	.pipe(plumber({
		errorHandler: function (error) {
		console.log(error.message);
		this.emit('end');
	}}))
	.pipe(sass())
	.pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
	.pipe(concat('main.built.css'))
	.pipe(gulp.dest('css/'))
});

gulp.task('js', () => {
	return gulp.src('src/js/main.js')
	.pipe(plumber({
		errorHandler: function (error) {
		console.log(error.message);
		this.emit('end');
	}}))
	.pipe(browserify({
		insertGlobals : false
	}))
	.pipe(concat('main.built.js'))
	.pipe(gulp.dest('js/'))
});

gulp.task('head', () => {
	return gulp.src('src/js/head.js')
	.pipe(plumber({
		errorHandler: function (error) {
		console.log(error.message);
		this.emit('end');
	}}))
	.pipe(browserify({
		insertGlobals : false
	}))
	.pipe(concat('head.built.js'))
	.pipe(gulp.dest('js/'))
});

gulp.task('default', () => {
	gulp.watch("src/scss/**/*.scss", ['css']);
	gulp.watch("src/js/**/*.js", ['js', 'head']);
});

gulp.task('all', ['css', 'js', 'head']);