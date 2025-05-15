---
id: repl
title: REPL 인터페이스
---

WebdriverIO는 `v4.5.0`부터 프레임워크 API를 배울 뿐만 아니라 테스트를 디버깅하고 검사하는 데 도움이 되는 [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) 인터페이스를 도입했습니다. 이것은 여러 방법으로 사용할 수 있습니다.

첫째, `npm install -g @wdio/cli`를 설치하여 CLI 명령으로 사용할 수 있으며 명령줄에서 WebDriver 세션을 생성할 수 있습니다. 예:

```sh
wdio repl chrome
```

이렇게 하면 REPL 인터페이스로 제어할 수 있는 Chrome 브라우저가 열립니다. 세션을 시작하려면 포트 `4444`에서 실행 중인 브라우저 드라이버가 있어야 합니다. [Sauce Labs](https://saucelabs.com)(또는 다른 클라우드 벤더) 계정이 있는 경우 다음과 같이 명령줄에서 클라우드를 통해 브라우저를 직접 실행할 수도 있습니다:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

드라이버가 9515와 같은 다른 포트에서 실행 중인 경우, 명령줄 인수 --port 또는 별칭 -p를 사용하여 전달할 수 있습니다

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

Repl은 또한 webdriverIO 구성 파일의 capabilities를 사용하여 실행할 수 있습니다. Wdio는 capabilities 객체 또는 multiremote capability 목록이나 객체를 지원합니다.

구성 파일이 capabilities 객체를 사용하는 경우 구성 파일 경로만 전달하면 되고, multiremote capability인 경우 위치 인수를 사용하여 목록이나 multiremote에서 사용할 capability를 지정합니다. 참고: 목록의 경우 0부터 시작하는 인덱스를 사용합니다.

### 예시

capability 배열이 있는 WebdriverIO:

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities:[{
        browserName: 'chrome', // options: `chrome`, `edge`, `firefox`, `safari`, `chromium`
        browserVersion: '27.0', // browser version
        platformName: 'Windows 10' // OS platform
    }]
}
```

```sh
wdio repl "./path/to/wdio.config.js" 0 -p 9515
```

[multiremote](https://webdriver.io/docs/multiremote/) capability 객체가 있는 WebdriverIO:

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }
}
```

```sh
wdio repl "./path/to/wdio.config.js" "myChromeBrowser" -p 9515
```

또는 Appium을 사용하여 로컬 모바일 테스트를 실행하려면:

<Tabs
  defaultValue="android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'}
  ]
}>
<TabItem value="android">

```sh
wdio repl android
```

</TabItem>
<TabItem value="ios">

```sh
wdio repl ios
```

</TabItem>
</Tabs>

이렇게 하면 연결된 장치/에뮬레이터/시뮬레이터에서 Chrome/Safari 세션이 열립니다. 세션을 시작하려면 포트 `4444`에서 실행 중인 Appium이 있어야 합니다.

```sh
wdio repl './path/to/your_app.apk'
```

이렇게 하면 연결된 장치/에뮬레이터/시뮬레이터에서 앱 세션이 열립니다. 세션을 시작하려면 포트 `4444`에서 실행 중인 Appium이 있어야 합니다.

iOS 장치의 capabilities는 다음 인수로 전달할 수 있습니다:

* `-v`      - `platformVersion`: Android/iOS 플랫폼 버전
* `-d`      - `deviceName`: 모바일 장치 이름
* `-u`      - `udid`: 실제 장치의 udid

사용법:

<Tabs
  defaultValue="long"
  values={[
    {label: 'Long Parameter Names', value: 'long'},
    {label: 'Short Parameter Names', value: 'short'}
  ]
}>
<TabItem value="long">

```sh
wdio repl ios --platformVersion 11.3 --deviceName 'iPhone 7' --udid 123432abc
```

</TabItem>
<TabItem value="short">

```sh
wdio repl ios -v 11.3 -d 'iPhone 7' -u 123432abc
```

</TabItem>
</Tabs>

REPL 세션에 사용 가능한 모든 옵션을 적용할 수 있습니다 (`wdio repl --help` 참조).

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

REPL을 사용하는 또 다른 방법은 [`debug`](/docs/api/browser/debug) 명령을 통해 테스트 내부에서 사용하는 것입니다. 이 명령을 호출하면 브라우저가 중지되고 애플리케이션(예: 개발자 도구)으로 이동하거나 명령줄에서 브라우저를 제어할 수 있습니다. 이는 일부 명령이 예상대로 특정 동작을 트리거하지 않을 때 유용합니다. REPL을 사용하면 어떤 명령이 가장 안정적으로 작동하는지 확인하기 위해 명령을 시도해 볼 수 있습니다.