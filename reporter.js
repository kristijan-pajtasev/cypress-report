
// var mocha = require('mocha');

console.log("reporter cusom one EEEEEEEEEEEEEEEEEEEEEEE")

function MyReporter(runner) {
    console.log("reporter created")
    // mocha.reporters.Base.call(this, runner);
    const results = {}
    var passes = 0;
    var failures = 0;

    const addPassTest = (test, namespace) => {
        // todo implement pass test
    }

    const failTest = (test, namespace, errorMessage) => {
        // todo implement pass test
    }

    const getTestNamespace = test => {
        const testNamespace = [];
        let parent = test.parent;
        while(parent) {
            if(parent.title === "" && !!parent.file) testNamespace.push(parent.file)
            else testNamespace.push(parent.title);
            parent = parent.parent;
        }
        return testNamespace.reverse();
    }

    runner.on('pass', function(test) {
        passes++;
        console.log('testNamespace: ', getTestNamespace(test));
        console.log('pass: %s', test.parent.title);
        // console.log('pass: %s', test.fullTitle()); //
    });

    runner.on('fail', function(test, err) {
        failures++;
        console.log('testNamespace: ', getTestNamespace(test));
        console.log('fail: %s -- error: %s', test.fullTitle(), err.message);
    });

    runner.on('end', function(args) {
        console.log('end: %d/%d', passes, passes + failures);
    });
}
module.exports = MyReporter;