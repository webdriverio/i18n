---
id: headless-and-xvfb
title: Headless & Xvfb với Testrunner
description: Cách WebdriverIO sử dụng Xvfb cho kiểm thử headless trên Linux, tùy chọn cấu hình, công thức CI và xử lý sự cố.
---

Trang này giải thích cách testrunner của WebdriverIO hỗ trợ thực thi headless trên Linux sử dụng Xvfb (X Virtual Framebuffer). Nó bao gồm khi nào Xvfb hữu ích, cách cấu hình và cách hoạt động trong CI và Docker.

## Khi nào sử dụng Xvfb so với headless tự nhiên

- Sử dụng headless tự nhiên (ví dụ: Chrome `--headless=...`) khi có thể để giảm thiểu overhead.
- Sử dụng Xvfb khi:
  - Kiểm thử Electron hoặc các ứng dụng yêu cầu trình quản lý cửa sổ hoặc môi trường desktop
  - Bạn phụ thuộc vào GLX hoặc hành vi phụ thuộc trình quản lý cửa sổ
  - Công cụ của bạn cần một display server (`DISPLAY`)
  - Bạn gặp lỗi Chromium như:
    - `session not created: probably user data directory is already in use ...`
    - `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`
    Lỗi xung đột thư mục dữ liệu người dùng có thể gây hiểu lầm vì nó thường là kết quả của sự sụp đổ trình duyệt và khởi động lại ngay lập tức sử dụng cùng thư mục hồ sơ từ phiên trước đó. Đảm bảo một hiển thị ổn định (ví dụ: thông qua Xvfb) thường giải quyết vấn đề - nếu không, bạn nên truyền một `--user-data-dir` duy nhất cho mỗi worker.

## Cấu hình

Bốn tùy chọn runner kiểm soát hành vi Xvfb:

- `autoXvfb` (boolean, mặc định: true)
  - Chuyển đổi quyết định việc sử dụng. Nếu `false`, runner không bao giờ sử dụng Xvfb.
  - Nếu `true`, runner có thể sử dụng Xvfb khi cần.

- `xvfbAutoInstall` (boolean, mặc định: false)
  - Bật cài đặt tự động `xvfb-run` nếu thiếu
  - Khi false, runner sẽ cảnh báo và tiếp tục mà không cài đặt

- `xvfbAutoInstallMode` ('root' | 'sudo', mặc định: 'sudo')
  - 'root': chỉ cài đặt nếu chạy với quyền root (không sudo)
  - 'sudo': cho phép sudo không tương tác (`sudo -n`) nếu không phải root; bỏ qua nếu không có sudo

- `xvfbAutoInstallCommand` (string | string[], tùy chọn)
  - Lệnh tùy chỉnh để sử dụng cho việc cài đặt thay vì phát hiện trình quản lý gói tích hợp
  - Khi được cung cấp, lệnh này được thực thi nguyên bản và ghi đè lên logic cài đặt tích hợp

- `xvfbMaxRetries` (number, mặc định: 3)
  - Số lần thử lại cho các lỗi quá trình xvfb.
  - Hữu ích cho môi trường CI không ổn định nơi khởi động Xvfb có thể thỉnh thoảng thất bại.

- `xvfbRetryDelay` (number, mặc định: 1000)
  - Độ trễ cơ bản giữa các lần thử lại tính bằng mili giây cho các lỗi quá trình xvfb.
  - Sử dụng độ trễ tăng dần: độ trễ × số lần thử (ví dụ: 1000ms, 2000ms, 3000ms, v.v.).

Ví dụ:

```ts
export const config: WebdriverIO.Config = {
  // Sử dụng Xvfb khi cần
  autoXvfb: true,

  // Tự động cài đặt gói Xvfb sử dụng sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

```ts
export const config: WebdriverIO.Config = {
  // Sử dụng Xvfb khi cần
  autoXvfb: true,

  // Tự động cài đặt gói Xvfb sử dụng lệnh tùy chỉnh và sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',
  xvfbAutoInstallCommand: 'curl -L https://github.com/X11/xvfb/releases/download/v1.20.14/xvfb-linux-x64.tar.gz | tar -xz -C /usr/local/bin/',

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

```ts
export const config: WebdriverIO.Config = {
  // Sử dụng Xvfb khi cần
  autoXvfb: true,

  // Tự động cài đặt gói Xvfb sử dụng sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  // Cấu hình hành vi thử lại cho môi trường CI không ổn định
  xvfbMaxRetries: 5,
  xvfbRetryDelay: 1500,

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

## Logic phát hiện

- Runner xem xét Xvfb khi:

  - Chạy trên Linux
  - Không có `DISPLAY` được thiết lập (môi trường headless), hoặc cờ trình duyệt headless được truyền vào

- Nếu `DISPLAY` được thiết lập, runner sẽ không bắt buộc Xvfb theo mặc định và sẽ tôn trọng máy chủ X/trình quản lý cửa sổ hiện có của bạn.

Ghi chú:
- `autoXvfb: false` vô hiệu hóa hoàn toàn việc sử dụng Xvfb (không bao bọc với `xvfb-run`).
- `xvfbAutoInstall` chỉ ảnh hưởng đến việc cài đặt nếu `xvfb-run` bị thiếu; nó không bật/tắt việc sử dụng.
- `xvfbAutoInstallMode` kiểm soát phương pháp cài đặt: 'root' cho cài đặt chỉ với quyền root, 'sudo' cho cài đặt dựa trên sudo (mặc định: 'sudo').
- Cài đặt gói tích hợp luôn không tương tác. Chỉ root trừ khi bạn chọn chế độ 'sudo'.
- Cơ chế thử lại sử dụng độ trễ tăng dần: `xvfbRetryDelay × số lần thử` (ví dụ: 1000ms, 2000ms, 3000ms, v.v.).

## Sử dụng DISPLAY hiện có trong CI

Nếu CI của bạn thiết lập máy chủ X/trình quản lý cửa sổ riêng (ví dụ: với `Xvfb :99` và WM), bạn có thể:

- Để `autoXvfb: true` và đảm bảo `DISPLAY` được xuất; runner sẽ tôn trọng nó và tránh bao bọc.
- Hoặc đặt `autoXvfb: false` để vô hiệu hóa rõ ràng mọi hành vi Xvfb từ runner.

## Công thức CI và Docker

GitHub Actions (sử dụng headless tự nhiên):

```yaml
- name: Run tests
  run: npx wdio run ./wdio.conf.ts
```

GitHub Actions (hiển thị ảo qua Xvfb nếu thiếu và đã chọn):

```ts
// wdio.conf.ts
export const config = {
  autoXvfb: true,
  xvfbAutoInstall: true
}
```

Docker (ví dụ Ubuntu/Debian – cài đặt trước xvfb):

```Dockerfile
RUN apt-get update -qq && apt-get install -y xvfb
```

Đối với các bản phân phối khác, điều chỉnh trình quản lý gói và tên gói tương ứng (ví dụ: `dnf install xorg-x11-server-Xvfb` trên Fedora/dựa trên RHEL, `zypper install xvfb-run` trên openSUSE/SLE).

## Hỗ trợ cài đặt tự động (xvfbAutoInstall)

Khi `xvfbAutoInstall` được bật, WebdriverIO cố gắng cài đặt `xvfb` sử dụng trình quản lý gói của hệ thống bạn. Các trình quản lý và gói sau được hỗ trợ:

| Trình quản lý gói | Lệnh           | Bản phân phối (ví dụ)                                     | Tên gói                         |
|-------------------|----------------|-------------------------------------------------------------|----------------------------------|
| apt               | `apt-get`      | Ubuntu, Debian, Pop!_OS, Mint, Elementary, Zorin, v.v.      | `xvfb`                           |
| dnf               | `dnf`          | Fedora, Rocky Linux, AlmaLinux, Nobara, Bazzite, v.v.       | `xorg-x11-server-Xvfb`           |
| yum               | `yum`          | CentOS, RHEL (legacy)                                       | `xorg-x11-server-Xvfb`           |
| zypper            | `zypper`       | openSUSE, SUSE Linux Enterprise                             | `xvfb-run`                       |
| pacman            | `pacman`       | Arch Linux, Manjaro, EndeavourOS, CachyOS, v.v.             | `xorg-server-xvfb`               |
| apk               | `apk`          | Alpine Linux, PostmarketOS                                  | `xvfb-run`                       |
| xbps-install      | `xbps-install` | Void Linux                                                  | `xvfb`                           |

Ghi chú:
- Nếu môi trường của bạn sử dụng trình quản lý gói khác, việc cài đặt sẽ thất bại với lỗi; hãy cài đặt `xvfb` thủ công.
- Tên gói phụ thuộc vào bản phân phối; bảng phản ánh tên phổ biến theo họ.

## Xử lý sự cố

- "xvfb-run failed to start"
  - Runner tự động thử lại các lỗi liên quan đến Xvfb với backoff tăng dần. Nếu lỗi vẫn tiếp diễn, hãy tăng `xvfbMaxRetries` và `xvfbRetryDelay` cho môi trường không ổn định.

- Xvfb bất ngờ được bao bọc trong CI
  - Nếu bạn có thiết lập `DISPLAY` / WM tùy chỉnh, hãy đặt `autoXvfb: false` hoặc đảm bảo `DISPLAY` được xuất trước khi runner bắt đầu.

- Thiếu `xvfb-run`
  - Giữ `xvfbAutoInstall: false` để tránh sửa đổi môi trường; cài đặt qua image cơ sở của bạn hoặc đặt `xvfbAutoInstall: true` để chọn tham gia.

- Lỗi khởi động Xvfb thường xuyên trong CI
  - Tăng `xvfbMaxRetries` (ví dụ: lên 5-10) và `xvfbRetryDelay` (ví dụ: lên 2000ms) để có hành vi bền bỉ hơn trong môi trường không ổn định.

## Nâng cao

- Runner tạo quá trình thông qua một factory bao bọc worker node với `xvfb-run` nếu Xvfb cần thiết và có sẵn.
- Cờ trình duyệt headless (Chrome/Edge/Firefox) báo hiệu sử dụng headless và có thể kích hoạt Xvfb trong môi trường không có `DISPLAY`.