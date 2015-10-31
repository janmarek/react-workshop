import mocha from 'gulp-mocha';
import expect from 'expect2';

export default (gulp, paths) => {
    return () => {
        global.expect = expect;

        return gulp.src(paths, {read: false})
            .pipe(mocha({
                reporter: 'spec',
            }));
    };
};
