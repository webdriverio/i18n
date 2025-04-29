---
id: wdio-zafira-listener-service
title: Zafira 监听服务
custom_edit_url: https://github.com/shashidharus/wdio-zafira-listener-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-zafira-listener-service 是第三方包，更多信息请查看 [GitHub](https://github.com/shashidharus/wdio-zafira-listener-service) | [npm](https://www.npmjs.com/package/wdio-zafira-listener-service)
一个用于向 [Zafira Dashboard](http://demo.qaprosoft.com/zafira/) 报告测试的 WDIO 自定义服务

## 如何使用
### 要求

- Node.js 10.x +

### 安装

- npm install wdio-zafira-listener-service

### wdio 配置示例

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