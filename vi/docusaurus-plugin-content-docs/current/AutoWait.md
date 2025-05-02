---
id: autowait
title: Tự động chờ
---

Khi sử dụng lệnh tương tác trực tiếp với một phần tử, WebdriverIO sẽ tự động chờ cho đến khi phần tử hiển thị và có thể tương tác được, không cần thêm lệnh chờ thủ công khi sử dụng các lệnh (như click, setValue, v.v.).
Một phần tử được coi là có thể tương tác khi đáp ứng các điều kiện của [isClickable](https://webdriver.io/docs/api/element/isClickable).

Mặc dù WebdriverIO tự động chờ đợi các phần tử trở nên có thể tương tác, có một số trường hợp hiếm khi bạn có thể cần phải chờ đợi thủ công. Cho những trường hợp hiếm hoi này, chúng tôi cung cấp các lệnh như [`waitForDisplayed`](/docs/api/element/waitForDisplayed).


## Thời gian chờ ngầm định (không khuyến nghị)

Mặc dù chúng tôi không khuyến nghị sử dụng phương pháp này, nhưng giao thức WebDriver có cung cấp [thời gian chờ ngầm định](https://w3c.github.io/webdriver/#timeouts) cho phép chỉ định thời gian mà driver sẽ chờ đợi một phần tử xuất hiện. Mặc định, thời gian chờ này được đặt là `0` và do đó làm cho driver trả về lỗi `no such element` ngay lập tức nếu không tìm thấy phần tử trên trang. Tăng thời gian chờ này bằng cách sử dụng [`setTimeout`](/docs/api/browser/setTimeout) sẽ làm cho driver chờ đợi và tăng khả năng phần tử cuối cùng sẽ xuất hiện.

:::note

Đọc thêm về các thời gian chờ liên quan đến WebDriver và framework trong [hướng dẫn về thời gian chờ](/docs/timeouts)

:::