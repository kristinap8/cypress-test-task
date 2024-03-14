# Test task -- testing of Grace Web Application

## Table of Contents

1. [Summary of Repo](#summary-of-repo)
2. [Requirements](#requirements)
3. [Steps to Install](#steps-to-install)
4. [Steps to Launch and Create a Report](#steps-to-launch-and-create-a-report)
5. [Questions](#questions)

## Summary of Repo

This repository contains automated test cases for [Grace](https://dev-admin.grace-technology.io/) implemented using Cypress. 
The report generated from the test runs is deployed to [GitHub Pages](https://kristinap8.github.io/cypress-test-task/).
Additionally, Slack notifications have been enabled. You can join the [Slack channel](https://join.slack.com/t/grace-report/shared_invite/zt-2eqkl5b1u-pNvms2H26ao71Yb00DRb0w) for updates and notifications.

Also you can watch the [video](https://www.youtube.com/watch?v=qxFPaTdZNAs) of the tests execution with the short explanation. 

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

## Questions

1. What makes a good automation QA?<br/>
A good automation QA engineer excel in coding and debugging, unraveling software mysteries with precisionis. They're also communication gurus, bridging gaps between teams with clarity and finesse. Always adapting and learning, they're the backbone of quality assurance, ensuring software sails smoothly through the digital waves.

2. What I love and don’t love about automation QA?<br/>
I love the thrill of solving puzzles, the satisfaction of uncovering elusive bugs, and the power of automation to streamline repetitive tasks. However, I sometimes find the challenge of maintaining test scripts across different environments and platforms a bit daunting. Yet, the joy of seeing the impact of well-designed automated tests on software quality far outweighs any frustrations.

3. Why I think I am a great QA engineer?<br/>
I believe I am a great QA engineer because I possess a unique blend of technical expertise, analytical thinking, and a passion for quality. My attention to detail ensures that no defect goes unnoticed, while my communication skills allow me to effectively collaborate with cross-functional teams. Above all, my dedication to delivering high-quality software drives me to go above and beyond in every aspect of my work.
