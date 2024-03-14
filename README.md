# Test task -- testing of Grace Web Application

## Table of Contents

1. [Summary of Repo](#summary-of-repo)
2. [Requirements](#requirements)
3. [Steps to Install](#steps-to-install)
4. [Steps to Launch and Create a Report](#steps-to-launch-and-create-a-report)

## Summary of Repo

This repository contains automated test cases for [Grace](https://dev-admin.grace-technology.io/) implemented using Cypress. 
The report generated from the test runs is deployed to [GitHub Pages](https://kristinap8.github.io/cypress-test-task/).
Additionally, Slack notifications have been enabled. You can join the [Slack channel](https://join.slack.com/t/grace-report/shared_invite/zt-2eqkl5b1u-pNvms2H26ao71Yb00DRb0w) for updates and notifications.

## Requirements

- Cypress: Install Cypress by running `npm install cypress --save-dev` and check the `package.json` file for additional dependencies.

## Steps to Install

1. Clone this repository:

```bash
git clone https://github.com/kristinap8/cypress-test-task.git
```

2. Navigate to the project directory:

```bash
cd cypress-test-task
```

3. Install project dependencies:

```bash
npm install
```

## Steps to Launch and Create a Report:

1. Run tests with default browser and generate the html report:

```bash
npm run cy:run
```

2. Open generated report:

```bash
npm run cy:open:report
```
