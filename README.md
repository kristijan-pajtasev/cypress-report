# Cypress dashboard

## Installing
```
npm install cypress-dashboard
```

## Output example

![Report output example](https://i.imgur.com/kTaNZ32.png)

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

