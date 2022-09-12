let gulp = require("gulp"),
  sass = require("gulp-sass")(require('node-sass')),
  sourcemaps = require("gulp-sourcemaps"),
  cleanCss = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  uglify = require("gulp-uglify"),
  terser = require('gulp-terser');

const paths = {
  scss: {
    src: "./src/scss/main.scss",
    dest: "./css",
    watch: "./src/scss/**/*.scss",
  },
  js: {
    src: "./src/js/static/*.js",
    bundleSrc: "./src/js/app.js",
    dest: "./js",
    bundleDest: "./js/",
  },
};

// Compile sass into CSS & auto-inject into browsers
function styles() {
  return gulp
    .src([paths.scss.src])
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(
      postcss([
        autoprefixer({
          browsers: [
            "Chrome >= 35",
            "Firefox >= 38",
            "Edge >= 12",
            "Explorer >= 10",
            "iOS >= 8",
            "Safari >= 8",
            "Android 2.3",
            "Android >= 4",
            "Opera >= 12",
          ],
        }),
      ])
    )
    .pipe(cleanCss())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write('../css'))
    .pipe(gulp.dest(paths.scss.dest))
}

// Move the javascript files into our js folder

function jsStatic() {
  return gulp
    .src(paths.js.src)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('../js'))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.js.dest));
}

function js() {
  return  gulp
          .src(paths.js.bundleSrc)
          .pipe(sourcemaps.init())
          .pipe(terser())
          .pipe(sourcemaps.write('../js'))
          .pipe(rename({ suffix: ".min" }))
          .pipe(gulp.dest(paths.js.bundleDest))
}

function watch() {
  gulp.watch([paths.scss.watch], styles);
  gulp.watch([paths.js.bundleSrc], js);
  gulp.watch([paths.js.src], jsStatic);
}

exports.watch = watch;
exports.styles = styles;
exports.js = js;
exports.jsStatic = jsStatic;

exports.default = watch;
