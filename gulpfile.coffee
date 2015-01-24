gulp = require('gulp')
gulpSequence = require('gulp-sequence')

gulp = require('gulp')
coffee = require('gulp-coffee')
gutil = require('gulp-util')
del = require('del')
notify = require('gulp-notify')
nodemon = require('gulp-nodemon')
replace = require('gulp-replace')
argv = require('yargs').argv
connect = require('gulp-connect')
open = require('gulp-open')
jade = require('gulp-jade')
supervisor = require( "gulp-supervisor" );

###
 * default task
###
gulp.task('default', gulpSequence(
  'clean'
  ['coffee', 'copy']
  ['serve', 'serve_watch']
  'open'
))

### Clean dist folder ###
gulp.task('clean', (callback) ->
  del(['dist/'], callback)
)

gulp.task('supervisor', ->
  supervisor('./dist/index.js')
)


### compile coffee script ###
gulp.task('coffee', ->
  gulp.src('./src/**/*.coffee')
  .pipe(coffee({bare: true}).on('error', gutil.log))
  .pipe(gulp.dest('./dist/'))
)

### copy some project file ###
gulp.task('copy', ->
  gulp.src([
    './src/**/*.*'
    '!./src/**/*.coffee'
    './src/public/verder/**/*'
  ])
  .pipe(gulp.dest('./dist/'))
)

### 处理jade,无用任务 ###
gulp.task('jade', ->
  gulp.src('./src/views/*.jade')
  .pipe(jade({client: true}))
  .pipe(gulp.dest('./dist/'))
)



###
 * start server
 * do not using nodemon to watch file.
###

nodemon_instance = undefined

gulp.task('serve', ->
  if not nodemon_instance
    nodemon_instance = nodemon({
      script: 'dist/index.js'
      ext: 'none'
    })
    .on('restart', ->
      console.log("restart server......................")
    )
  else
    nodemon_instance.emit("restart")
)

### 监视文件变更 ###
gulp.task('serve_watch', ->
  gulp.watch('src/**/*.*', ['restart'])
)

gulp.task('open', ->
    options = {
      url: 'http://localhost:8888/manage'
    }
    gulp.src('./dist/index.js')
    .pipe(open('', options))
)

###
 * task when files change
###
gulp.task('restart', gulpSequence(
  'clean'
  ['coffee', 'copy']
  ['serve']
))