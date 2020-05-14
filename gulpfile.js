const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const webp = require('gulp-webp');
const include = require('gulp-include');
const htmlmin = require('gulp-htmlmin');

const project_folder = 'dist';
const source_folder = "src";

const path = {
	build: {
		html: project_folder + "/",
		css: project_folder + "/css/",
		js: project_folder + "/js/",
		img: project_folder + "/img/",
		fonts: project_folder + "/fonts/",
	},
	src: {
		html: source_folder + "/*.html",
		css: source_folder + "/scss/style.scss",
		js: source_folder + "/js/script.js",
		img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
		fonts: source_folder + "/fonts/*.ttf",
	},
	watch: {
		html: source_folder + "/*.html",
		css: source_folder + "/scss/**/*.scss",
		js: source_folder + "/js/**/*.js",
		img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}"
	},
	clean: "./" + project_folder + "/"
}

function html() {
		return gulp.src(path.src.html)
					.pipe(gulp.dest(path.build.html))
					.pipe(htmlmin({ collapseWhitespace: true, removeComments: true}))
					.pipe(rename({
						extname: '.min.html'
					}))
					.pipe(gulp.dest(path.build.html))
					.pipe(browserSync.stream())
}

function css() {
		return gulp.src(path.src.css)
					.pipe(scss({
						outputStyle: "expanded"
					}))
					.pipe(autoprefixer({
							overrideBrowserslist: ["last 5 versions"],
							cascade: true
					}))
					.pipe(gulp.dest(path.build.css))
					.pipe(cleanCss({
						level: 2
					}))
					.pipe(rename({
						extname: '.min.css'
					}))
					.pipe(gulp.dest(path.build.css))
					.pipe(browserSync.stream())
}

function js() {
		return gulp.src(path.src.js)
					.pipe(include())
					.pipe(gulp.dest(path.build.js))
					.pipe(include())
					.pipe(babel({
            presets: ['@babel/env']
        	}))
        	.pipe(uglify({
        		toplevel: true
        	}))
					.pipe(rename({
						extname: '.min.js'
					}))
					.pipe(gulp.dest(path.build.js))
					.pipe(browserSync.stream())
}

function img() {
		return gulp.src(path.src.img)
					.pipe(webp({
							quality: 70
					}))
					.pipe(gulp.dest(path.build.img))
					.pipe(gulp.src(path.src.img))
					.pipe(imagemin([
				    imagemin.gifsicle({interlaced: true}),
				    imagemin.mozjpeg({quality: 75, progressive: true}),
				    imagemin.optipng({optimizationLevel: 5}),
				    imagemin.svgo({
				      plugins: [
		            {removeViewBox: true},
		            {cleanupIDs: false}
				      ]
				    })
					]))
					.pipe(gulp.dest(path.build.img))
					.pipe(browserSync.stream())
}

function fonts() {
	gulp.src(path.src.fonts)
		.pipe(ttf2woff())
		.pipe(gulp.dest(path.build.fonts));
	return gulp.src(path.src.fonts)
		.pipe(ttf2woff2())
		.pipe(gulp.dest(path.build.fonts));
};

function watch() {
	browserSync.init({
		server: {
			baseDir: "./" + project_folder + "/"
		},
		port: 3000,
		notify: false
	})
	gulp.watch([path.watch.html], html).on('change', browserSync.reload);
	gulp.watch([path.watch.css], css).on('change', browserSync.reload);
	gulp.watch([path.watch.js], js);
	// gulp.watch([path.watch.img], img);
}

function clean(params) {
	return del(path.clean);
}

gulp.task('watch', gulp.series(watch));
gulp.task('img', img);
gulp.task('build', gulp.series(clean, gulp.parallel(html,css,js,img,fonts)));
