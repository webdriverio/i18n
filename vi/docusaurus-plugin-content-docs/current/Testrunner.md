---
id: testrunner
title: Trình chạy kiểm thử
---

WebdriverIO đi kèm với trình chạy kiểm thử riêng để giúp bạn bắt đầu kiểm thử nhanh nhất có thể. Nó được thiết kế để làm tất cả công việc cho bạn, cho phép tích hợp với các dịch vụ bên thứ 3, và giúp bạn chạy các bài kiểm tra của mình một cách hiệu quả nhất có thể.

Trình chạy kiểm thử của WebdriverIO được đóng gói riêng trong gói NPM `@wdio/cli`.

Cài đặt như sau:

```sh npm2yarn
npm install @wdio/cli
```

Để xem trợ giúp về giao diện dòng lệnh, gõ lệnh sau trong terminal của bạn:

```sh
$ npx wdio --help

wdio <command>

Commands:
  wdio config                           Initialize WebdriverIO and setup configuration in
                                        your current project.
  wdio install <type> <name>            Add a `reporter`, `service`, or `framework` to
                                        your WebdriverIO project
  wdio repl <option> [capabilities]     Run WebDriver session in command line
  wdio run <configPath>                 Run your WDIO configuration file to initialize
                                        your tests.

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

Tuyệt! Bây giờ bạn cần định nghĩa một tệp cấu hình nơi tất cả thông tin về các bài kiểm tra, khả năng và cài đặt của bạn được thiết lập. Chuyển sang phần [Tệp cấu hình](/docs/configuration) để xem tệp đó nên trông như thế nào.

Với tiện ích hỗ trợ cấu hình `wdio`, việc tạo tệp cấu hình của bạn cực kỳ đơn giản. Chỉ cần chạy:

```sh
$ npx wdio config
```

...và nó sẽ khởi chạy tiện ích hỗ trợ.

Nó sẽ đặt cho bạn một số câu hỏi và tạo ra một tệp cấu hình cho bạn trong chưa đầy một phút.

![WDIO configuration utility](/img/config-utility.gif)

Khi bạn đã thiết lập tệp cấu hình của mình, bạn có thể bắt đầu các bài kiểm tra bằng cách chạy:

```sh
npx wdio run wdio.conf.js
```

Bạn cũng có thể khởi chạy các bài kiểm tra của mình mà không cần lệnh `run`:

```sh
npx wdio wdio.conf.js
```

Vậy là xong! Bây giờ, bạn có thể truy cập vào phiên bản selenium thông qua biến toàn cục `browser`.

## Các lệnh

### `wdio config`

Lệnh `config` chạy trình hỗ trợ cấu hình WebdriverIO. Trình hỗ trợ này sẽ hỏi bạn một vài câu hỏi về dự án WebdriverIO của bạn và tạo một tệp `wdio.conf.js` dựa trên câu trả lời của bạn.

Ví dụ:

```sh
wdio config
```

Tùy chọn:

```
--help            prints WebdriverIO help menu                                [boolean]
--npm             Wether to install the packages using NPM instead of yarn    [boolean]
```

### `wdio run`

> Đây là lệnh mặc định để chạy cấu hình của bạn.

Lệnh `run` khởi tạo tệp cấu hình WebdriverIO của bạn và chạy các bài kiểm tra của bạn.

Ví dụ:

```sh
wdio run ./wdio.conf.js --watch
```

Tùy chọn:

```
--help                prints WebdriverIO help menu                   [boolean]
--version             prints WebdriverIO version                     [boolean]
--hostname, -h        automation driver host address                  [string]
--port, -p            automation driver port                          [number]
--user, -u            username if using a cloud service as automation backend
                                                                        [string]
--key, -k             corresponding access key to the user            [string]
--watch               watch specs for changes                        [boolean]
--logLevel, -l        level of logging verbosity
                            [choices: "trace", "debug", "info", "warn", "error", "silent"]
--bail                stop test runner after specific amount of tests have
                        failed                                          [number]
--baseUrl             shorten url command calls by setting a base url [string]
--waitforTimeout, -w  timeout for all waitForXXX commands             [number]
--framework, -f       defines the framework (Mocha, Jasmine or Cucumber) to
                        run the specs                                   [string]
--reporters, -r       reporters to print out the results on stdout      [array]
--suite               overwrites the specs attribute and runs the defined
                        suite                                            [array]
--spec                run a certain spec file or wildcards - overrides specs piped
                        from stdin                                       [array]
--exclude             exclude spec file(s) from a run - overrides specs piped
                        from stdin                                       [array]
--repeat              Repeat specific specs and/or suites N times        [number]
--mochaOpts           Mocha options
--jasmineOpts         Jasmine options
--cucumberOpts        Cucumber options
--tsConfigPath        Custom path for `tsconfig.json` or use wdio config's [tsConfigPath setting](/docs/configurationfile)
```

> Lưu ý: Tự động biên dịch có thể dễ dàng điều khiển với các biến môi trường `tsx`. Xem thêm [tài liệu TypeScript](/docs/typescript).

### `wdio install`
Lệnh `install` cho phép bạn thêm các trình báo cáo và dịch vụ vào dự án WebdriverIO của bạn thông qua CLI.

Ví dụ:

```sh
wdio install service sauce # installs @wdio/sauce-service
wdio install reporter dot # installs @wdio/dot-reporter
wdio install framework mocha # installs @wdio/mocha-framework
```

Nếu bạn muốn cài đặt các gói bằng `yarn` thay vì vậy, bạn có thể truyền cờ `--yarn` vào lệnh:

```sh
wdio install service sauce --yarn
```

Bạn cũng có thể truyền một đường dẫn cấu hình tùy chỉnh nếu tệp cấu hình WDIO của bạn không nằm trong cùng thư mục bạn đang làm việc:

```sh
wdio install service sauce --config="./path/to/wdio.conf.js"
```

#### Danh sách các dịch vụ được hỗ trợ

```
sauce
testingbot
firefox-profile
devtools
browserstack
appium
intercept
zafira-listener
reportportal
docker
wiremock
lambdatest
vite
nuxt
```

#### Danh sách các trình báo cáo được hỗ trợ

```
dot
spec
junit
allure
sumologic
concise
reportportal
video
html
json
mochawesome
timeline
```

#### Danh sách các framework được hỗ trợ

```
mocha
jasmine
cucumber
```

### `wdio repl`

Lệnh repl cho phép khởi động giao diện dòng lệnh tương tác để chạy các lệnh WebdriverIO. Nó có thể được sử dụng cho mục đích kiểm tra hoặc chỉ để nhanh chóng khởi động một phiên WebdriverIO.

Chạy kiểm tra trên Chrome cục bộ:

```sh
wdio repl chrome
```

hoặc chạy kiểm tra trên Sauce Labs:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Bạn có thể áp dụng các đối số giống như bạn có thể trong [lệnh run](#wdio-run).