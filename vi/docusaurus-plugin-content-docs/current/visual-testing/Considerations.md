---
index: 1
id: considerations
title: Những điều cần xem xét
---

# Những điều cần xem xét quan trọng để sử dụng tối ưu

Trước khi đi sâu vào các tính năng mạnh mẽ của `@wdio/visual-service`, điều quan trọng là phải hiểu một số cân nhắc chính để đảm bảo bạn tận dụng tối đa công cụ này. Các điểm sau đây được thiết kế để hướng dẫn bạn qua các phương pháp hay nhất và những vấn đề thường gặp, giúp bạn đạt được kết quả kiểm thử hình ảnh chính xác và hiệu quả. Những cân nhắc này không chỉ là khuyến nghị, mà còn là những khía cạnh thiết yếu cần ghi nhớ để sử dụng dịch vụ một cách hiệu quả trong các tình huống thực tế.

## Bản chất của so sánh

-   **Dựa trên từng điểm ảnh:** Module thực hiện so sánh hình ảnh trên cơ sở từng điểm ảnh. Mặc dù một số khía cạnh có thể được điều chỉnh (xem Tùy chọn so sánh), phương pháp cốt lõi vẫn là so sánh điểm ảnh cơ bản.
-   **Tác động của cập nhật trình duyệt:** Lưu ý rằng các bản cập nhật cho trình duyệt, như Chrome, có thể ảnh hưởng đến việc hiển thị font chữ, có thể đòi hỏi phải cập nhật hình ảnh cơ sở của bạn.

## Tính nhất quán trên các nền tảng

-   **So sánh trên cùng nền tảng:** Đảm bảo ảnh chụp màn hình được so sánh trong cùng một nền tảng. Ví dụ, ảnh chụp từ Chrome trên Mac không nên được sử dụng để so sánh với ảnh từ Chrome trên Ubuntu hoặc Windows.
-   **Ví dụ:** Nói đơn giản, hãy so sánh _'Táo với Táo, không phải Táo với Android'_.

## Thận trọng với phần trăm không khớp

-   **Rủi ro khi chấp nhận sự không khớp:** Hãy thận trọng khi chấp nhận một tỷ lệ phần trăm không khớp. Điều này đặc biệt đúng đối với ảnh chụp màn hình lớn, nơi việc chấp nhận sự không khớp có thể vô tình bỏ qua những sự khác biệt đáng kể, chẳng hạn như các nút hoặc phần tử bị thiếu.

## Mô phỏng màn hình di động

-   **Tránh thay đổi kích thước trình duyệt để mô phỏng di động:** Không nên cố gắng mô phỏng kích thước màn hình di động bằng cách thay đổi kích thước trình duyệt máy tính và coi chúng như trình duyệt di động. Trình duyệt máy tính, ngay cả khi được thay đổi kích thước, không sao chép chính xác cách hiển thị của trình duyệt di động thực tế.
-   **Tính xác thực trong so sánh:** Công cụ này nhằm mục đích so sánh hình ảnh như chúng sẽ xuất hiện với người dùng cuối. Một trình duyệt máy tính được điều chỉnh kích thước không phản ánh trải nghiệm thực tế trên thiết bị di động.

## Quan điểm về trình duyệt không đầu (Headless)

-   **Không khuyến nghị cho trình duyệt Headless:** Việc sử dụng module này với các trình duyệt không đầu không được khuyến khích. Lý do là người dùng cuối không tương tác với trình duyệt không đầu, và do đó các vấn đề phát sinh từ việc sử dụng như vậy sẽ không được hỗ trợ.