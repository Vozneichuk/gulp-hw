const gulp = require('gulp');
const sass = require("gulp-sass")
sass.compiler = require('node-sass');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const babel = require('gulp-babel');


gulp.task("html", () => {   
  return gulp.src("./src/html/*.html")      
  .pipe(gulp.dest("./dist/html")) 
}) 

gulp.task("scss", () =>{
  return gulp.src("./src/scss/**/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions'], { 
      cascade: true }))
    .pipe(gulp.dest("./dist/css"))

})

gulp.task("images", () => {
  return gulp.src("./src/img/**/*")
  .pipe(cache(imagemin()))
  .pipe(gulp.dest("./dist/img"))
})

gulp.task("js", () =>{
  return gulp.src("./src/js/**/*.js")
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest("./dist/js"))
})

gulp.task("watch", () => {                           
  gulp.watch("./src/*.html" , gulp.series("html"));
  gulp.watch("./src/scss/*.scss" , gulp.series("scss"));
  gulp.watch("./src/js/**/*.js", gulp.series("js"));
  gulp.watch("./src/img/**/*", gulp.series("images"))
  return;
})

gulp.task("build", gulp.series("html","js","scss","images"))
gulp.task("default", gulp.series("build","watch")) 
