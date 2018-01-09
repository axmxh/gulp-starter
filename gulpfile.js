/*=============================================
=            Gulp Starter by @dope            =
=            Edited by @axmxh                 =
=============================================*/

/**
*
* The packages we are using
* Not using gulp-load-plugins as it is nice to see whats here.
*
**/
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync');
var prefix       = require('gulp-autoprefixer');
var plumber      = require('gulp-plumber');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');
var rename       = require("gulp-rename");
var imagemin     = require("gulp-imagemin");
var pngquant     = require('imagemin-pngquant');

/**
*
* Styles
* - Compile
* - Compress/Minify
* - Catch errors (gulp-plumber)
* - Autoprefixer
*
**/
gulp.task('sass', function(cb) {
  gulp.src('src/sass/*.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'Android 2', 'Firefox ESR'))
  .pipe(plumber())
  .pipe(gulp.dest('.tmp/css'))
  .on('end', cb);

});

//concatnaite css files
gulp.task('css', ['sass'], function(){
    gulp.src([
        '.tmp/css/*.css',
    ])
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('dist/css'));
});



/**
*
* BrowserSync.io
* - Watch CSS, JS & HTML for changes
* - View project at: localhost:3000
*
**/
gulp.task('browser-sync', function() {
  browserSync.init(['src/css/*.css', 'src/js/**/*.js', 'index.html'], {
    server: {
      baseDir: './'
    }
  });
});


/**
*
* Javascript
* - Uglify
*
**/
gulp.task('scripts', function(cb) {
  gulp.src('src/js/*.js')
  .pipe(rename({
    //dirname: "min",
    suffix: ".min",
  }))
  .pipe(gulp.dest('.tmp/js'))
  .on('end', cb);
});


//concatnaite js files
gulp.task('js', ['scripts'], function(){
    gulp.src([
        'node_modules/jquery/dist/jquery.js',
        '.tmp/js/*.js'      
    ])
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('dist/js'));
});

/**
*
* Images
* - Compress them!
*
**/
gulp.task('images', function () {
  return gulp.src('src/images/*')
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest('dist/images'));
});


/**
*
* Default task
* - Runs sass, browser-sync, scripts and image tasks
* - Watchs for file changes for images, scripts and sass/css
*
**/
gulp.task('default', ['css', 'js', 'images', 'browser-sync'], function () {
  gulp.watch('src/sass/*.scss', ['css']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/images/*', ['images']);
});
