---
id: wdio-zafira-listener-service
title: Сервис прослушивания Zafira
custom_edit_url: https://github.com/shashidharus/wdio-zafira-listener-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-zafira-listener-service — это сторонний пакет, для получения дополнительной информации см. [GitHub](https://github.com/shashidharus/wdio-zafira-listener-service) | [npm](https://www.npmjs.com/package/wdio-zafira-listener-service)
Пользовательский сервис для WDIO для отчетов о тестах в [Zafira Dashboard](http://demo.qaprosoft.com/zafira/)

## Как использовать
### Требования

- Node.js 10.x +

### Установка

- npm install wdio-zafira-listener-service

### Пример конфигурации wdio

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