---
id: sharding
title: Phân vùng
---

Theo mặc định, WebdriverIO chạy các bài kiểm thử song song và nỗ lực tối ưu hóa việc sử dụng CPU trên máy của bạn. Để đạt được sự song song hóa tốt hơn, bạn có thể mở rộng quy mô thực thi kiểm thử WebdriverIO bằng cách chạy kiểm thử trên nhiều máy cùng một lúc. Chúng ta gọi chế độ hoạt động này là "phân vùng" (sharding).

## Phân vùng kiểm thử giữa nhiều máy

Để phân vùng bộ kiểm thử, truyền `--shard=x/y` vào dòng lệnh. Ví dụ, để chia bộ kiểm thử thành bốn phân vùng, mỗi phân vùng chạy một phần tư các bài kiểm thử:

```sh
npx wdio run wdio.conf.js --shard=1/4
npx wdio run wdio.conf.js --shard=2/4
npx wdio run wdio.conf.js --shard=3/4
npx wdio run wdio.conf.js --shard=4/4
```

Bây giờ, nếu bạn chạy các phân vùng này song song trên các máy tính khác nhau, bộ kiểm thử của bạn sẽ hoàn thành nhanh hơn bốn lần.

## Ví dụ về GitHub Actions

GitHub Actions hỗ trợ [phân vùng kiểm thử giữa nhiều công việc](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs) bằng cách sử dụng tùy chọn [`jobs.<job_id>.strategy.matrix`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix). Tùy chọn matrix sẽ chạy một công việc riêng biệt cho mọi kết hợp có thể của các tùy chọn được cung cấp.

Ví dụ sau đây cho bạn thấy cách cấu hình một công việc để chạy các bài kiểm thử của bạn trên bốn máy song song. Bạn có thể tìm thấy toàn bộ thiết lập pipeline trong dự án [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate/blob/main/.github/workflows/test.yaml).

-   Đầu tiên, chúng ta thêm tùy chọn matrix vào cấu hình công việc của mình với tùy chọn shard chứa số lượng phân vùng mà chúng ta muốn tạo. `shard: [1, 2, 3, 4]` sẽ tạo bốn phân vùng, mỗi phân vùng có một số phân vùng khác nhau.
-   Sau đó, chúng ta chạy các bài kiểm thử WebdriverIO với tùy chọn `--shard ${{ matrix.shard }}/${{ strategy.job-total }}`. Đây sẽ là lệnh kiểm thử cho mỗi phân vùng.
-   Cuối cùng, chúng ta tải lên báo cáo nhật ký wdio của mình lên GitHub Actions Artifacts. Điều này sẽ làm cho các bản ghi có sẵn trong trường hợp phân vùng bị lỗi.

Pipeline kiểm thử được định nghĩa như sau:

```yaml title=.github/workflows/test.yaml
name: Test

on: [push, pull_request]

jobs:
    lint:
        # ...
    unit:
        # ...
    e2e:
        name: 🧪 Test (${{ matrix.shard }}/${{ strategy.job-total }})
        runs-on: ubuntu-latest
        needs: [lint, unit]
        strategy:
            matrix:
                shard: [1, 2, 3, 4]
        steps:
            - uses: actions/checkout@v4
            - uses: ./.github/workflows/actions/setup
            - name: E2E Test
              run: npm run test:features -- --shard ${{ matrix.shard }}/${{ strategy.job-total }}
            - uses: actions/upload-artifact@v1
              if: failure()
              with:
                  name: logs-${{ matrix.shard }}
                  path: logs
```

Điều này sẽ chạy tất cả các phân vùng song song, giảm thời gian thực thi cho các bài kiểm thử xuống 4 lần:

![Ví dụ về GitHub Actions](/img/sharding.png "Ví dụ về GitHub Actions")

Xem commit [`96d444e`](https://github.com/webdriverio/cucumber-boilerplate/commit/96d444ea23919389682b9b1c9408ed91c452c7f8) từ dự án [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate) đã giới thiệu phân vùng cho pipeline kiểm thử của mình, giúp giảm thời gian thực thi tổng thể từ `2:23 phút` xuống còn `1:30 phút`, giảm __37%__ 🎉.