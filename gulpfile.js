var gulp          = require ('gulp'),
    uglify        = require ('gulp-uglify'),
    minify        = require ('gulp-minify-css'),
    connect       = require ('gulp-connect'),
    open          = require ('gulp-open'),
    exec = require('child_process').exec;


// HTML Task
function html(){
    return gulp.src('public/**/*.html')
      .on('error', console.error.bind(console))
      .pipe(gulp.dest('build'))
      .pipe(connect.reload());
};
gulp.task(html);

// Styles Task (Uglifies)
function styles (){
    return gulp.src('public/**/*.css')
      .pipe(minify())
      .on('error', console.error.bind(console))
      .pipe(gulp.dest('build'))
      .pipe(connect.reload());
};
gulp.task(styles);

// Scripts Task (Uglifies)
function scripts(){
    return gulp.src('public/**/*.js')
      .pipe(uglify())
      .on('error', console.error.bind(console))
      .pipe(gulp.dest('build'))
      .pipe(connect.reload());
};
gulp.task(scripts);

// Connect Task (connect to server and live reload)
function connectserver(){
    exec('node app.js', err => err);
};
gulp.task(connectserver);

// Watch Task (watches for changes)
function watch(cb){
    gulp.watch('public/*.html',  gulp.series('html'));
    gulp.watch('public/scripts/*.js', gulp.series('scripts'));
    gulp.watch('stylesheets/css/*.css', gulp.series('styles'));
    cb();
};
gulp.task(watch);

// Open Task (starts app automatically)
function openbrowser(){
  return gulp.src("public/index.html")
  .pipe(open("", {
    url: "http://localhost:3000",
    app: "Chrome"
  }));
};
gulp.task(openbrowser);


gulp.task('default', gulp.parallel('html', 'styles', 'scripts', 'connectserver', 'watch', 'openbrowser'));