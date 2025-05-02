---
id: parameterize-tests
title: Tham số hóa Các Bài Kiểm thử
---

Bạn có thể đơn giản tham số hóa các bài kiểm thử ở cấp độ kiểm thử, thông qua các vòng lặp `for` đơn giản, ví dụ:

```ts title=example.spec.js
const people = ['Alice', 'Bob']
describe('my tests', () => {
    for (const name of people) {
        it(`testing with ${name}`, async () => {
            // ...
        })
    }
})
```

hoặc bằng cách trích xuất các bài kiểm thử vào các hàm động, ví dụ:

```js title=dynamic.spec.js
import { browser } from '@wdio/globals'

function testComponent(componentName, options) {
  it(`should test my ${componentName}`, async () => {
    await browser.url(`/${componentName}`)
    await expect($('input')).toHaveValue(options.expectedValue)
  })
}

describe('page components', () => {
    testComponent('component-a', { expectedValue: 'some expected value' })
    testComponent('component-b', { expectedValue: 'some other expected value' })
})
```

## Truyền Biến Môi trường

Bạn có thể sử dụng biến môi trường để cấu hình các bài kiểm thử từ dòng lệnh.

Ví dụ, xem xét tệp kiểm thử sau đây cần một tên người dùng và mật khẩu. Thông thường, tốt nhất là không lưu trữ thông tin bí mật trong mã nguồn, vì vậy chúng ta cần một cách để truyền bí mật từ bên ngoài.

```ts title=example.spec.ts
it(`example test`, async () => {
  // ...
  await $('#username').setValue(process.env.USERNAME)
  await $('#password').setValue(process.env.PASSWORD)
})
```

Bạn có thể chạy bài kiểm thử này với tên người dùng và mật khẩu bí mật được thiết lập trong dòng lệnh.

<Tabs
  defaultValue="bash"
  values={[
    {label: 'Bash', value: 'bash'},
    {label: 'Powershell', value: 'powershell'},
    {label: 'Batch', value: 'batch'},
  ]
}>
<TabItem value="bash">

```sh
USERNAME=me PASSWORD=secret npx wdio run wdio.conf.js
```

</TabItem>
<TabItem value="powershell">

```sh
$env:USERNAME=me
$env:PASSWORD=secret
npx wdio run wdio.conf.js
```

</TabItem>
<TabItem value="batch">

```sh
set USERNAME=me
set PASSWORD=secret
npx wdio run wdio.conf.js
```

</TabItem>
</Tabs>

Tương tự, tệp cấu hình cũng có thể đọc các biến môi trường được truyền qua dòng lệnh.

```ts title=wdio.config.js
export const config = {
  // ...
  baseURL: process.env.STAGING === '1'
    ? 'http://staging.example.test/'
    : 'http://example.test/',
  // ...
}
```

Bây giờ, bạn có thể chạy các bài kiểm thử trong môi trường staging hoặc production:

<Tabs
  defaultValue="bash"
  values={[
    {label: 'Bash', value: 'bash'},
    {label: 'Powershell', value: 'powershell'},
    {label: 'Batch', value: 'batch'},
  ]
}>
<TabItem value="bash">

```sh
STAGING=1 npx wdio run wdio.conf.js
```

</TabItem>
<TabItem value="powershell">

```sh
$env:STAGING=1
npx wdio run wdio.conf.js
```

</TabItem>
<TabItem value="batch">

```sh
set STAGING=1
npx wdio run wdio.conf.js
```

</TabItem>
</Tabs>

## Tệp `.env`

Để quản lý biến môi trường dễ dàng hơn, hãy xem xét sử dụng tệp `.env`. WebdriverIO tự động tải các tệp `.env` vào môi trường của bạn. Thay vì định nghĩa biến môi trường như một phần của lệnh gọi, bạn có thể định nghĩa tệp `.env` sau:

```bash title=".env"
# .env file
STAGING=0
USERNAME=me
PASSWORD=secret
```

Chạy các bài kiểm thử như thường lệ, các biến môi trường của bạn sẽ được sử dụng.

```sh
npx wdio run wdio.conf.js
```

## Tạo bài kiểm thử thông qua tệp CSV

WebdriverIO test-runner chạy trong Node.js, điều này có nghĩa là bạn có thể trực tiếp đọc tệp từ hệ thống tệp và phân tích chúng bằng thư viện CSV ưa thích của bạn.

Ví dụ, xem tệp CSV này, trong ví dụ input.csv của chúng ta:

```csv
"test_case","some_value","some_other_value"
"value 1","value 11","foobar1"
"value 2","value 22","foobar21"
"value 3","value 33","foobar321"
"value 4","value 44","foobar4321"
```

Dựa trên điều này, chúng ta sẽ tạo một số bài kiểm thử bằng cách sử dụng thư viện csv-parse từ NPM:

```js title=test.spec.ts
import fs from 'node:fs'
import path from 'node:path'
import { parse } from 'csv-parse/sync'

const records = parse(fs.readFileSync(path.join(__dirname, 'input.csv')), {
  columns: true,
  skip_empty_lines: true
})

describe('my test suite', () => {
    for (const record of records) {
        it(`foo: ${record.test_case}`, async () => {
            console.log(record.test_case, record.some_value, record.some_other_value)
        })
    }
})
```