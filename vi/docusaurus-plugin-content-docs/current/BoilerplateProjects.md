---
id: boilerplates
title: Các dự án mẫu
---

Theo thời gian, cộng đồng của chúng tôi đã phát triển một số dự án mà bạn có thể sử dụng làm nguồn cảm hứng để thiết lập bộ kiểm thử của riêng mình.

# Các dự án mẫu v9

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Dự án mẫu của chúng tôi dành cho bộ kiểm thử Cucumber. Chúng tôi đã tạo hơn 150 định nghĩa bước được xác định trước cho bạn, vì vậy bạn có thể bắt đầu viết các tệp đặc tính trong dự án của mình ngay lập tức.

- Framework:
    - Cucumber
    - WebdriverIO
- Tính năng:
    - Hơn 150 bước được xác định trước bao gồm gần như mọi thứ bạn cần
    - Tích hợp chức năng Multiremote của WebdriverIO
    - Ứng dụng demo riêng

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Dự án mẫu để chạy các kiểm thử WebdriverIO với Jasmine sử dụng các tính năng của Babel và mô hình page objects.

- Frameworks
    - WebdriverIO
    - Jasmine
- Tính năng
    - Mô hình Page Object
    - Tích hợp Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Dự án mẫu để chạy các kiểm thử WebdriverIO trên ứng dụng Electron tối thiểu.

- Frameworks
    - WebdriverIO
    - Mocha
- Tính năng
    - Mô phỏng API Electron
 
## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

Dự án mẫu này có các kiểm thử di động WebdriverIO 9 với Cucumber, TypeScript và Appium cho các nền tảng Android và iOS, tuân theo mô hình Page Object Model. Tính năng bao gồm ghi nhật ký toàn diện, báo cáo, cử chỉ di động, điều hướng từ ứng dụng đến web, và tích hợp CI/CD.

- Frameworks:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- Tính năng:
    - Hỗ trợ đa nền tảng
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - Cử chỉ di động
      - Cuộn
      - Vuốt
      - Nhấn giữ
      - Ẩn bàn phím
    - Điều hướng từ ứng dụng đến Web
      - Chuyển đổi ngữ cảnh
      - Hỗ trợ WebView
      - Tự động hóa trình duyệt (Chrome/Safari)
    - Trạng thái ứng dụng mới
      - Tự động đặt lại ứng dụng giữa các kịch bản
      - Hành vi đặt lại có thể cấu hình (noReset, fullReset)
    - Cấu hình thiết bị
      - Quản lý thiết bị tập trung
      - Dễ dàng chuyển đổi nền tảng
    - Ví dụ về cấu trúc thư mục cho JavaScript / TypeScript. Dưới đây là cho phiên bản JS, phiên bản TS cũng có cấu trúc tương tự.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Tự động tạo các lớp Page Object WebdriverIO và thông số kiểm thử Mocha từ các tệp .feature Gherkin - giảm công sức thủ công, cải thiện tính nhất quán và tăng tốc độ tự động hóa QA. Dự án này không chỉ tạo ra mã tương thích với webdriver.io mà còn nâng cao tất cả các chức năng của webdriver.io. Chúng tôi đã tạo hai phiên bản, một cho người dùng JavaScript và một cho người dùng TypeScript. Nhưng cả hai dự án đều hoạt động theo cùng một cách.

***Cách hoạt động?***
- Quy trình tuân theo hai bước tự động hóa:
- Bước 1: Từ Gherkin đến stepMap (Tạo tệp stepMap.json)
  - Tạo tệp stepMap.json:
    - Phân tích cú pháp tệp .feature được viết bằng cú pháp Gherkin.
    - Trích xuất các kịch bản và bước.
    - Tạo ra một tệp .stepMap.json có cấu trúc chứa:
      - hành động để thực hiện (ví dụ: click, setText, assertVisible)
      - selectorName để ánh xạ logic
      - selector cho phần tử DOM
      - ghi chú cho giá trị hoặc khẳng định
- Bước 2: Từ stepMap đến mã (Tạo mã WebdriverIO).
  Sử dụng stepMap.json để tạo:
  - Tạo lớp base page.js với các phương thức được chia sẻ và thiết lập browser.url().
  - Tạo các lớp Page Object Model (POM) tương thích với WebdriverIO cho mỗi tính năng bên trong test/pageobjects/.
  - Tạo các thông số kiểm thử dựa trên Mocha.
- Ví dụ về cấu trúc thư mục cho JavaScript / TypeScript. Dưới đây là cho phiên bản JS, phiên bản TS cũng có cấu trúc tương tự.
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
# Các dự án mẫu v8

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 với Cucumber (V8x).
- Tính năng:
    - Mô hình Page Objects sử dụng phương pháp tiếp cận dựa trên lớp kiểu ES6 /ES7 và hỗ trợ TypeScript
    - Ví dụ về tùy chọn nhiều bộ chọn để truy vấn phần tử với nhiều bộ chọn cùng một lúc
    - Ví dụ về thực thi đa trình duyệt và trình duyệt headless bằng - Chrome và Firefox
    - Tích hợp kiểm thử đám mây với BrowserStack, Sauce Labs, LambdaTest
    - Ví dụ về đọc/ghi dữ liệu từ MS-Excel để quản lý dữ liệu kiểm thử dễ dàng từ các nguồn dữ liệu bên ngoài với ví dụ
    - Hỗ trợ cơ sở dữ liệu cho bất kỳ RDBMS nào (Oracle, MySql, TeraData, Vertica, v.v.), thực thi bất kỳ truy vấn nào / lấy tập kết quả, v.v. với các ví dụ kiểm thử E2E
    - Báo cáo đa dạng (Spec, Xunit/Junit, Allure, JSON) và lưu trữ báo cáo Allure và Xunit/Junit trên WebServer.
    - Các ví dụ với ứng dụng demo https://search.yahoo.com/ và http://the-internet.herokuapp.com.
    - Tệp `.config` cụ thể cho BrowserStack, Sauce Labs, LambdaTest và Appium (để phát lại trên thiết bị di động). Để thiết lập Appium một cách nhanh chóng trên máy cục bộ cho iOS và Android, tham khảo [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 với Mocha (V10x).
- Tính năng:
    -  Mô hình Page Objects sử dụng phương pháp tiếp cận dựa trên lớp kiểu ES6 /ES7 và hỗ trợ TypeScript
    -  Ví dụ với ứng dụng demo https://search.yahoo.com và http://the-internet.herokuapp.com
    -  Ví dụ về thực thi đa trình duyệt và trình duyệt headless bằng - Chrome và Firefox
    -  Tích hợp kiểm thử đám mây với BrowserStack, Sauce Labs, LambdaTest
    -  Báo cáo đa dạng (Spec, Xunit/Junit, Allure, JSON) và lưu trữ báo cáo Allure và Xunit/Junit trên WebServer.
    -  Ví dụ về đọc/ghi dữ liệu từ MS-Excel để quản lý dữ liệu kiểm thử dễ dàng từ các nguồn dữ liệu bên ngoài với ví dụ
    -  Ví dụ về kết nối DB với bất kỳ RDBMS nào (Oracle, MySql, TeraData, Vertica, v.v.), thực thi bất kỳ truy vấn nào / lấy tập kết quả, v.v. với các ví dụ kiểm thử E2E
    -  Tệp `.config` cụ thể cho BrowserStack, Sauce Labs, LambdaTest và Appium (để phát lại trên thiết bị di động). Để thiết lập Appium một cách nhanh chóng trên máy cục bộ cho iOS và Android, tham khảo [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 với Jasmine (V4x).
- Tính năng:
    -  Mô hình Page Objects sử dụng phương pháp tiếp cận dựa trên lớp kiểu ES6 /ES7 và hỗ trợ TypeScript
    -  Ví dụ với ứng dụng demo https://search.yahoo.com và http://the-internet.herokuapp.com
    -  Ví dụ về thực thi đa trình duyệt và trình duyệt headless bằng - Chrome và Firefox
    -  Tích hợp kiểm thử đám mây với BrowserStack, Sauce Labs, LambdaTest
    -  Báo cáo đa dạng (Spec, Xunit/Junit, Allure, JSON) và lưu trữ báo cáo Allure và Xunit/Junit trên WebServer.
    -  Ví dụ về đọc/ghi dữ liệu từ MS-Excel để quản lý dữ liệu kiểm thử dễ dàng từ các nguồn dữ liệu bên ngoài với ví dụ
    -  Ví dụ về kết nối DB với bất kỳ RDBMS nào (Oracle, MySql, TeraData, Vertica, v.v.), thực thi bất kỳ truy vấn nào / lấy tập kết quả, v.v. với các ví dụ kiểm thử E2E
    -  Tệp `.config` cụ thể cho BrowserStack, Sauce Labs, LambdaTest và Appium (để phát lại trên thiết bị di động). Để thiết lập Appium một cách nhanh chóng trên máy cục bộ cho iOS và Android, tham khảo [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Dự án mẫu này có các kiểm thử WebdriverIO 8 với cucumber và typescript, theo mô hình page objects.

- Frameworks:
    - WebdriverIO v8
    - Cucumber v8

- Tính năng:
    - Typescript v5
    - Mô hình Page Object
    - Prettier
    - Hỗ trợ nhiều trình duyệt
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
      - Báo cáo html cucumber đa dạng với ảnh chụp lỗi
    - Pipelines Gitlab cho kho lưu trữ Gitlab
    - Github actions cho kho lưu trữ Github
    - Docker compose để thiết lập docker hub
    - Kiểm thử khả năng tiếp cận sử dụng AXE
    - Kiểm thử trực quan bằng Applitools
    - Cơ chế ghi nhật ký


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Tính năng
    - Chứa các kịch bản kiểm thử mẫu trong cucumber
    - Tích hợp báo cáo html cucumber với video nhúng khi thất bại
    - Tích hợp dịch vụ Lambdatest và CircleCI
    - Tích hợp kiểm thử Trực quan, Khả năng tiếp cận và API
    - Tích hợp chức năng Email
    - Tích hợp s3 bucket để lưu trữ và truy xuất báo cáo kiểm thử

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Dự án mẫu [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) để giúp bạn bắt đầu kiểm thử chấp nhận ứng dụng web của mình bằng WebdriverIO, Mocha, và Serenity/JS mới nhất.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Báo cáo Serenity BDD

- Tính năng
    - [Mô hình Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Tự động chụp ảnh màn hình khi kiểm thử thất bại, được nhúng vào báo cáo
    - Thiết lập Tích hợp Liên tục (CI) sử dụng [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Báo cáo Serenity BDD demo](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) được xuất bản lên GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Dự án mẫu [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) để giúp bạn bắt đầu kiểm thử chấp nhận ứng dụng web của mình bằng WebdriverIO, Cucumber, và Serenity/JS mới nhất.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Báo cáo Serenity BDD

- Tính năng
    - [Mô hình Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Tự động chụp ảnh màn hình khi kiểm thử thất bại, được nhúng vào báo cáo
    - Thiết lập Tích hợp Liên tục (CI) sử dụng [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Báo cáo Serenity BDD demo](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) được xuất bản lên GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Dự án mẫu để chạy các kiểm thử WebdriverIO trong Headspin Cloud (https://www.headspin.io/) sử dụng tính năng Cucumber và mô hình page objects.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Tính năng
    - Tích hợp đám mây với [Headspin](https://www.headspin.io/)
    - Hỗ trợ Mô hình Page Object
    - Chứa các Kịch bản mẫu được viết theo phong cách BDD khai báo
    - Tích hợp báo cáo html cucumber

# Các dự án mẫu v7
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Dự án mẫu để chạy các kiểm thử Appium với WebdriverIO cho:

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
        - Cảnh báo gốc
        - Pickers
     - Ví dụ kiểm thử cho:
        - WebView
        - Đăng nhập
        - Biểu mẫu
        - Vuốt
        - Trình duyệt

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
Kiểm thử ATDD WEB với Mocha, WebdriverIO v6 với PageObject

- Frameworks
  - WebdriverIO (v7)
  - Mocha
- Tính năng
  - Mô hình [Page Object](pageobjects)
  - Tích hợp Sauce Labs với [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Báo cáo Allure
  - Tự động chụp ảnh màn hình cho các kiểm thử thất bại
  - Ví dụ CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Dự án mẫu để chạy kiểm thử E2E với Mocha.

- Frameworks:
    - WebdriverIO (v7)
    - Mocha
- Tính năng:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Kiểm thử hồi quy trực quan](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Mô hình Page Object
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) và [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Ví dụ Github Actions
    -   Báo cáo Allure (chụp ảnh khi thất bại)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Dự án mẫu để chạy các kiểm thử **WebdriverIO v7** cho:

[Script WDIO 7 với TypeScript trong Framework Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Script WDIO 7 với TypeScript trong Framework Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Chạy script WDIO 7 trong Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Nhật ký mạng](https://github.com/17thSep/MonitorNetworkLogs/)

Dự án mẫu cho:

- Ghi nhật ký mạng
- Ghi lại tất cả các cuộc gọi GET/POST hoặc một API REST cụ thể
- Khẳng định tham số Yêu cầu
- Khẳng định tham số Phản hồi
- Lưu trữ tất cả các phản hồi trong một tệp riêng biệt

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Dự án mẫu để chạy các kiểm thử appium cho ứng dụng gốc và trình duyệt di động sử dụng cucumber v7 và wdio v7 với mô hình page object.

- Frameworks
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Tính năng
    - Ứng dụng gốc Android và iOS
    - Trình duyệt Chrome Android
    - Trình duyệt Safari iOS
    - Mô hình Page Object
    - Chứa các kịch bản kiểm thử mẫu trong cucumber
    - Tích hợp với nhiều báo cáo html cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Đây là dự án mẫu để giúp bạn hiển thị cách bạn có thể chạy kiểm thử webdriverio từ ứng dụng Web bằng WebdriverIO và framework Cucumber mới nhất. Dự án này nhằm mục đích hoạt động như một hình ảnh cơ sở mà bạn có thể sử dụng để hiểu cách chạy các kiểm thử WebdriverIO trong docker

Dự án này bao gồm:

- DockerFile
- Dự án cucumber

Đọc thêm tại: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Đây là dự án mẫu để giúp bạn hiển thị cách bạn có thể chạy các kiểm thử electronJS bằng WebdriverIO. Dự án này nhằm mục đích hoạt động như một hình ảnh cơ sở mà bạn có thể sử dụng để hiểu cách chạy các kiểm thử electronJS WebdriverIO.

Dự án này bao gồm:

- Ứng dụng electronjs mẫu
- Script kiểm thử cucumber mẫu

Đọc thêm tại: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Đây là dự án mẫu để giúp bạn hiển thị cách bạn có thể tự động hóa ứng dụng Windows bằng winappdriver và WebdriverIO. Dự án này nhằm mục đích hoạt động như một hình ảnh cơ sở mà bạn có thể sử dụng để hiểu cách chạy các kiểm thử windappdriver và WebdriverIO.

Đọc thêm tại: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Đây là dự án mẫu để giúp bạn hiển thị cách bạn có thể chạy khả năng multiremote của webdriverio với WebdriverIO và framework Jasmine mới nhất. Dự án này nhằm mục đích hoạt động như một hình ảnh cơ sở mà bạn có thể sử dụng để hiểu cách chạy các kiểm thử WebdriverIO trong docker

Dự án này sử dụng:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Dự án mẫu để chạy các kiểm thử appium trên thiết bị Roku thực sử dụng mocha với mô hình page object.

- Frameworks
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Báo cáo Allure

- Tính năng
    - Mô hình Page Object
    - Typescript
    - Chụp ảnh màn hình khi thất bại
    - Kiểm thử ví dụ sử dụng kênh Roku mẫu

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Dự án PoC cho các kiểm thử Cucumber Multiremote E2E cũng như các kiểm thử Mocha hướng dữ liệu

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Tính năng:
    - Kiểm thử E2E dựa trên Cucumber
    - Kiểm thử hướng dữ liệu dựa trên Mocha
    - Kiểm thử chỉ Web - ở cục bộ cũng như nền tảng đám mây
    - Kiểm thử chỉ di động - máy ảo cục bộ cũng như đám mây từ xa (hoặc thiết bị)
    - Kiểm thử Web + Di động - Multiremote - cục bộ cũng như nền tảng đám mây
    - Nhiều báo cáo được tích hợp bao gồm Allure
    - Dữ liệu kiểm thử (JSON / XLSX) được xử lý toàn cầu để ghi dữ liệu (được tạo tức thì) vào một tệp sau khi thực thi kiểm thử
    - Quy trình làm việc Github để chạy kiểm thử và tải lên báo cáo allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Đây là dự án mẫu để giúp hiển thị cách chạy webdriverio multi-remote sử dụng dịch vụ appium và chromedriver với WebdriverIO mới nhất.

- Frameworks
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Tính năng
  - Mô hình [Page Object](pageobjects)
  - Typescript
  - Kiểm thử Web + Di động - Multiremote
  - Ứng dụng gốc Android và iOS
  - Appium
  - Chromedriver
  - ESLint
  - Các ví dụ kiểm thử đăng nhập trong http://the-internet.herokuapp.com và [Ứng dụng gốc demo WebdriverIO](https://github.com/webdriverio/native-demo-app)