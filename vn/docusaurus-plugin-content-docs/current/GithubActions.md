---
id: githubactions
title: Github Actions
---

Nếu kho lưu trữ của bạn được lưu trữ trên Github, bạn có thể sử dụng [Github Actions](https://docs.github.com/en/actions) để chạy các bài kiểm tra của bạn trên cơ sở hạ tầng của Github.

1. mỗi khi bạn đẩy các thay đổi
2. trên mỗi lần tạo pull request
3. vào thời gian đã lên lịch
4. bằng kích hoạt thủ công

Trong thư mục gốc của kho lưu trữ của bạn, tạo một thư mục `.github/workflows`. Thêm một tệp Yaml, ví dụ `.github/workflows/ci.yaml`. Trong đó bạn sẽ cấu hình cách chạy các bài kiểm tra của mình.

Xem [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) để biết triển khai tham khảo, và [các lần chạy kiểm tra mẫu](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI).

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

Tìm hiểu thêm trong [Tài liệu Github](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli) để biết thêm thông tin về việc tạo các tệp workflow.