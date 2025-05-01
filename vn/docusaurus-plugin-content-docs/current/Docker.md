---
id: docker
title: Docker
---

Docker là một công nghệ container hóa mạnh mẽ cho phép đóng gói bộ test của bạn vào một container hoạt động giống nhau trên mọi hệ thống. Điều này có thể tránh được sự không ổn định do các phiên bản trình duyệt hoặc nền tảng khác nhau. Để chạy các bài kiểm tra của bạn trong một container, hãy tạo một file `Dockerfile` trong thư mục dự án của bạn, ví dụ:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Change the browser and version according to your needs
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Đảm bảo bạn không bao gồm `node_modules` trong Docker image của bạn và cài đặt chúng khi xây dựng image. Để làm điều đó, hãy thêm file `.dockerignore` với nội dung sau:

```
node_modules
```

:::info
Chúng ta đang sử dụng một Docker image đã được cài đặt sẵn Selenium và Google Chrome. Có nhiều image khác nhau với các thiết lập trình duyệt và phiên bản trình duyệt khác nhau. Hãy xem các image được duy trì bởi dự án Selenium [trên Docker Hub](https://hub.docker.com/u/selenium).
:::

Vì chúng ta chỉ có thể chạy Google Chrome ở chế độ headless trong container Docker của mình, chúng ta phải sửa đổi file `wdio.conf.js` để đảm bảo điều đó:

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--no-sandbox',
                '--disable-infobars',
                '--headless',
                '--disable-gpu',
                '--window-size=1440,735'
            ],
        }
    }],
    // ...
}
```

Như đã đề cập trong [Automation Protocols](/docs/automationProtocols), bạn có thể chạy WebdriverIO sử dụng giao thức WebDriver hoặc giao thức WebDriver BiDi. Hãy đảm bảo rằng phiên bản Chrome được cài đặt trên image của bạn khớp với phiên bản [Chromedriver](https://www.npmjs.com/package/chromedriver) bạn đã định nghĩa trong `package.json`.

Để xây dựng container Docker, bạn có thể chạy:

```sh
docker build -t mytest -f Dockerfile .
```

Sau đó để chạy các bài kiểm tra, thực thi:

```sh
docker run -it mytest
```

Để biết thêm thông tin về cách cấu hình Docker image, hãy xem [Tài liệu Docker](https://docs.docker.com/).