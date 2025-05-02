---
id: axe-core
title: Axe Core
---

Bạn có thể bao gồm các bài kiểm tra về khả năng tiếp cận trong bộ kiểm tra WebdriverIO của mình bằng cách sử dụng các công cụ nguồn mở về khả năng tiếp cận [từ Deque có tên là Axe](https://www.deque.com/axe/). Việc thiết lập rất dễ dàng, tất cả những gì bạn cần làm là cài đặt bộ điều hợp WebdriverIO Axe thông qua:

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

Bộ điều hợp Axe có thể được sử dụng ở cả chế độ [độc lập hoặc trình chạy kiểm thử](/docs/setuptypes) bằng cách đơn giản nhập và khởi tạo nó với [đối tượng browser](/docs/api/browser), ví dụ:

```ts
import { browser } from '@wdio/globals'
import AxeBuilder from '@axe-core/webdriverio'

describe('Accessibility Test', () => {
    it('should get the accessibility results from a page', async () => {
        const builder = new AxeBuilder({ client: browser })

        await browser.url('https://testingbot.com')
        const result = await builder.analyze()
        console.log('Acessibility Results:', result)
    })
})
```

Bạn có thể tìm thấy thêm tài liệu về bộ điều hợp Axe WebdriverIO [trên GitHub](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage).