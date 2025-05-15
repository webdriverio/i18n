---
id: parameterize-tests
title: 테스트 매개변수화
---

테스트 레벨에서 간단한 `for` 루프를 사용하여 테스트를 쉽게 매개변수화할 수 있습니다. 예:

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

또는 동적 함수로 테스트를 추출하여 사용할 수 있습니다. 예:

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

## 환경 변수 전달하기

명령줄에서 환경 변수를 사용하여 테스트를 구성할 수 있습니다.

예를 들어, 사용자 이름과 비밀번호가 필요한 다음과 같은 테스트 파일을 고려해 보세요. 일반적으로 소스 코드에 비밀을 저장하지 않는 것이 좋기 때문에 외부에서 비밀을 전달하는 방법이 필요합니다.

```ts title=example.spec.ts
it(`example test`, async () => {
  // ...
  await $('#username').setValue(process.env.USERNAME)
  await $('#password').setValue(process.env.PASSWORD)
})
```

명령줄에서 비밀 사용자 이름과 비밀번호를 설정하여 이 테스트를 실행할 수 있습니다.

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

마찬가지로 구성 파일도 명령줄을 통해 전달된 환경 변수를 읽을 수 있습니다.

```ts title=wdio.config.js
export const config = {
  // ...
  baseURL: process.env.STAGING === '1'
    ? 'http://staging.example.test/'
    : 'http://example.test/',
  // ...
}
```

이제 스테이징 환경이나 프로덕션 환경에서 테스트를 실행할 수 있습니다:

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

## `.env` 파일

환경 변수를 더 쉽게 관리하기 위해 `.env` 파일과 같은 것을 고려해 보세요. WebdriverIO는 `.env` 파일을 자동으로 환경에 로드합니다. 명령 호출의 일부로 환경 변수를 정의하는 대신 다음과 같은 `.env`를 정의할 수 있습니다:

```bash title=".env"
# .env file
STAGING=0
USERNAME=me
PASSWORD=secret
```

평소와 같이 테스트를 실행하면 환경 변수가 인식됩니다.

```sh
npx wdio run wdio.conf.js
```

## CSV 파일을 통해 테스트 생성하기

WebdriverIO 테스트 러너는 Node.js에서 실행되므로 파일 시스템에서 직접 파일을 읽고 선호하는 CSV 라이브러리로 파싱할 수 있습니다.

예를 들어 다음과 같은 CSV 파일(예: input.csv)을 사용해 봅시다:

```csv
"test_case","some_value","some_other_value"
"value 1","value 11","foobar1"
"value 2","value 22","foobar21"
"value 3","value 33","foobar321"
"value 4","value 44","foobar4321"
```

이를 기반으로 NPM의 csv-parse 라이브러리를 사용하여 몇 가지 테스트를 생성해 보겠습니다:

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