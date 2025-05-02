---
id: watcher
title: Theo Dõi File Kiểm Thử
---

Với trình chạy kiểm thử WDIO, bạn có thể theo dõi các file trong khi đang làm việc với chúng. Chúng sẽ tự động chạy lại nếu bạn thay đổi nội dung trong ứng dụng hoặc trong file kiểm thử của mình. Bằng cách thêm cờ `--watch` khi gọi lệnh `wdio`, trình chạy kiểm thử sẽ đợi các thay đổi về file sau khi đã chạy tất cả các bài kiểm thử, ví dụ:

```sh
wdio wdio.conf.js --watch
```

Mặc định, nó chỉ theo dõi sự thay đổi trong các file `specs` của bạn. Tuy nhiên, bằng cách thiết lập thuộc tính `filesToWatch` trong file `wdio.conf.js` chứa danh sách đường dẫn các file (hỗ trợ globbing), nó cũng sẽ theo dõi những file này để khi có thay đổi sẽ chạy lại toàn bộ bộ kiểm thử. Điều này rất hữu ích nếu bạn muốn tự động chạy lại tất cả các bài kiểm thử khi bạn thay đổi mã ứng dụng của mình, ví dụ:

```js
// wdio.conf.js
export const config = {
    // ...
    filesToWatch: [
        // watch for all JS files in my app
        './src/app/**/*.js'
    ],
    // ...
}
```

:::info
Cố gắng chạy các bài kiểm thử song song càng nhiều càng tốt. Các bài kiểm thử E2E, về bản chất, chạy chậm. Việc chạy lại các bài kiểm thử chỉ hữu ích nếu bạn có thể giữ thời gian chạy cho mỗi bài kiểm thử ngắn. Để tiết kiệm thời gian, trình chạy kiểm thử giữ các phiên WebDriver hoạt động trong khi chờ đợi thay đổi file. Hãy đảm bảo rằng backend WebDriver của bạn có thể được điều chỉnh để không tự động đóng phiên làm việc nếu không có lệnh nào được thực thi sau một khoảng thời gian nhất định.
:::