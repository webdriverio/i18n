---
id: boilerplates
title: Các Dự án Mẫu
---

Theo thời gian, cộng đồng của chúng tôi đã phát triển một số dự án mà bạn có thể sử dụng làm nguồn cảm hứng để thiết lập bộ kiểm thử của riêng mình.

# v9 Boilerplate Projects

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Dự án mẫu của chúng tôi cho bộ kiểm thử Cucumber. Chúng tôi đã tạo sẵn hơn 150 định nghĩa bước cho bạn, để bạn có thể bắt đầu viết các tệp tính năng trong dự án của mình ngay lập tức.

- Framework:
    - Cucumber
    - WebdriverIO
- Tính năng:
    - Hơn 150 bước được định nghĩa sẵn bao gồm hầu hết mọi thứ bạn cần
    - Tích hợp chức năng Multiremote của WebdriverIO
    - Ứng dụng demo riêng

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Dự án mẫu để chạy các bài kiểm thử WebdriverIO với Jasmine sử dụng các tính năng của Babel và mẫu page objects.

- Frameworks
    - WebdriverIO
    - Jasmine
- Tính năng
    - Mẫu Page Object
    - Tích hợp Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Dự án mẫu để chạy các bài kiểm thử WebdriverIO trên một ứng dụng Electron đơn giản.

- Frameworks
    - WebdriverIO
    - Mocha
- Tính năng
    - Giả lập API Electron

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Tự động tạo các lớp Page Object của WebdriverIO và thông số kỹ thuật kiểm thử Mocha từ các tệp .feature Gherkin — giảm công sức thủ công, cải thiện tính nhất quán và tăng tốc tự động hóa QA. Dự án này không chỉ tạo ra mã tương thích với webdriver.io mà còn nâng cao tất cả các chức năng của webdriver.io. Chúng tôi đã tạo ra hai phiên bản, một cho người dùng JavaScript và một cho người dùng TypeScript. Nhưng cả hai dự án đều hoạt động theo cùng một cách.

***Cách hoạt động?***
- Quy trình theo hai bước tự động hóa:
- Bước 1: Gherkin sang stepMap (Tạo tệp stepMap.json)
  - Tạo tệp stepMap.json:
    - Phân tích cú pháp các tệp .feature được viết bằng cú pháp Gherkin.
    - Trích xuất các kịch bản và bước.
    - Tạo ra một tệp .stepMap.json có cấu trúc chứa:
      - hành động thực hiện (ví dụ: click, setText, assertVisible)
      - selectorName để ánh xạ logic
      - selector cho phần tử DOM
      - ghi chú cho giá trị hoặc khẳng định
- Bước 2: stepMap sang Mã (Tạo Mã WebdriverIO).
  Sử dụng stepMap.json để tạo:
  - Tạo lớp base page.js với các phương thức chung và thiết lập browser.url().
  - Tạo các lớp Page Object Model (POM) tương thích với WebdriverIO cho mỗi tính năng bên trong test/pageobjects/.
  - Tạo đặc tả kiểm thử dựa trên Mocha.
- Ví dụ về Cấu trúc Thư mục cho JavaScript / TypeScript. Dưới đây là cho phiên bản JS, phiên bản TS cũng có cấu trúc tương tự.
```
project-root/
├── features/                   # Gherkin .feature files (user input / source file)
├── stepMaps/                   # Auto-generated .stepMap.json files
├── test/                 
│   ├── pageobjects/            # Auto-generated WebdriverIO tests Page Object Model classes
│   └── specs/                  # Auto-generated Mocha test specs
├── src/
│   ├── cli.js                  # Main CLI logic
│   ├── generateStepsMap.js     # Feature-to-stepMap generator
│   ├── generateTestsFromMap.js # stepMap-to-page/spec generator
│   ├── utils.js                # Helper methods
│   └── config.js               # Paths, fallback selectors, aliases
│   └── __tests__/              # Unit tests (Vitest)
├── testgen.js                  # CLI entry point
│── wdio.config.js              # WebdriverIO configuration
├── package.json                # Scripts and dependencies
├── selector-aliases.json       # Optional user-defined selector overrides the primary selector
```
---
# v8 Boilerplate Projects

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 với Cucumber (V8x).
- Tính năng:
    - Page Objects Model sử dụng cách tiếp cận dựa trên lớp kiểu ES6 /ES7 và hỗ trợ TypeScript
    - Ví dụ về tùy chọn bộ chọn nhiều để truy vấn phần tử với nhiều bộ chọn cùng một lúc
    - Ví dụ về thực thi đa trình duyệt và trình duyệt headless sử dụng - Chrome và Firefox
    - Tích hợp kiểm thử đám mây với BrowserStack, Sauce Labs, LambdaTest
    - Ví dụ về đọc/ghi dữ liệu từ MS-Excel để quản lý dữ liệu kiểm thử dễ dàng từ các nguồn dữ liệu bên ngoài với các ví dụ
    - Hỗ trợ cơ sở dữ liệu cho bất kỳ RDBMS nào (Oracle, MySql, TeraData, Vertica, v.v.), thực thi bất kỳ truy vấn nào / lấy tập kết quả, v.v. với các ví dụ cho kiểm thử E2E
    - Nhiều báo cáo (Spec, Xunit/Junit, Allure, JSON) và lưu trữ báo cáo Allure và Xunit/Junit trên WebServer.
    - Ví dụ với ứng dụng demo https://search.yahoo.com/ và http://the-internet.herokuapp.com.
    - BrowserStack, Sauce Labs, LambdaTest và tệp `.config` dành riêng cho Appium (để phát lại trên thiết bị di động). Để thiết lập Appium một cú nhấp chuột trên máy cục bộ cho iOS và Android, tham khảo [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 với Mocha (V10x).
- Tính năng:
    -  Page Objects Model sử dụng cách tiếp cận dựa trên lớp kiểu ES6 /ES7 và hỗ trợ TypeScript
    -  Ví dụ với ứng dụng demo https://search.yahoo.com và http://the-internet.herokuapp.com
    -  Ví dụ về thực thi đa trình duyệt và trình duyệt headless sử dụng - Chrome và Firefox
    -  Tích hợp kiểm thử đám mây với BrowserStack, Sauce Labs, LambdaTest
    -  Nhiều báo cáo (Spec, Xunit/Junit, Allure, JSON) và lưu trữ báo cáo Allure và Xunit/Junit trên WebServer.
    -  Ví dụ về đọc/ghi dữ liệu từ MS-Excel để quản lý dữ liệu kiểm thử dễ dàng từ các nguồn dữ liệu bên ngoài với các ví dụ
    -  Ví dụ về kết nối DB đến bất kỳ RDBMS nào (Oracle, MySql, TeraData, Vertica, v.v.), thực thi bất kỳ truy vấn nào / lấy tập kết quả, v.v. với các ví dụ cho kiểm thử E2E
    -  BrowserStack, Sauce Labs, LambdaTest và tệp `.config` dành riêng cho Appium (để phát lại trên thiết bị di động). Để thiết lập Appium một cú nhấp chuột trên máy cục bộ cho iOS và Android, tham khảo [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 với Jasmine (V4x).
- Tính năng:
    -  Page Objects Model sử dụng cách tiếp cận dựa trên lớp kiểu ES6 /ES7 và hỗ trợ TypeScript
    -  Ví dụ với ứng dụng demo https://search.yahoo.com và http://the-internet.herokuapp.com
    -  Ví dụ về thực thi đa trình duyệt và trình duyệt headless sử dụng - Chrome và Firefox
    -  Tích hợp kiểm thử đám mây với BrowserStack, Sauce Labs, LambdaTest
    -  Nhiều báo cáo (Spec, Xunit/Junit, Allure, JSON) và lưu trữ báo cáo Allure và Xunit/Junit trên WebServer.
    -  Ví dụ về đọc/ghi dữ liệu từ MS-Excel để quản lý dữ liệu kiểm thử dễ dàng từ các nguồn dữ liệu bên ngoài với các ví dụ
    -  Ví dụ về kết nối DB đến bất kỳ RDBMS nào (Oracle, MySql, TeraData, Vertica, v.v.), thực thi bất kỳ truy vấn nào / lấy tập kết quả, v.v. với các ví dụ cho kiểm thử E2E
    -  BrowserStack, Sauce Labs, LambdaTest và tệp `.config` dành riêng cho Appium (để phát lại trên thiết bị di động). Để thiết lập Appium một cú nhấp chuột trên máy cục bộ cho iOS và Android, tham khảo [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Dự án mẫu này có các bài kiểm thử WebdriverIO 8 với cucumber và typescript, theo mẫu page objects.

- Frameworks:
    - WebdriverIO v8
    - Cucumber v8

- Tính năng:
    - Typescript v5
    - Mẫu Page Object
    - Prettier
    - Hỗ trợ đa trình duyệt
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Thực thi song song trên nhiều trình duyệt
    - Appium
    - Tích hợp kiểm thử đám mây với BrowserStack & Sauce Labs
    - Dịch vụ Docker
    - Dịch vụ chia sẻ dữ liệu
    - Tệp cấu hình riêng biệt cho từng dịch vụ
    - Quản lý dữ liệu kiểm thử & đọc theo loại người dùng
    - Báo cáo
      - Dot
      - Spec
      - Nhiều báo cáo html cucumber với ảnh chụp màn hình khi thất bại
    - Pipelines Gitlab cho kho lưu trữ Gitlab
    - Github actions cho kho lưu trữ Github
    - Docker compose để thiết lập docker hub
    - Kiểm thử khả năng truy cập sử dụng AXE
    - Kiểm thử trực quan sử dụng Applitools
    - Cơ chế ghi nhật ký


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Tính năng
    - Chứa kịch bản kiểm thử mẫu trong cucumber
    - Tích hợp báo cáo html cucumber với video nhúng khi thất bại
    - Tích hợp dịch vụ Lambdatest và CircleCI
    - Tích hợp kiểm thử Visual, Accessibility và API
    - Tích hợp chức năng Email
    - Tích hợp s3 bucket để lưu trữ và truy xuất báo cáo kiểm thử

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Dự án mẫu [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) để giúp bạn bắt đầu kiểm thử chấp nhận các ứng dụng web của bạn bằng cách sử dụng WebdriverIO, Mocha và Serenity/JS mới nhất.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Báo cáo Serenity BDD

- Tính năng
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Tự động chụp màn hình khi kiểm thử thất bại, được nhúng trong báo cáo
    - Cài đặt Continuous Integration (CI) sử dụng [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Báo cáo demo Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) được xuất bản lên GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Dự án mẫu [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) để giúp bạn bắt đầu kiểm thử chấp nhận các ứng dụng web của bạn bằng cách sử dụng WebdriverIO, Cucumber và Serenity/JS mới nhất.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Báo cáo Serenity BDD

- Tính năng
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Tự động chụp màn hình khi kiểm thử thất bại, được nhúng trong báo cáo
    - Cài đặt Continuous Integration (CI) sử dụng [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Báo cáo demo Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) được xuất bản lên GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Dự án mẫu để chạy các bài kiểm thử WebdriverIO trong Headspin Cloud (https://www.headspin.io/) sử dụng tính năng Cucumber và mẫu page objects.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Tính năng
    - Tích hợp đám mây với [Headspin](https://www.headspin.io/)
    - Hỗ trợ Mẫu Page Object
    - Chứa các Kịch bản mẫu được viết theo phong cách Khai báo của BDD
    - Tích hợp báo cáo html cucumber

# v7 Boilerplate Projects
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Dự án mẫu để chạy các bài kiểm thử Appium với WebdriverIO cho:

- Ứng dụng Native iOS/Android
- Ứng dụng Hybrid iOS/Android
- Trình duyệt Android Chrome và iOS Safari

Dự án mẫu này bao gồm:

- Framework: Mocha
- Tính năng:
    - Cấu hình cho:
        - Ứng dụng iOS và Android
        - Trình duyệt iOS và Android
    - Trợ giúp cho:
        - WebView
        - Cử chỉ
        - Cảnh báo native
        - Pickers
     - Ví dụ kiểm thử cho:
        - WebView
        - Đăng nhập
        - Biểu mẫu
        - Vuốt
        - Trình duyệt

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
Kiểm thử WEB ATDD với Mocha, WebdriverIO v6 với PageObject

- Frameworks
  - WebdriverIO (v7)
  - Mocha
- Tính năng
  - Mẫu [Page Object](pageobjects)
  - Tích hợp Sauce Labs với [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Báo cáo Allure
  - Tự động chụp màn hình cho các bài kiểm thử thất bại
  - Ví dụ CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Dự án mẫu để chạy các bài kiểm thử E2E với Mocha.

- Frameworks:
    - WebdriverIO (v7)
    - Mocha
- Tính năng:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Kiểm thử hồi quy trực quan](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Mẫu Page Object
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) và [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Ví dụ Github Actions
    -   Báo cáo Allure (ảnh chụp màn hình khi thất bại)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Dự án mẫu để chạy các bài kiểm thử **WebdriverIO v7** cho:

[Script WDIO 7 với TypeScript trong Framework Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Script WDIO 7 với TypeScript trong Framework Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Chạy script WDIO 7 trong Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Nhật ký mạng](https://github.com/17thSep/MonitorNetworkLogs/)

Dự án mẫu cho:

- Ghi nhật ký mạng
- Ghi lại tất cả các cuộc gọi GET/POST hoặc một REST API cụ thể
- Khẳng định tham số Yêu cầu
- Khẳng định tham số Phản hồi
- Lưu trữ tất cả các phản hồi trong một tệp riêng biệt

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Dự án mẫu để chạy các bài kiểm thử appium cho ứng dụng native và trình duyệt di động bằng cucumber v7 và wdio v7 với mẫu page object.

- Frameworks
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Tính năng
    - Ứng dụng Native Android và iOS
    - Trình duyệt Android Chrome
    - Trình duyệt iOS Safari
    - Mẫu Page Object
    - Chứa các kịch bản kiểm thử mẫu trong cucumber
    - Tích hợp với nhiều báo cáo html cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Đây là một dự án mẫu để giúp bạn hiểu cách chạy bài kiểm thử webdriverio từ các ứng dụng Web bằng cách sử dụng WebdriverIO mới nhất và framework Cucumber. Dự án này nhằm mục đích hoạt động như một hình ảnh cơ sở mà bạn có thể sử dụng để hiểu cách chạy các bài kiểm thử WebdriverIO trong docker

Dự án này bao gồm:

- DockerFile
- Dự án cucumber

Đọc thêm tại: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Đây là một dự án mẫu để giúp bạn hiểu cách chạy các bài kiểm thử electronJS bằng WebdriverIO. Dự án này nhằm mục đích hoạt động như một hình ảnh cơ sở mà bạn có thể sử dụng để hiểu cách chạy các bài kiểm thử WebdriverIO electronJS.

Dự án này bao gồm:

- Ứng dụng electronjs mẫu
- Script kiểm thử cucumber mẫu

Đọc thêm tại: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Đây là một dự án mẫu để giúp bạn hiểu cách tự động hóa ứng dụng Windows bằng winappdriver và WebdriverIO. Dự án này nhằm mục đích hoạt động như một hình ảnh cơ sở mà bạn có thể sử dụng để hiểu cách chạy các bài kiểm thử windappdriver và WebdriverIO.

Đọc thêm tại: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Đây là một dự án mẫu để giúp bạn hiểu cách chạy khả năng multiremote của webdriverio với WebdriverIO mới nhất và framework Jasmine. Dự án này nhằm mục đích hoạt động như một hình ảnh cơ sở mà bạn có thể sử dụng để hiểu cách chạy các bài kiểm thử WebdriverIO trong docker

Dự án này sử dụng:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Dự án mẫu để chạy các bài kiểm thử appium trên thiết bị Roku thực sử dụng mocha với mẫu page object.

- Frameworks
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Báo cáo Allure

- Tính năng
    - Mẫu Page Object
    - Typescript
    - Ảnh chụp màn hình khi thất bại
    - Bài kiểm thử mẫu sử dụng kênh Roku mẫu

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Dự án PoC cho các bài kiểm thử Cucumber Multiremote E2E cũng như các bài kiểm thử Mocha dựa trên dữ liệu

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Tính năng:
    - Kiểm thử E2E dựa trên Cucumber
    - Kiểm thử dựa trên dữ liệu Mocha
    - Kiểm thử chỉ dành cho Web - trong nền tảng cục bộ cũng như đám mây
    - Kiểm thử chỉ dành cho di động - máy ảo cục bộ cũng như từ xa trên đám mây (hoặc thiết bị)
    - Kiểm thử Web + Di động - Multiremote - nền tảng cục bộ cũng như đám mây
    - Tích hợp nhiều báo cáo bao gồm Allure
    - Dữ liệu kiểm thử (JSON / XLSX) được xử lý toàn cầu để ghi dữ liệu (được tạo trong quá trình chạy) vào tệp sau khi thực thi kiểm thử
    - Quy trình làm việc Github để chạy kiểm thử và tải lên báo cáo allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Đây là một dự án mẫu để giúp hiểu cách chạy webdriverio multi-remote sử dụng dịch vụ appium và chromedriver với WebdriverIO mới nhất.

- Frameworks
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Tính năng
  - Mẫu [Page Object](pageobjects)
  - Typescript
  - Kiểm thử Web + Di động - Multiremote
  - Ứng dụng Native Android và iOS
  - Appium
  - Chromedriver
  - ESLint
  - Các ví dụ kiểm thử đăng nhập trong http://the-internet.herokuapp.com và [ứng dụng demo native WebdriverIO](https://github.com/webdriverio/native-demo-app)