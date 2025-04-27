---
id: environment
title: 环境变量
---

WebdriverIO在每个工作进程中设置以下环境变量：

## `NODE_ENV`

如果尚未设置为其他值，则设置为`'test'`。

## `WDIO_LOG_LEVEL`

可以设置为`trace`、`debug`、`info`、`warn`、`error`、`silent`值以写入具有相应详细信息的日志。优先级高于传递的`logLevel`值。

## `WDIO_WORKER_ID`

一个唯一ID，有助于识别工作进程。它的格式为`{number}-{number}`，其中第一个数字标识能力，第二个数字标识该能力正在运行的规范文件，例如，`0-5`表示第一个能力的第6个规范文件的工作进程。