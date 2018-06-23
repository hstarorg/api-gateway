const gulp = require('gulp');
const devServer = require('gulp-develop-server');

gulp.task('serve', done => {
  devServer.listen({ path: './src/index.js' }, err => {
    if (err) {
      console.error(err);
    }
    done();
  });
});

gulp.task('restart', done => {
  devServer.restart(err => {
    if (err) {
      console.error(err);
    }
    done();
  });
});

gulp.task('watch', () => {
  return gulp.watch(['./src/**/*', './mock/**/*'], { delay: 1000 }, gulp.series('restart'));
});

gulp.task('dev', gulp.series('serve', 'watch'));
