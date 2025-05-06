---
id: boilerplates
title: Các Dự Án Mẫu
---

Theo thời gian, cộng đồng của chúng tôi đã phát triển một số dự án mà bạn có thể sử dụng làm nguồn cảm hứng để thiết lập bộ kiểm thử riêng của mình.

# v9 Boilerplate Projects

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Dự án mẫu của chúng tôi cho bộ kiểm thử Cucumber. Chúng tôi đã tạo hơn 150 định nghĩa bước đã được xác định trước cho bạn, vì vậy bạn có thể bắt đầu viết tệp tính năng trong dự án của mình ngay lập tức.

- Framework:
    - Cucumber
    - WebdriverIO
- Tính năng:
    - Hơn 150 bước đã được xác định trước bao gồm hầu hết mọi thứ bạn cần
    - Tích hợp chức năng Multiremote của WebdriverIO
    - Ứng dụng demo riêng

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Dự án mẫu để chạy các bài kiểm thử WebdriverIO với Jasmine sử dụng các tính năng Babel và mẫu đối tượng trang.

- Frameworks
    - WebdriverIO
    - Jasmine
- Tính năng
    - Mẫu đối tượng trang
    - Tích hợp Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Dự án mẫu để chạy các bài kiểm thử WebdriverIO trên ứng dụng Electron tối thiểu.

- Frameworks
    - WebdriverIO
    - Mocha
- Tính năng
    - Mô phỏng API Electron

## [amiya-pattnaik/gherkin-to-webdriverIO-test-generator](https://github.com/amiya-pattnaik/gherkin-to-webdriverIO-test-generator)
Tự động tạo các lớp Page Object WebdriverIO và đặc tả kiểm thử Mocha từ các tệp .feature Gherkin — giảm công sức thủ công, cải thiện tính nhất quán và tăng tốc tự động hóa QA. Dự án này không chỉ tạo ra mã tương thích với webdriver.io mà còn nâng cao tất cả chức năng của webdriver.io.

***Cách Hoạt Động?***
- Quy trình tuân theo hai bước tự động hóa:
- Bước 1: Gherkin to stepMap (Tạo tệp stepMap.json)
  - Tạo tệp stepMap.json:
    - Phân tích cú pháp tệp .feature viết bằng cú pháp Gherkin.
    - Trích xuất kịch bản và các bước.
    - Tạo ra tệp .stepMap.json có cấu trúc chứa:
      - hành động thực hiện (ví dụ: click, setText, assertVisible)
      - selectorName cho ánh xạ logic
      - selector cho phần tử DOM
      - ghi chú cho giá trị hoặc xác nhận
- Bước 2: stepMap to Code (Tạo mã WebdriverIO).
  Sử dụng stepMap.json để tạo:
  - Tạo lớp base page.js với các phương thức được chia sẻ và thiết lập browser.url().
  - Tạo các lớp Page Object Model (POM) tương thích với WebdriverIO cho mỗi tính năng bên trong test/pageobjects/.
  - Tạo đặc tả kiểm thử dựa trên Mocha.
- Cấu trúc thư mục
```
project-root/
├── features/               # Tệp đặc tả Gherkin đầu vào
├── stepMaps/               # Bản đồ bước được tạo ra (JSON)
├── test/
│   ├── pageobjects/        # Lớp Page cơ sở, các lớp Page Object được tạo ra
│   └── specs/              # Đặc tả kiểm thử được tạo ra
├── generateStepMap.js      # Script tạo StepMap
├── generateTestsFromMap.js # Script tạo PageObject + đặc tả kiểm thử
├── package.json
├── README.md
└── wdio.conf.js
```
---
# v8 Boilerplate Projects

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 với Cucumber (V8x).
- Tính năng:
    - Mô hình Đối tượng Trang sử dụng cách tiếp cận dựa trên lớp kiểu ES6 /ES7 và hỗ trợ TypeScript
    - Ví dụ về tùy chọn bộ chọn nhiều để truy vấn phần tử với nhiều bộ chọn cùng một lúc
    - Ví dụ về thực thi trình duyệt đa dạng và trình duyệt không giao diện sử dụng - Chrome và Firefox
    - Tích hợp thử nghiệm đám mây với BrowserStack, Sauce Labs, LambdaTest
    - Ví dụ về đọc/ghi dữ liệu từ MS-Excel để quản lý dữ liệu kiểm thử dễ dàng từ nguồn dữ liệu bên ngoài với các ví dụ
    - Hỗ trợ cơ sở dữ liệu cho bất kỳ RDBMS nào (Oracle, MySql, TeraData, Vertica, v.v.), thực thi bất kỳ truy vấn nào / lấy kết quả v.v. với các ví dụ cho kiểm thử E2E
    - Báo cáo đa dạng (Spec, Xunit/Junit, Allure, JSON) và lưu trữ báo cáo Allure và Xunit/Junit trên WebServer.
    - Ví dụ với ứng dụng demo https://search.yahoo.com/ và http://the-internet.herokuapp.com.
    - Tệp `.config` cụ thể cho BrowserStack, Sauce Labs, LambdaTest và Appium (để phát lại trên thiết bị di động). Để thiết lập Appium một nhấp chuột trên máy cục bộ cho iOS và Android, tham khảo [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 với Mocha (V10x).
- Tính năng:
    -  Mô hình Đối tượng Trang sử dụng cách tiếp cận dựa trên lớp kiểu ES6 /ES7 và hỗ trợ TypeScript
    -  Ví dụ với ứng dụng demo https://search.yahoo.com và http://the-internet.herokuapp.com
    -  Ví dụ về thực thi trình duyệt đa dạng và trình duyệt không giao diện sử dụng - Chrome và Firefox
    -  Tích hợp thử nghiệm đám mây với BrowserStack, Sauce Labs, LambdaTest
    -  Báo cáo đa dạng (Spec, Xunit/Junit, Allure, JSON) và lưu trữ báo cáo Allure và Xunit/Junit trên WebServer.
    -  Ví dụ về đọc/ghi dữ liệu từ MS-Excel để quản lý dữ liệu kiểm thử dễ dàng từ nguồn dữ liệu bên ngoài với các ví dụ
    -  Ví dụ về kết nối DB đến bất kỳ RDBMS nào (Oracle, MySql, TeraData, Vertica, v.v.), thực thi bất kỳ truy vấn nào / lấy kết quả v.v. với các ví dụ cho kiểm thử E2E
    -  Tệp `.config` cụ thể cho BrowserStack, Sauce Labs, LambdaTest và Appium (để phát lại trên thiết bị di động). Để thiết lập Appium một nhấp chuột trên máy cục bộ cho iOS và Android, tham khảo [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 với Jasmine (V4x).
- Tính năng:
    -  Mô hình Đối tượng Trang sử dụng cách tiếp cận dựa trên lớp kiểu ES6 /ES7 và hỗ trợ TypeScript
    -  Ví dụ với ứng dụng demo https://search.yahoo.com và http://the-internet.herokuapp.com
    -  Ví dụ về thực thi trình duyệt đa dạng và trình duyệt không giao diện sử dụng - Chrome và Firefox
    -  Tích hợp thử nghiệm đám mây với BrowserStack, Sauce Labs, LambdaTest
    -  Báo cáo đa dạng (Spec, Xunit/Junit, Allure, JSON) và lưu trữ báo cáo Allure và Xunit/Junit trên WebServer.
    -  Ví dụ về đọc/ghi dữ liệu từ MS-Excel để quản lý dữ liệu kiểm thử dễ dàng từ nguồn dữ liệu bên ngoài với các ví dụ
    -  Ví dụ về kết nối DB đến bất kỳ RDBMS nào (Oracle, MySql, TeraData, Vertica, v.v.), thực thi bất kỳ truy vấn nào / lấy kết quả v.v. với các ví dụ cho kiểm thử E2E
    -  Tệp `.config` cụ thể cho BrowserStack, Sauce Labs, LambdaTest và Appium (để phát lại trên thiết bị di động). Để thiết lập Appium một nhấp chuột trên máy cục bộ cho iOS và Android, tham khảo [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Dự án mẫu này có các bài kiểm thử WebdriverIO 8 với cucumber và typescript, theo mẫu đối tượng trang.

- Frameworks:
    - WebdriverIO v8
    - Cucumber v8

- Tính năng:
    - Typescript v5
    - Mẫu đối tượng trang
    - Prettier
    - Hỗ trợ nhiều trình duyệt
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Thực thi song song đa trình duyệt
    - Appium
    - Tích hợp thử nghiệm đám mây với BrowserStack & Sauce Labs
    - Dịch vụ Docker
    - Dịch vụ chia sẻ dữ liệu
    - Tệp cấu hình riêng biệt cho từng dịch vụ
    - Quản lý dữ liệu kiểm thử và đọc theo loại người dùng
    - Báo cáo
      - Dot
      - Spec
      - Báo cáo html cucumber đa dạng với ảnh chụp khi lỗi
    - Pipeline Gitlab cho kho lưu trữ Gitlab
    - GitHub Actions cho kho lưu trữ Github
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
    - Tích hợp kiểm thử Trực quan, Khả năng tiếp cận và API
    - Tích hợp chức năng Email
    - Tích hợp s3 bucket để lưu trữ và truy xuất báo cáo kiểm thử

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Dự án mẫu [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) để giúp bạn bắt đầu kiểm thử chấp nhận ứng dụng web của bạn bằng WebdriverIO, Mocha và Serenity/JS mới nhất.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Báo cáo Serenity BDD

- Tính năng
    - [Mẫu Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Tự động chụp ảnh màn hình khi kiểm thử thất bại, được nhúng trong báo cáo
    - Thiết lập Tích hợp Liên tục (CI) sử dụng [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Báo cáo Serenity BDD demo](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) được xuất bản lên GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Dự án mẫu [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) để giúp bạn bắt đầu kiểm thử chấp nhận ứng dụng web của bạn bằng WebdriverIO, Cucumber và Serenity/JS mới nhất.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Báo cáo Serenity BDD

- Tính năng
    - [Mẫu Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Tự động chụp ảnh màn hình khi kiểm thử thất bại, được nhúng trong báo cáo
    - Thiết lập Tích hợp Liên tục (CI) sử dụng [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Báo cáo Serenity BDD demo](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) được xuất bản lên GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Dự án mẫu để chạy các bài kiểm thử WebdriverIO trong Headspin Cloud (https://www.headspin.io/) sử dụng tính năng Cucumber và mẫu đối tượng trang.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Tính năng
    - Tích hợp đám mây với [Headspin](https://www.headspin.io/)
    - Hỗ trợ Mô hình Đối tượng Trang
    - Chứa các Kịch bản mẫu được viết theo phong cách Khai báo của BDD
    - Tích hợp báo cáo html cucumber

# v7 Boilerplate Projects
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Dự án mẫu để chạy các bài kiểm thử Appium với WebdriverIO cho:

- Ứng dụng gốc iOS/Android
- Ứng dụng lai iOS/Android
- Trình duyệt Android Chrome và iOS Safari

Dự án mẫu này bao gồm những điều sau:

- Framework: Mocha
- Tính năng:
    - Cấu hình cho:
        - Ứng dụng iOS và Android
        - Trình duyệt iOS và Android
    - Trợ giúp cho:
        - WebView
        - Cử chỉ
        - Cảnh báo gốc
        - Bộ chọn
     - Ví dụ kiểm thử cho:
        - WebView
        - Đăng nhập
        - Biểu mẫu
        - Vuốt
        - Trình duyệt

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
Các bài kiểm thử ATDD WEB với Mocha, WebdriverIO v6 với PageObject

- Frameworks
  - WebdriverIO (v7)
  - Mocha
- Tính năng
  - Mô hình [Page Object](pageobjects)
  - Tích hợp Sauce Labs với [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Báo cáo Allure
  - Tự động chụp ảnh màn hình cho các bài kiểm thử thất bại
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
    -   Mẫu đối tượng trang
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) và [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Ví dụ Github Actions
    -   Báo cáo Allure (ảnh chụp khi thất bại)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Dự án mẫu để chạy các bài kiểm thử **WebdriverIO v7** cho những mục sau:

[Script WDIO 7 với TypeScript trong Framework Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Script WDIO 7 với TypeScript trong Framework Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Chạy script WDIO 7 trong Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Nhật ký mạng](https://github.com/17thSep/MonitorNetworkLogs/)

Dự án mẫu cho:

- Ghi nhật ký mạng
- Ghi lại tất cả các cuộc gọi GET/POST hoặc một REST API cụ thể
- Xác nhận tham số Request
- Xác nhận tham số Response
- Lưu tất cả phản hồi trong một tệp riêng biệt

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Dự án mẫu để chạy các bài kiểm thử appium cho ứng dụng gốc và trình duyệt di động sử dụng cucumber v7 và wdio v7 với mẫu đối tượng trang.

- Frameworks
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Tính năng
    - Ứng dụng gốc Android và iOS
    - Trình duyệt Android Chrome
    - Trình duyệt iOS Safari
    - Mô hình đối tượng trang
    - Chứa kịch bản kiểm thử mẫu trong cucumber
    - Tích hợp với nhiều báo cáo html cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Đây là dự án mẫu để giúp bạn hiển thị cách chạy kiểm thử webdriverio từ ứng dụng Web bằng WebdriverIO mới nhất và framework Cucumber. Dự án này nhằm mục đích đóng vai trò là hình ảnh cơ sở mà bạn có thể sử dụng để hiểu cách chạy các bài kiểm thử WebdriverIO trong docker

Dự án này bao gồm:

- DockerFile
- Dự án cucumber

Đọc thêm tại: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Đây là dự án mẫu để giúp bạn hiển thị cách chạy các bài kiểm thử electronJS bằng WebdriverIO. Dự án này nhằm mục đích đóng vai trò là hình ảnh cơ sở mà bạn có thể sử dụng để hiểu cách chạy các bài kiểm thử WebdriverIO electronJS.

Dự án này bao gồm:

- Ứng dụng electronjs mẫu
- Kịch bản kiểm thử cucumber mẫu

Đọc thêm tại: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Đây là dự án mẫu để giúp bạn hiển thị cách tự động hóa ứng dụng Windows bằng winappdriver và WebdriverIO. Dự án này nhằm mục đích đóng vai trò là hình ảnh cơ sở mà bạn có thể sử dụng để hiểu cách chạy các bài kiểm thử windappdriver và WebdriverIO.

Đọc thêm tại: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Đây là dự án mẫu để giúp bạn hiển thị cách chạy khả năng multiremote webdriverio với WebdriverIO mới nhất và framework Jasmine. Dự án này nhằm mục đích đóng vai trò là hình ảnh cơ sở mà bạn có thể sử dụng để hiểu cách chạy các bài kiểm thử WebdriverIO trong docker

Dự án này sử dụng:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Dự án mẫu để chạy các bài kiểm thử appium trên thiết bị Roku thực bằng mocha với mẫu đối tượng trang.

- Frameworks
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Báo cáo Allure

- Tính năng
    - Mô hình đối tượng trang
    - Typescript
    - Chụp ảnh màn hình khi thất bại
    - Ví dụ kiểm thử bằng kênh Roku mẫu

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Dự án PoC cho các bài kiểm thử Cucumber Multiremote E2E cũng như các bài kiểm thử Mocha dựa trên dữ liệu

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Tính năng:
    - Kiểm thử E2E dựa trên Cucumber
    - Kiểm thử dựa trên dữ liệu của Mocha
    - Kiểm thử chỉ Web - trong nền tảng cục bộ cũng như đám mây
    - Kiểm thử chỉ di động - máy ảo cục bộ cũng như từ xa trong đám mây (hoặc thiết bị)
    - Kiểm thử Web + Di động - Multiremote - nền tảng cục bộ cũng như đám mây
    - Nhiều báo cáo tích hợp bao gồm Allure
    - Dữ liệu kiểm thử (JSON / XLSX) được xử lý toàn cục để ghi dữ liệu (tạo ra tại chỗ) vào một tệp sau khi thực thi kiểm thử
    - Quy trình làm việc Github để chạy kiểm thử và tải lên báo cáo allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Đây là một dự án mẫu để giúp hiển thị cách chạy webdriverio multi-remote sử dụng appium và dịch vụ chromedriver với WebdriverIO mới nhất.

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
  - Ví dụ kiểm thử đăng nhập trong http://the-internet.herokuapp.com và [ứng dụng gốc demo WebdriverIO](https://github.com/webdriverio/native-demo-app)