---
id: boilerplates
title: Các Dự Án Mẫu
---

Theo thời gian, cộng đồng của chúng tôi đã phát triển một số dự án mà bạn có thể sử dụng làm nguồn cảm hứng để thiết lập bộ kiểm thử của riêng mình.

# Các Dự Án Mẫu v8

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Boilerplate của chúng tôi cho bộ kiểm thử Cucumber. Chúng tôi đã tạo hơn 150 định nghĩa bước định sẵn cho bạn, để bạn có thể bắt đầu viết tệp tính năng trong dự án của mình ngay lập tức.

- Framework:
    - Cucumber
    - WebdriverIO
- Tính năng:
    - Hơn 150 bước định sẵn bao gồm hầu hết mọi thứ bạn cần
    - Tích hợp chức năng Multiremote của WebdriverIO
    - Ứng dụng demo riêng

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Dự án boilerplate để chạy các bài kiểm thử WebdriverIO với Jasmine sử dụng các tính năng Babel và mẫu page objects.

- Frameworks
    - WebdriverIO
    - Jasmine
- Tính năng
    - Mẫu Page Object
    - Tích hợp Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Dự án boilerplate để chạy các bài kiểm thử WebdriverIO trên một ứng dụng Electron tối giản.

- Frameworks
    - WebdriverIO
    - Mocha
- Tính năng
    - Mô phỏng API Electron

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Dự án boilerplate này có các bài kiểm thử WebdriverIO 8 với cucumber và typescript, theo mẫu các đối tượng trang.

- Frameworks:
    - WebdriverIO v8
    - Cucumber v8

- Tính năng:
    - Typescript v5
    - Mẫu Page Object
    - Prettier
    - Hỗ trợ nhiều trình duyệt
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Thực thi song song trên nhiều trình duyệt
    - Appium
    - Tích hợp kiểm thử trên đám mây với BrowserStack & Sauce Labs
    - Dịch vụ Docker
    - Dịch vụ chia sẻ dữ liệu
    - Tệp cấu hình riêng biệt cho từng dịch vụ
    - Quản lý dữ liệu kiểm thử & đọc theo loại người dùng
    - Báo cáo
      - Dot
      - Spec
      - Nhiều báo cáo html cucumber với ảnh chụp lỗi
    - Pipeline Gitlab cho kho lưu trữ Gitlab
    - Github actions cho kho lưu trữ Github
    - Docker compose để thiết lập docker hub
    - Kiểm thử khả năng tiếp cận sử dụng AXE
    - Kiểm thử trực quan sử dụng Applitools
    - Cơ chế ghi nhật ký

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 với Cucumber (V8x).
- Tính năng:
    - Mô hình Page Objects sử dụng phương pháp lớp dựa trên ES6 /ES7 và hỗ trợ TypeScript
    - Các ví dụ về tùy chọn bộ chọn đa để truy vấn phần tử với nhiều bộ chọn cùng một lúc
    - Các ví dụ về thực thi đa trình duyệt và trình duyệt headless sử dụng - Chrome và Firefox
    - Tích hợp kiểm thử đám mây với BrowserStack, Sauce Labs, LambdaTest
    - Các ví dụ về đọc/ghi dữ liệu từ MS-Excel để quản lý dữ liệu kiểm thử dễ dàng từ các nguồn dữ liệu bên ngoài với ví dụ
    - Hỗ trợ cơ sở dữ liệu cho bất kỳ RDBMS nào (Oracle, MySql, TeraData, Vertica, v.v.), thực thi bất kỳ truy vấn nào / lấy tập kết quả, v.v. với các ví dụ cho kiểm thử E2E
    - Báo cáo đa dạng (Spec, Xunit/Junit, Allure, JSON) và lưu trữ báo cáo Allure và Xunit/Junit trên WebServer.
    - Các ví dụ với ứng dụng demo https://search.yahoo.com/ và http://the-internet.herokuapp.com.
    - Tệp `.config` cụ thể cho BrowserStack, Sauce Labs, LambdaTest và Appium (để phát lại trên thiết bị di động). Để thiết lập Appium với một cú nhấp chuột trên máy cục bộ cho iOS và Android, tham khảo [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 với Mocha (V10x).
- Tính năng:
    - Mô hình Page Objects sử dụng phương pháp lớp dựa trên ES6 /ES7 và hỗ trợ TypeScript
    - Các ví dụ với ứng dụng demo https://search.yahoo.com và http://the-internet.herokuapp.com
    - Các ví dụ về thực thi đa trình duyệt và trình duyệt headless sử dụng - Chrome và Firefox
    - Tích hợp kiểm thử đám mây với BrowserStack, Sauce Labs, LambdaTest
    - Báo cáo đa dạng (Spec, Xunit/Junit, Allure, JSON) và lưu trữ báo cáo Allure và Xunit/Junit trên WebServer.
    - Các ví dụ về đọc/ghi dữ liệu từ MS-Excel để quản lý dữ liệu kiểm thử dễ dàng từ các nguồn dữ liệu bên ngoài với ví dụ
    - Các ví dụ về kết nối DB đến bất kỳ RDBMS nào (Oracle, MySql, TeraData, Vertica, v.v.), bất kỳ thực thi truy vấn nào / lấy tập kết quả, v.v. với các ví dụ cho kiểm thử E2E
    - Tệp `.config` cụ thể cho BrowserStack, Sauce Labs, LambdaTest và Appium (để phát lại trên thiết bị di động). Để thiết lập Appium với một cú nhấp chuột trên máy cục bộ cho iOS và Android, tham khảo [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 với Jasmine (V4x).
- Tính năng:
    - Mô hình Page Objects sử dụng phương pháp lớp dựa trên ES6 /ES7 và hỗ trợ TypeScript
    - Các ví dụ với ứng dụng demo https://search.yahoo.com và http://the-internet.herokuapp.com
    - Các ví dụ về thực thi đa trình duyệt và trình duyệt headless sử dụng - Chrome và Firefox
    - Tích hợp kiểm thử đám mây với BrowserStack, Sauce Labs, LambdaTest
    - Báo cáo đa dạng (Spec, Xunit/Junit, Allure, JSON) và lưu trữ báo cáo Allure và Xunit/Junit trên WebServer.
    - Các ví dụ về đọc/ghi dữ liệu từ MS-Excel để quản lý dữ liệu kiểm thử dễ dàng từ các nguồn dữ liệu bên ngoài với ví dụ
    - Các ví dụ về kết nối DB đến bất kỳ RDBMS nào (Oracle, MySql, TeraData, Vertica, v.v.), bất kỳ thực thi truy vấn nào / lấy tập kết quả, v.v. với các ví dụ cho kiểm thử E2E
    - Tệp `.config` cụ thể cho BrowserStack, Sauce Labs, LambdaTest và Appium (để phát lại trên thiết bị di động). Để thiết lập Appium với một cú nhấp chuột trên máy cục bộ cho iOS và Android, tham khảo [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

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

Dự án mẫu [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) để giúp bạn bắt đầu kiểm thử chấp nhận cho ứng dụng web của bạn sử dụng WebdriverIO, Mocha, và Serenity/JS mới nhất.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Báo cáo Serenity BDD

- Tính năng
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Chụp ảnh màn hình tự động khi thất bại, được nhúng trong báo cáo
    - Thiết lập Tích hợp Liên tục (CI) sử dụng [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Báo cáo Serenity BDD demo](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) được xuất bản lên GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Dự án mẫu [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) để giúp bạn bắt đầu kiểm thử chấp nhận cho ứng dụng web của bạn sử dụng WebdriverIO, Cucumber, và Serenity/JS mới nhất.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Báo cáo Serenity BDD

- Tính năng
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Chụp ảnh màn hình tự động khi thất bại, được nhúng trong báo cáo
    - Thiết lập Tích hợp Liên tục (CI) sử dụng [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Báo cáo Serenity BDD demo](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) được xuất bản lên GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Dự án boilerplate để chạy các bài kiểm thử WebdriverIO trong Headspin Cloud (https://www.headspin.io/) sử dụng tính năng Cucumber và mẫu đối tượng trang.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Tính năng
    - Tích hợp đám mây với [Headspin](https://www.headspin.io/)
    - Hỗ trợ Mô hình Page Object
    - Chứa các Kịch bản mẫu được viết theo phong cách Khai báo của BDD
    - Tích hợp báo cáo html cucumber

# Các Dự Án Mẫu v7

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Dự án boilerplate để chạy các bài kiểm thử Appium với WebdriverIO cho:

- Ứng dụng Native iOS/Android
- Ứng dụng Hybrid iOS/Android
- Trình duyệt Android Chrome và iOS Safari

Boilerplate này bao gồm:

- Framework: Mocha
- Tính năng:
    - Cấu hình cho:
        - Ứng dụng iOS và Android
        - Trình duyệt iOS và Android
    - Trợ giúp cho:
        - WebView
        - Cử chỉ
        - Cảnh báo native
        - Bộ chọn
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
  - Mô hình [Page Object](pageobjects)
  - Tích hợp Sauce Labs với [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Báo cáo Allure
  - Chụp ảnh màn hình tự động cho các bài kiểm thử thất bại
  - Ví dụ CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Dự án boilerplate để chạy kiểm thử E2E với Mocha.

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
    -   Báo cáo Allure (chụp ảnh màn hình khi thất bại)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Dự án boilerplate để chạy các bài kiểm thử **WebdriverIO v7** cho:

[WDIO 7 scripts với TypeScript trong Cucumber Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[WDIO 7 scripts với TypeScript trong Mocha Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Chạy WDIO 7 script trong Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Nhật ký mạng](https://github.com/17thSep/MonitorNetworkLogs/)

Dự án boilerplate cho:

- Ghi lại Nhật ký Mạng
- Ghi lại tất cả cuộc gọi GET/POST hoặc một REST API cụ thể
- Kiểm tra tham số Yêu cầu
- Kiểm tra tham số Phản hồi
- Lưu trữ tất cả phản hồi trong một tệp riêng biệt

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Dự án boilerplate để chạy các bài kiểm thử appium cho ứng dụng native và trình duyệt di động sử dụng cucumber v7 và wdio v7 với mẫu page object.

- Frameworks
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Tính năng
    - Ứng dụng Native Android và iOS
    - Trình duyệt Android Chrome
    - Trình duyệt iOS Safari
    - Mô hình Page Object
    - Chứa các kịch bản kiểm thử mẫu trong cucumber
    - Tích hợp với nhiều báo cáo html cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Đây là dự án mẫu để giúp bạn hiểu cách chạy bài kiểm thử webdriverio từ các ứng dụng Web sử dụng WebdriverIO mới nhất và framework Cucumber. Dự án này nhằm mục đích làm hình ảnh cơ sở mà bạn có thể sử dụng để hiểu cách chạy các bài kiểm thử WebdriverIO trong docker

Dự án này bao gồm:

- DockerFile
- Dự án cucumber

Đọc thêm tại: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Đây là dự án mẫu để giúp bạn hiểu cách chạy các bài kiểm thử electronJS sử dụng WebdriverIO. Dự án này nhằm mục đích làm hình ảnh cơ sở mà bạn có thể sử dụng để hiểu cách chạy các bài kiểm thử WebdriverIO electronJS.

Dự án này bao gồm:

- Ứng dụng electronjs mẫu
- Tập lệnh kiểm thử cucumber mẫu

Đọc thêm tại: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Đây là dự án mẫu để giúp bạn hiểu cách tự động hóa ứng dụng windows sử dụng winappdriver và WebdriverIO. Dự án này nhằm mục đích làm hình ảnh cơ sở mà bạn có thể sử dụng để hiểu cách chạy các bài kiểm thử windappdriver và WebdriverIO.

Đọc thêm tại: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Đây là dự án mẫu để giúp bạn hiểu cách chạy khả năng multiremote webdriverio với WebdriverIO mới nhất và framework Jasmine. Dự án này nhằm mục đích làm hình ảnh cơ sở mà bạn có thể sử dụng để hiểu cách chạy các bài kiểm thử WebdriverIO trong docker

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
    - Mô hình Page Object
    - Typescript
    - Chụp ảnh màn hình khi thất bại
    - Các bài kiểm thử ví dụ sử dụng kênh Roku mẫu

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Dự án PoC cho các bài kiểm thử Cucumber Multiremote E2E cũng như các bài kiểm thử Mocha dựa trên dữ liệu

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Tính năng:
    - Các bài kiểm thử E2E dựa trên Cucumber
    - Các bài kiểm thử dựa trên dữ liệu với Mocha
    - Kiểm thử chỉ Web - trong cả nền tảng cục bộ và đám mây
    - Kiểm thử chỉ Di động - cả máy ảo cục bộ và từ xa (hoặc thiết bị)
    - Kiểm thử Web + Di động - Multiremote - cả nền tảng cục bộ và đám mây
    - Nhiều Báo cáo được tích hợp bao gồm Allure
    - Dữ liệu kiểm thử (JSON / XLSX) được xử lý toàn cục để ghi dữ liệu (được tạo ngay lập tức) vào tệp sau khi thực thi kiểm thử
    - Github workflow để chạy kiểm thử và tải lên báo cáo allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Đây là dự án boilerplate để giúp hiển thị cách chạy webdriverio multi-remote sử dụng dịch vụ appium và chromedriver với WebdriverIO mới nhất.

- Frameworks
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Tính năng
  - Mô hình [Page Object](pageobjects)
  - Typescript
  - Kiểm thử Web + Di động - Multiremote
  - Ứng dụng Native Android và iOS
  - Appium
  - Chromedriver
  - ESLint
  - Các ví dụ kiểm thử Đăng nhập trong http://the-internet.herokuapp.com và [ứng dụng demo native WebdriverIO](https://github.com/webdriverio/native-demo-app)