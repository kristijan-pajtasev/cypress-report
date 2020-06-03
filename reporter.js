const fs = require('fs');
const results = {}

function MyReporter(runner, options) {
    // mocha.reporters.Base.call(this, runner);
    var passes = 0;
    var failures = 0;

    if(fs.existsSync('./results.json')) fs.unlinkSync('./results.json')

    const addPassTest = (test, namespace, resultsObject) => {
        // todo implement pass test
        if(namespace.length > 0) {
            const firstNamespace = namespace[0];
            if(!resultsObject[firstNamespace]) {
                resultsObject[firstNamespace] = {
                    title: firstNamespace,
                    fullTitle: test.fullTitle(),
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
            results.pass = results.pass ? results.pass + 1 : 1;
            resultsObject.tests.push({
                title: test.title,
                fullTitle: test.fullTitle(),
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
                    fullTitle: test.fullTitle(),
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
            results.fail = results.fail ? results.fail + 1 : 1;
            resultsObject.tests.push({
                title: test.title,
                fullTitle: test.fullTitle(),
                passed: false,
                message: errorMessage
            })
        }
    }

    const getTestNamespace = test => {
        const testNamespace = [];
        let parent = test.parent;
        while(parent) {
            if(parent.title === "" && !!parent.file) testNamespace.push(parent.file.replace("cypress\\integration\\", ""));
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
        fs.writeFileSync('./results.json', JSON.stringify(results));
    });
}
module.exports = MyReporter;