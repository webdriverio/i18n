---
id: debugging
title: Gỡ lỗi
---

Gỡ lỗi khó khăn hơn đáng kể khi nhiều tiến trình chạy hàng chục bài kiểm tra trên nhiều trình duyệt.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

Trước tiên, việc giới hạn song song bằng cách đặt `maxInstances` thành `1`, và chỉ nhắm vào các đặc tả và trình duyệt cần được gỡ lỗi là rất hữu ích.

Trong `wdio.conf`:

```js
export const config = {
    // ...
    maxInstances: 1,
    specs: [
        '**/myspec.spec.js'
    ],
    capabilities: [{
        browserName: 'firefox'
    }],
    // ...
}
```

## Lệnh Debug

Trong nhiều trường hợp, bạn có thể sử dụng [`browser.debug()`](/docs/api/browser/debug) để tạm dừng bài kiểm tra và kiểm tra trình duyệt.

Giao diện dòng lệnh của bạn cũng sẽ chuyển sang chế độ REPL. Chế độ này cho phép bạn thao tác với các lệnh và phần tử trên trang. Trong chế độ REPL, bạn có thể truy cập đối tượng `browser`&mdash;hoặc các hàm `$` và `$$`&mdash;giống như trong các bài kiểm tra của bạn.

Khi sử dụng `browser.debug()`, bạn có thể cần tăng thời gian chờ của trình chạy kiểm tra để tránh trường hợp trình chạy làm thất bại bài kiểm tra vì mất quá nhiều thời gian. Ví dụ:

Trong `wdio.conf`:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

Xem [timeouts](timeouts) để biết thêm thông tin về cách thực hiện điều này khi sử dụng các framework khác.

Để tiếp tục các bài kiểm tra sau khi gỡ lỗi, trong shell sử dụng phím tắt `^C` hoặc lệnh `.exit`.
## Cấu hình động

Lưu ý rằng `wdio.conf.js` có thể chứa Javascript. Vì bạn có thể không muốn thay đổi vĩnh viễn giá trị thời gian chờ thành 1 ngày, nên thường hữu ích khi thay đổi các cài đặt này từ dòng lệnh bằng cách sử dụng biến môi trường.

Sử dụng kỹ thuật này, bạn có thể thay đổi cấu hình một cách linh hoạt:

```js
const debug = process.env.DEBUG
const defaultCapabilities = ...
const defaultTimeoutInterval = ...
const defaultSpecs = ...

export const config = {
    // ...
    maxInstances: debug ? 1 : 100,
    capabilities: debug ? [{ browserName: 'chrome' }] : defaultCapabilities,
    execArgv: debug ? ['--inspect'] : [],
    jasmineOpts: {
      defaultTimeoutInterval: debug ? (24 * 60 * 60 * 1000) : defaultTimeoutInterval
    }
    // ...
}
```

Sau đó, bạn có thể thêm cờ `debug` vào trước lệnh `wdio`:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...và gỡ lỗi tệp đặc tả của bạn với DevTools!

## Gỡ lỗi với Visual Studio Code (VSCode)

Nếu bạn muốn gỡ lỗi các bài kiểm tra của mình với các điểm dừng trong VSCode phiên bản mới nhất, bạn có hai tùy chọn để bắt đầu trình gỡ lỗi, trong đó phương pháp 1 là dễ dàng nhất:
 1. tự động gắn trình gỡ lỗi
 2. gắn trình gỡ lỗi bằng tệp cấu hình

### VSCode Toggle Auto Attach

Bạn có thể tự động gắn trình gỡ lỗi bằng cách làm theo các bước sau trong VSCode:
 - Nhấn CMD + Shift + P (Linux và Macos) hoặc CTRL + Shift + P (Windows)
 - Nhập "attach" vào trường đầu vào
 - Chọn "Debug: Toggle Auto Attach"
 - Chọn "Only With Flag"

 Vậy là xong! Bây giờ khi bạn chạy các bài kiểm tra (nhớ rằng bạn sẽ cần đặt cờ --inspect trong cấu hình như đã hướng dẫn trước đó), nó sẽ tự động khởi động trình gỡ lỗi và dừng lại tại điểm dừng đầu tiên mà nó gặp phải.

### Tệp cấu hình VSCode

Có thể chạy tất cả hoặc chọn (các) tệp đặc tả. (Các) cấu hình gỡ lỗi phải được thêm vào `.vscode/launch.json`, để gỡ lỗi đặc tả đã chọn, thêm cấu hình sau:
```
{
    "name": "run select spec",
    "type": "node",
    "request": "launch",
    "args": ["wdio.conf.js", "--spec", "${file}"],
    "cwd": "${workspaceFolder}",
    "autoAttachChildProcesses": true,
    "program": "${workspaceRoot}/node_modules/@wdio/cli/bin/wdio.js",
    "console": "integratedTerminal",
    "skipFiles": [
        "${workspaceFolder}/node_modules/**/*.js",
        "${workspaceFolder}/lib/**/*.js",
        "<node_internals>/**/*.js"
    ]
},
```

Để chạy tất cả các tệp đặc tả, hãy xóa `"--spec", "${file}"` khỏi `"args"`

Ví dụ: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

Thông tin bổ sung: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Repl Động với Atom

Nếu bạn là một hacker [Atom](https://atom.io/), bạn có thể thử [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) của [@kurtharriger](https://github.com/kurtharriger), đây là một repl động cho phép bạn thực thi từng dòng mã trong Atom. Xem video [này](https://www.youtube.com/watch?v=kdM05ChhLQE) trên YouTube để xem bản demo.

## Gỡ lỗi với WebStorm / Intellij
Bạn có thể tạo cấu hình gỡ lỗi node.js như sau:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
Xem [Video YouTube](https://www.youtube.com/watch?v=Qcqnmle6Wu8) này để biết thêm thông tin về cách tạo cấu hình.

## Gỡ lỗi các bài kiểm tra không ổn định

Các bài kiểm tra không ổn định có thể thực sự khó gỡ lỗi, vì vậy đây là một số mẹo về cách bạn có thể thử và tái tạo kết quả không ổn định mà bạn nhận được trong CI của mình, trên máy cục bộ.

### Mạng
Để gỡ lỗi liên quan đến mạng không ổn định, hãy sử dụng lệnh [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork).
```js
await browser.throttleNetwork('Regular3G')
```

### Tốc độ hiển thị
Để gỡ lỗi liên quan đến tốc độ thiết bị không ổn định, hãy sử dụng lệnh [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU).
Điều này sẽ khiến các trang của bạn hiển thị chậm hơn, có thể do nhiều nguyên nhân như chạy nhiều tiến trình trong CI của bạn, điều này có thể làm chậm các bài kiểm tra.
```js
await browser.throttleCPU(4)
```

### Tốc độ thực thi kiểm tra

Nếu các bài kiểm tra của bạn dường như không bị ảnh hưởng, có thể WebdriverIO nhanh hơn cập nhật từ framework frontend / trình duyệt. Điều này xảy ra khi sử dụng các assertion đồng bộ vì WebdriverIO không có cơ hội thử lại các assertion này nữa. Một số ví dụ về mã có thể bị lỗi vì điều này:
```js
expect(elementList.length).toEqual(7) // danh sách có thể chưa được điền đầy đủ tại thời điểm assertion
expect(await elem.getText()).toEqual('this button was clicked 3 times') // văn bản có thể chưa được cập nhật tại thời điểm assertion dẫn đến lỗi ("this button was clicked 2 times" không khớp với giá trị mong đợi "this button was clicked 3 times")
expect(await elem.isDisplayed()).toBe(true) // có thể chưa được hiển thị
```
Để giải quyết vấn đề này, nên sử dụng các assertion bất đồng bộ. Các ví dụ trên sẽ trông như thế này:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
Sử dụng các assertion này, WebdriverIO sẽ tự động đợi cho đến khi điều kiện khớp. Khi khẳng định văn bản, điều này có nghĩa là phần tử cần tồn tại và văn bản cần bằng với giá trị mong đợi.
Chúng tôi nói thêm về điều này trong [Hướng dẫn Thực hành Tốt nhất](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions) của chúng tôi.