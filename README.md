# Cypress dashboard

Tests reporting dashboard with the simplest possible setup there is. 

Pie chart shows percentage of failing and passing 
tests. List on the right scrolls automatically and shows all spec files with number of tests passing for each. 
Two containers on the bottom show tests in two specs files and after a while replaces it with list for next spec in line.   

## Installing
```
npm install cypress-dashboard
```

## Output example

![Report output example](https://i.imgur.com/okiTt9v.gif)

## Setup example
```js
// cypress.json
{
  "reporter": "cypress-dashboard",
  "reporterOptions": {
    "reportDir": "cypress/reports",
    "isLocalDeployment": true
  }
}
```

## Reporter Options

### reportDir | string
Location where to store report

### isLocalDeployment | boolean
If true all static files will use location on disc for reference, otherwise it will use relative href path.

### refreshInterval | int
Number of milliseconds saying how often do you want to refresh the page. Default value is 10 minutes.

### dashboardTitle | string
Title to be displayed at the top of the dashboard. Default title is "Cypress reports".



