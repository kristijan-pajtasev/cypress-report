const fs = require('fs');
const fsExtra = require('fs-extra');
const results = {}

function MyReporter(runner, options) {
    const directory = process.argv[process.argv.indexOf("--cwd") + 1].replace(/\\/g, "/");
    let passes = 0;
    let failures = 0;

    const reportDir = options.reporterOptions.reportDir || "src";
    const reportName = "results.json";
    const configName = "config.json";
    const staticFilesDomain = options.reporterOptions.staticFilesUrl || "";
    const isLocalDeployment = options.reporterOptions.isLocalDeployment || false;

    if (fs.existsSync(reportDir)) fs.rmdirSync(reportDir, {recursive: true});
    fsExtra.copySync("build", reportDir)

    if (fs.existsSync(`${directory}/${reportDir}/${reportName}`)) fs.unlinkSync(`${directory}/${reportDir}/${reportName}`)

    const addPassTest = (test, namespace, resultsObject) => {
        if (namespace.length > 0) {
            const firstNamespace = namespace[0];
            if (!resultsObject[firstNamespace]) {
                resultsObject[firstNamespace] = {
                    title: firstNamespace,
                    fullTitle: test.fullTitle(),
                    pass: 0,
                    fail: 0,
                    total: 0,
                    tests: []
                }
            }
            resultsObject[firstNamespace].pass++;
            resultsObject[firstNamespace].total++;
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
        if (namespace.length > 0) {
            const firstNamespace = namespace[0];
            if (!resultsObject[firstNamespace]) {
                resultsObject[firstNamespace] = {
                    title: firstNamespace,
                    fullTitle: test.fullTitle(),
                    pass: 0,
                    fail: 0,
                    total: 0,
                    tests: []
                }
            }
            resultsObject[firstNamespace].fail++;
            resultsObject[firstNamespace].total++;
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
        while (parent) {
            if (parent.title === "" && !!parent.file) testNamespace.push(parent.file.replace("cypress\\integration\\", ""));
            else testNamespace.push(parent.title);
            parent = parent.parent;
        }
        return testNamespace.reverse();
    }

    runner.on('pass', function (test) {
        passes++;
        addPassTest(test, getTestNamespace(test), results);
    });

    runner.on('fail', function (test, err) {
        failures++;
        addFailTest(test, getTestNamespace(test), err.message, results);
    });

    runner.on('end', function (args) {
        const indexFile = fs.readFileSync(`${reportDir}/index.html`).toString();
        const obj = {test:'test'}
        const config = {
            "title": "Cypress reports",
            "lastRun": new Date().getTime(),
            "refreshDelay": 300000
        }
        if(isLocalDeployment) {
            fs.writeFileSync(`${reportDir}/index.html`, indexFile.replace(/URL_PLACEHOLDER\s*/gi, `${directory}/${reportDir}`)
                .replace(/<script type="text\/javascript"><\/script>/gi, `<script type='text/javascript'>window.config=${JSON.stringify(config)};window.results=${JSON.stringify(results)}</script>`))
        } else {
            fs.writeFileSync(`${reportDir}/index.html`, indexFile.replace(/URL_PLACEHOLDER\s*/gi, staticFilesDomain))
            fs.writeFileSync(`${directory}/${reportDir}/${reportName}`, JSON.stringify(results));
            fs.writeFileSync(`${directory}/${reportDir}/${configName}`, JSON.stringify({
                "title": "Cypress reports",
                "lastRun": new Date().getTime(),
                "refreshDelay": 300000
            }));
        }
    });
}

module.exports = MyReporter;