---
id: file-download
title: Tải Tệp Xuống
---

Khi tự động hóa quá trình tải tệp xuống trong kiểm thử web, điều quan trọng là phải xử lý chúng một cách nhất quán trên các trình duyệt khác nhau để đảm bảo việc thực thi kiểm thử đáng tin cậy.

Dưới đây, chúng tôi cung cấp các phương pháp tốt nhất cho việc tải tệp xuống và hướng dẫn cách cấu hình thư mục tải xuống cho **Google Chrome**, **Mozilla Firefox** và **Microsoft Edge**.

## Đường Dẫn Tải Xuống

**Hardcoding** đường dẫn tải xuống trong các kịch bản kiểm thử có thể dẫn đến các vấn đề bảo trì và khả năng di chuyển. Sử dụng **đường dẫn tương đối** cho thư mục tải xuống để đảm bảo tính di động và tương thích trên các môi trường khác nhau.

```javascript
// 👎
// Đường dẫn tải xuống cố định
const downloadPath = '/path/to/downloads';

// 👍
// Đường dẫn tải xuống tương đối
const downloadPath = path.join(__dirname, 'downloads');
```

## Chiến Lược Chờ Đợi

Không thực hiện chiến lược chờ đợi thích hợp có thể dẫn đến tình trạng race condition hoặc các bài kiểm thử không đáng tin cậy, đặc biệt là cho việc hoàn thành tải xuống. Triển khai các chiến lược chờ đợi **rõ ràng** để đợi tệp tải xuống hoàn thành, đảm bảo đồng bộ hóa giữa các bước kiểm thử.

```javascript
// 👎
// Không chờ đợi rõ ràng cho việc hoàn thành tải xuống
await browser.pause(5000);

// 👍
// Đợi cho việc tải xuống tệp hoàn thành
await waitUntil(async ()=> await fs.existsSync(downloadPath), 5000);
```

## Cấu Hình Thư Mục Tải Xuống

Để ghi đè hành vi tải xuống tệp cho **Google Chrome**, **Mozilla Firefox** và **Microsoft Edge**, cung cấp thư mục tải xuống trong các khả năng của WebDriverIO:

<Tabs
defaultValue="chrome"
values={[
{label: 'Chrome', value: 'chrome'},
{label: 'Firefox', value: 'firefox'},
{label: 'Microsoft Edge', value: 'edge'},
]
}>

<TabItem value='chrome'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L8-L16

```

</TabItem>

<TabItem value='firefox'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L20-L32

```

</TabItem>

<TabItem value='edge'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L36-L44

```

</TabItem>

</Tabs>

Để tham khảo cách triển khai ví dụ, xem [WebdriverIO Test Download Behavior Recipe](https://github.com/webdriverio/example-recipes/tree/main/testDownloadBehavior).

## Cấu Hình Tải Xuống Cho Trình Duyệt Chromium

Để thay đổi đường dẫn tải xuống cho các trình duyệt dựa trên __Chromium__ (như Chrome, Edge, Brave, v.v.) sử dụng phương thức `getPuppeteer` của WebDriverIO để truy cập Chrome DevTools.

```javascript
const page = await browser.getPuppeteer();
// Khởi tạo một CDP Session:
const cdpSession = await page.target().createCDPSession();
// Thiết lập Đường Dẫn Tải Xuống:
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## Xử Lý Nhiều Tệp Tải Xuống

Khi đối mặt với các tình huống liên quan đến việc tải xuống nhiều tệp, điều quan trọng là phải triển khai các chiến lược để quản lý và xác thực hiệu quả từng lần tải xuống. Xem xét các phương pháp sau:

__Xử Lý Tải Xuống Tuần Tự:__ Tải xuống các tệp lần lượt và xác minh từng lần tải xuống trước khi bắt đầu lần tiếp theo để đảm bảo thực thi theo thứ tự và xác thực chính xác.

__Xử Lý Tải Xuống Song Song:__ Sử dụng các kỹ thuật lập trình bất đồng bộ để khởi tạo nhiều lần tải xuống tệp đồng thời, tối ưu hóa thời gian thực thi kiểm thử. Triển khai cơ chế xác thực mạnh mẽ để xác minh tất cả các lần tải xuống khi hoàn thành.

## Cân Nhắc Tương Thích Đa Trình Duyệt

Mặc dù WebDriverIO cung cấp một giao diện thống nhất cho việc tự động hóa trình duyệt, nhưng điều quan trọng là phải tính đến sự khác biệt trong hành vi và khả năng của trình duyệt. Cân nhắc kiểm tra chức năng tải xuống tệp của bạn trên các trình duyệt khác nhau để đảm bảo tính tương thích và nhất quán.

__Cấu Hình Dành Riêng Cho Trình Duyệt:__ Điều chỉnh cài đặt đường dẫn tải xuống và chiến lược chờ đợi để phù hợp với sự khác biệt trong hành vi và tùy chọn của trình duyệt trên Chrome, Firefox, Edge và các trình duyệt được hỗ trợ khác.

__Tương Thích Phiên Bản Trình Duyệt:__ Thường xuyên cập nhật WebDriverIO và các phiên bản trình duyệt của bạn để tận dụng các tính năng và cải tiến mới nhất đồng thời đảm bảo tương thích với bộ kiểm thử hiện có của bạn.