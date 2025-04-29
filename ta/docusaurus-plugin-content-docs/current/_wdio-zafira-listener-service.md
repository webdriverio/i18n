---
id: wdio-zafira-listener-service
title: சாஃபிரா லிஸ்னர் சேவை
custom_edit_url: https://github.com/shashidharus/wdio-zafira-listener-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-zafira-listener-service is a 3rd party package, for more information please see [GitHub](https://github.com/shashidharus/wdio-zafira-listener-service) | [npm](https://www.npmjs.com/package/wdio-zafira-listener-service)
[Zafira Dashboard](http://demo.qaprosoft.com/zafira/) க்கு சோதனைகளை அறிக்கை செய்ய WDIO க்கான ஒரு தனிப்பயன் சேவை

## எப்படி பயன்படுத்துவது
### தேவைகள்

- Node.js 10.x +

### நிறுவுதல்

- npm install wdio-zafira-listener-service

### wdio கான்ஃபிக் உதாரணம்

```
const ZfService = require('wdio-zafira-listener-service')

exports.config = {
  specs: [
    './test/e2e/*.js'
  ],
  capabilities: [
    { browserName: 'chrome' }
  ],
  services: ['chrome', new ZfService(
    { // Service Options
      refreshToken: 'eyJhbGci....', // http://demo.qaprosoft.com/zafira-ws/swagger-ui.html#!/auth-api-controller/login
      username: 'admin',
      testSuite: {
        fileName: 'test.xml',
        name: 'example_test',
      },
      job: { // Jenkins Settings
        "jenkinsHost": process.env.HOST || 'demo.qaprosoft.com',
        "jobURL": process.env.BUILD_URL || 'http://demo.qaprosoft.com/jenkins/job/shashidemo/5/', //  // Jenkins Build URL
        "name": process.env.JOB_NAME || 'shashidemo',
      },
      run: {
        buildNumber: process.env.BUILD_NUMBER || 6,
        startedBy: process.env.BUILD_CAUSE_MANUALTRIGGER ? 'HUMAN' : 'SCHEDULER' // One of  "SCHEDULER", "UPSTREAM_JOB", "HUMAN"
      }
    }
  )],
...
}


```