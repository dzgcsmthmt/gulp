var gulp    = require('gulp');
var uglify  = require('gulp-uglify');
var minify = require('gulp-minify-css');
var md5 = require("gulp-md5-plus");
var del = require('del');

gulp.task('clean', function(){
	return del(['./dist/okay-mall-h5/app/','./manifest.json']);
});

gulp.task('html',function(){
	return gulp.src('./src/okay-mall-h5/app/*.html')
		.pipe(gulp.dest('./dist/okay-mall-h5/app/'))
});

gulp.task('css',['html'],function(){
	return gulp.src("./src/okay-mall-h5/app/**/*.css")
        .pipe(minify())
		.pipe(md5(8,'./dist/okay-mall-h5/app/*.html',{
			mappingFile: 'manifest.json',
			connector: '.'
		}))
		.pipe(gulp.dest("./dist/okay-mall-h5/app/"));
});


gulp.task('js',['html'],function(){
	return gulp.src("./src/okay-mall-h5/app/**/*.js")
        .pipe(uglify({mangle: true}))
		.pipe(md5(8,'./dist/okay-mall-h5/app/*.html',{
			mappingFile: 'manifest.json',
			connector: '.'
		}))
		.pipe(gulp.dest("./dist/okay-mall-h5/app/"));
});


gulp.task('img', ['css','js'],function() {
    gulp.src('./src/okay-mall-h5/app/**/*.{jpg,png,gif}')
        .pipe(md5(8 ,'./dist/okay-mall-h5/app/**/*.{html,css,js}',{
        	mappingFile: 'manifest.json',
        	connector: '.'
        }))
        .pipe(gulp.dest('./dist/okay-mall-h5/app/'));
});


gulp.task('default',['clean'],function(){
	gulp.start('html','css','js','img');
});
