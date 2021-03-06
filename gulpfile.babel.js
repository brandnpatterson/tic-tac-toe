import gulp       from 'gulp';
import del        from 'del';
import htmlmin    from 'gulp-htmlmin';
import sync       from 'browser-sync';
import webpack    from 'webpack-stream';

var reload = sync.reload;

gulp.task('clean', del.bind(null, ['index.html', 'public/js/bundle.js'], {read: false}));

gulp.task('default', ['html', 'server', 'watch']);

gulp.task('html', () => {
  return gulp.src('src/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./'))
});

gulp.task('server', ['scripts'], () => {
  sync({
    notify: false,
    server: {
      baseDir: './'
    },
    port: 8888
  });
});

gulp.task('scripts', function() {
  return gulp.src(['src/js/index.js'])
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('public/js'));
});

gulp.task('watch', () => {
  gulp.watch('src/js/**/*', ['scripts', reload]);
  gulp.watch('src/index.html', ['html', reload]);
  gulp.watch('src/style.css', reload);
});
