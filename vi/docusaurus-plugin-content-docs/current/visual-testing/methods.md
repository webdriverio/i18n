---
id: methods
title: Phương thức
---

Các phương thức sau được thêm vào đối tượng toàn cục WebdriverIO [`browser`](/docs/api/browser).

## Phương thức Lưu

:::info MẸO
Chỉ sử dụng các Phương thức Lưu khi bạn **không** muốn so sánh màn hình, mà chỉ muốn có ảnh chụp của một phần tử/màn hình.
:::

### `saveElement`

Lưu hình ảnh của một phần tử.

#### Cách sử dụng

```ts
await browser.saveElement(
    // element
    await $('#element-selector'),
    // tag
    'your-reference',
    // saveElementOptions
    {
        // ...
    }
);
```

#### Hỗ trợ

- Trình duyệt Desktop
- Trình duyệt Di động
- Ứng dụng Hybrid Di động
- Ứng dụng Native Di động

#### Tham số

-   **`element`:**
    -   **Bắt buộc:** Có
    -   **Kiểu:** WebdriverIO Element
-   **`tag`:**
    -   **Bắt buộc:** Có
    -   **Kiểu:** string
-   **`saveElementOptions`:**
    -   **Bắt buộc:** Không
    -   **Kiểu:** đối tượng chứa các tùy chọn, xem [Save Options](./method-options#save-options)

#### Đầu ra:

Xem trang [Test Output](./test-output#savescreenelementfullpagescreen).

### `saveScreen`

Lưu hình ảnh của viewport.

#### Cách sử dụng

```ts
await browser.saveScreen(
    // tag
    'your-reference',
    // saveScreenOptions
    {
        // ...
    }
);
```

#### Hỗ trợ

- Trình duyệt Desktop
- Trình duyệt Di động
- Ứng dụng Hybrid Di động
- Ứng dụng Native Di động

#### Tham số
-   **`tag`:**
    -   **Bắt buộc:** Có
    -   **Kiểu:** string
-   **`saveScreenOptions`:**
    -   **Bắt buộc:** Không
    -   **Kiểu:** đối tượng chứa các tùy chọn, xem [Save Options](./method-options#save-options)

#### Đầu ra:

Xem trang [Test Output](./test-output#savescreenelementfullpagescreen).

### `saveFullPageScreen`

#### Cách sử dụng

Lưu hình ảnh của toàn bộ màn hình.

```ts
await browser.saveFullPageScreen(
    // tag
    'your-reference',
    // saveFullPageScreenOptions
    {
        // ...
    }
);
```

#### Hỗ trợ

- Trình duyệt Desktop
- Trình duyệt Di động

#### Tham số
-   **`tag`:**
    -   **Bắt buộc:** Có
    -   **Kiểu:** string
-   **`saveFullPageScreenOptions`:**
    -   **Bắt buộc:** Không
    -   **Kiểu:** đối tượng chứa các tùy chọn, xem [Save Options](./method-options#save-options)

#### Đầu ra:

Xem trang [Test Output](./test-output#savescreenelementfullpagescreen).

### `saveTabbablePage`

Lưu hình ảnh của toàn bộ màn hình với các đường và điểm tabbable.

#### Cách sử dụng

```ts
await browser.saveTabbablePage(
    // tag
    'your-reference',
    // saveTabbableOptions
    {
        // ...
    }
);
```

#### Hỗ trợ

- Trình duyệt Desktop

#### Tham số
-   **`tag`:**
    -   **Bắt buộc:** Có
    -   **Kiểu:** string
-   **`saveTabbableOptions`:**
    -   **Bắt buộc:** Không
    -   **Kiểu:** đối tượng chứa các tùy chọn, xem [Save Options](./method-options#save-options)

#### Đầu ra:

Xem trang [Test Output](./test-output#savescreenelementfullpagescreen).

## Phương thức Kiểm tra

:::info MẸO
Khi các phương thức `check` được sử dụng lần đầu tiên, bạn sẽ thấy cảnh báo dưới đây trong logs. Điều này có nghĩa là bạn không cần kết hợp phương thức `save` và `check` nếu bạn muốn tạo baseline của mình.

```shell
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/project/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
 If you want the module to auto save a non existing image to the baseline you
 can provide 'autoSaveBaseline: true' to the options.
#####################################################################################
```

:::

### `checkElement`

So sánh hình ảnh của một phần tử với hình ảnh baseline.

#### Cách sử dụng

```ts
await browser.checkElement(
    // element
    '#element-selector',
    // tag
    'your-reference',
    // checkElementOptions
    {
        // ...
    }
);
```

#### Hỗ trợ

- Trình duyệt Desktop
- Trình duyệt Di động
- Ứng dụng Hybrid Di động
- Ứng dụng Native Di động

#### Tham số
-   **`element`:**
    -   **Bắt buộc:** Có
    -   **Kiểu:** WebdriverIO Element
-   **`tag`:**
    -   **Bắt buộc:** Có
    -   **Kiểu:** string
-   **`checkElementOptions`:**
    -   **Bắt buộc:** Không
    -   **Kiểu:** đối tượng chứa các tùy chọn, xem [Compare/Check Options](./method-options#compare-check-options)

#### Đầu ra:

Xem trang [Test Output](./test-output#checkscreenelementfullpagescreen).

### `checkScreen`

So sánh hình ảnh của viewport với hình ảnh baseline.

#### Cách sử dụng

```ts
await browser.checkScreen(
    // tag
    'your-reference',
    // checkScreenOptions
    {
        // ...
    }
);
```

#### Hỗ trợ

- Trình duyệt Desktop
- Trình duyệt Di động
- Ứng dụng Hybrid Di động
- Ứng dụng Native Di động

#### Tham số
-   **`tag`:**
    -   **Bắt buộc:** Có
    -   **Kiểu:** string
-   **`checkScreenOptions`:**
    -   **Bắt buộc:** Không
    -   **Kiểu:** đối tượng chứa các tùy chọn, xem [Compare/Check Options](./method-options#compare-check-options)

#### Đầu ra:

Xem trang [Test Output](./test-output#checkscreenelementfullpagescreen).

### `checkFullPageScreen`

So sánh hình ảnh của toàn bộ màn hình với hình ảnh baseline.

#### Cách sử dụng

```ts
await browser.checkFullPageScreen(
    // tag
    'your-reference',
    // checkFullPageOptions
    {
        // ...
    }
);
```

#### Hỗ trợ

- Trình duyệt Desktop
- Trình duyệt Di động

#### Tham số
-   **`tag`:**
    -   **Bắt buộc:** Có
    -   **Kiểu:** string
-   **`checkFullPageOptions`:**
    -   **Bắt buộc:** Không
    -   **Kiểu:** đối tượng chứa các tùy chọn, xem [Compare/Check Options](./method-options#compare-check-options)

#### Đầu ra:

Xem trang [Test Output](./test-output#checkscreenelementfullpagescreen).

### `checkTabbablePage`

So sánh hình ảnh của toàn bộ màn hình với các đường và điểm tabbable với hình ảnh baseline.

#### Cách sử dụng

```ts
await browser.checkTabbablePage(
    // tag
    'your-reference',
    // checkTabbableOptions
    {
        // ...
    }
);
```

#### Hỗ trợ

- Trình duyệt Desktop

#### Tham số
-   **`tag`:**
    -   **Bắt buộc:** Có
    -   **Kiểu:** string
-   **`checkTabbableOptions`:**
    -   **Bắt buộc:** Không
    -   **Kiểu:** đối tượng chứa các tùy chọn, xem [Compare/Check Options](./method-options#compare-check-options)

#### Đầu ra:

Xem trang [Test Output](./test-output#checkscreenelementfullpagescreen).