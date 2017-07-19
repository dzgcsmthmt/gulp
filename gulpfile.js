var gulp    = require('gulp');
var uglify  = require('gulp-uglify');
var minify = require('gulp-minify-css');
var clean = require('gulp-clean');              //清空文件夹


gulp.task('clean',function(){　　　　　　　　　　　　
    return gulp.src('dist',{ read : false})       //src的第二个参数的{read:false}，是不读取文件,加快程序。
        .pipe(clean());
})

gulp.task('html',function(){
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'))
})

gulp.task('img',function(){
    return gulp.src('src/**/*.png')
        .pipe(gulp.dest('dist'))
})

gulp.task('css',function(cb){
    return gulp.src('src/**/*.css')
        .pipe(minify())
        .pipe(gulp.dest('dist'))
})

gulp.task('js',function(){
    return gulp.src('src/**/*.js')
        .pipe(uglify({mangle: true}))
        .pipe(gulp.dest('dist'))
})


gulp.task('default',['html','img','css','js'])
