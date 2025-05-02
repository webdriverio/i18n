---
id: environment
title: Biến Môi Trường
---

WebdriverIO thiết lập các biến môi trường sau trong mỗi worker:

## `NODE_ENV`

Được đặt thành `'test'` nếu nó chưa được đặt thành giá trị khác.

## `WDIO_LOG_LEVEL`

Có thể được đặt thành các giá trị `trace`, `debug`, `info`, `warn`, `error`, `silent` để ghi log với các mức độ chi tiết tương ứng. Có độ ưu tiên cao hơn giá trị `logLevel` được truyền vào.

## `WDIO_WORKER_ID`

Một id duy nhất giúp nhận diện quy trình worker. Nó có định dạng `{number}-{number}` trong đó số đầu tiên xác định capability và số thứ hai là tệp spec mà capability đó đang chạy, ví dụ: `0-5` chỉ ra một worker đầu tiên đang chạy tệp spec thứ 6 cho capability đầu tiên.