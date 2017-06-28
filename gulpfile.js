var gulp = require('gulp');
var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass');
var outputPath = 'output';
var gulpCopy = require('gulp-copy');
var browserSync = require('browser-sync').create();


gulp.task("copy-components", function() {

    //   gulp.src("contents/styles/**.*")
    //       .pipe(gulp.dest('build/styles'));

    return gulp
        .src('bower_components/**/*')
        .pipe(gulp.dest(outputPath + "/bower_components"));
});


gulp.task('styleguide:generate', ["copy-components"], function (done) {
    setTimeout(function(){
    gulp.src('*.scss')

        .pipe(styleguide.generate({
            title: 'PE Style Guide',
            server: false,
            rootPath: outputPath,
            overviewPath: 'README.md',

            extraHead: [
                //   '<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" >',
                '<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>',
                '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" ></script>',
                '<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">',
                '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">',
            ],
            disableEncapsulation: true
        }))
        .pipe(gulp.dest(outputPath));
        done();
        });
});

gulp.task('images', ['elements'], function() {
    gulp.src(['images/**'])
        // Do image sprites, optimizations etc.
        //.pipe(gulp.dest('images'))
        .pipe(gulp.dest(outputPath + '/images'));
});



gulp.task('elements', ['js'], function () {
    gulp.src(['elements/**/*'])
        // Do image sprites, optimizations etc.
        //.pipe(gulp.dest('images'))
        .pipe(gulp.dest(outputPath + '/elements'));
});

gulp.task('js', function () {
    gulp.src(['js/**/*'])
        // Do image sprites, optimizations etc.
        //.pipe(gulp.dest('images'))
        .pipe(gulp.dest(outputPath + '/scripts'));
});



gulp.task('styleguide:applystyles', function() {
    return gulp.src('main.scss')
        .pipe(sass({
            errLogToConsole: true,
            //includePaths: ["bower_components"]
        }))
        .pipe(styleguide.applyStyles())
        .pipe(gulp.dest(outputPath));
});

gulp.task('watch', ['styleguide'], function() {
    // Start watching changes and update styleguide whenever changes are detected
    // Styleguide automatically detects existing server instance
    browserSync.init({
        // port: 8000,
        server: {
            index: "index.html",
            baseDir: './' + outputPath,
            //directory: true
        }
    });
    gulp.watch(['*.scss', 'elements/**/*.*', 'js/**/*.*'], ['styleguide']); //.on('change', browserSync.reload);
});

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles'], function() {

    if (browserSync) {
        browserSync.reload();
    }
});



gulp.task('dist', ['styleguide'], function() {

    gulp.src(['output/images/**/*'])
        // Do image sprites, optimizations etc.
        //.pipe(gulp.dest('images'))
        .pipe(gulp.dest('dist/images'));
    gulp.src(['output/elements/**/*'])
        // Do image sprites, optimizations etc.
        //.pipe(gulp.dest('images'))
        .pipe(gulp.dest('dist/elements'));

    gulp.src(['output/bower_components/bootstrap-sass/assets/fonts/bootstrap/**/*'])
        // Do image sprites, optimizations etc.
        //.pipe(gulp.dest('images'))
        .pipe(gulp.dest('dist/fonts'));

    gulp.src(['output/main.css'])
        // Do image sprites, optimizations etc.
        //.pipe(gulp.dest('images'))
        .pipe(gulp.dest('dist'));
          gulp.src(['output/scripts/style.js'])
        // Do image sprites, optimizations etc.
        //.pipe(gulp.dest('images'))
        .pipe(gulp.dest('dist'));
 
});

gulp.task('run', ['watch']);