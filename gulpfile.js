const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");

gulp.task("serve", function() {
    browserSync.init({
        proxy: "http://woocommerce.fl-dm.loc/",
        host: "woocommerce.fl-dm.loc",
        open: "external",
    });
    gulp.watch("**/*.php").on("change", function() {
        browserSync.reload();
    });
});

gulp.task("styles", function() {
    return gulp
        .src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(rename({ suffix: ".min", prefix: "" }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(gulp.dest("css/"))
        .pipe(browserSync.stream());
});

gulp.task("watch", function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel("styles")).on("change", function() {
        browserSync.reload();
    });
});

gulp.task("default", gulp.parallel("watch", "serve", "styles"));