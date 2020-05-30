
// var mocha = require('mocha');

console.log("reporter cusom one EEEEEEEEEEEEEEEEEEEEEEE")

function MyReporter(runner) {
    console.log("reporter created")
    // mocha.reporters.Base.call(this, runner);
    const results = {}
    var passes = 0;
    var failures = 0;

    const addPassTest = (test, namespace, resultsObject) => {
        // todo implement pass test
        if(namespace.length > 0) {
            const firstNamespace = namespace[0];
            if(!resultsObject[firstNamespace]) {
                resultsObject[firstNamespace] = {
                    title: firstNamespace,
                    pass: 0,
                    fail: 0,
                    total: 0,
                    tests: []
                }
            }
            resultsObject[firstNamespace].pass ++;
            resultsObject[firstNamespace].total ++;
            addPassTest(test, namespace.slice(1), resultsObject[firstNamespace])
        } else {
            resultsObject.tests.push({
                title: test.title,
                passed: true
            })
        }
    }

    const addFailTest = (test, namespace, errorMessage, resultsObject) => {
        // todo implement pass test
        if(namespace.length > 0) {
            const firstNamespace = namespace[0];
            if(!resultsObject[firstNamespace]) {
                resultsObject[firstNamespace] = {
                    title: firstNamespace,
                    pass: 0,
                    fail: 0,
                    total: 0,
                    tests: []
                }
            }
            resultsObject[firstNamespace].fail ++;
            resultsObject[firstNamespace].total ++;
            addFailTest(test, namespace.slice(1), errorMessage, resultsObject[firstNamespace])
        } else {
            resultsObject.tests.push({
                title: test.title,
                passed: false,
                message: errorMessage
            })
        }
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
        addPassTest(test, getTestNamespace(test), results);
        console.log('testNamespace: ', getTestNamespace(test), results);
        console.log('pass: %s', test.parent.title);
        // console.log('pass: %s', test.fullTitle()); //
    });

    runner.on('fail', function(test, err) {
        failures++;
        addFailTest(test, getTestNamespace(test), err.message, results);
        console.log('testNamespace: ', getTestNamespace(test));
        console.log('fail: %s -- error: %s', test.fullTitle(), err.message);
    });

    runner.on('end', function(args) {
        console.log('end: %d/%d', passes, passes + failures);
        console.log('result object: ', results);
    });
}
module.exports = MyReporter;