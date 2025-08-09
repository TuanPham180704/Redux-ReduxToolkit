# Redux Toolkit & RTK Query - React TypeScript

Dự án này được xây dựng bằng **React + TypeScript**, sử dụng **Redux Toolkit** để quản lý state và **RTK Query** để xử lý API một cách đơn giản, mạnh mẽ và tối ưu hiệu năng.

---

## 📚 Nội dung học tập

### 1. Redux là gì? Cách setup dự án React TypeScript
- Giới thiệu khái niệm **Redux** và lý do tại sao nên dùng Redux để quản lý state trong ứng dụng React.
- So sánh Redux truyền thống với Redux Toolkit.
- Cài đặt và cấu hình dự án React TypeScript sử dụng `create-react-app` hoặc `Vite`.
- Cài đặt **@reduxjs/toolkit** và **react-redux**.
- Khởi tạo `store` và tích hợp vào ứng dụng thông qua `<Provider>`.

---

### 2. `createReducer` và `createAction`
- Tìm hiểu cách viết reducer thủ công so với dùng `createReducer`.
- Cách định nghĩa action với `createAction` để tránh lỗi khi viết type thủ công.
- Thực hành tạo reducer đơn giản (ví dụ: counter).
- Phân tích ưu/nhược điểm khi dùng `createReducer` & `createAction`.

---

### 3. `createSlice`
- Giới thiệu khái niệm **Slice** trong Redux Toolkit.
- Tích hợp reducer, actions vào một file duy nhất (`createSlice`).
- Cách sử dụng `initialState`, `reducers` và tự động tạo action creators.
- Ví dụ quản lý state giỏ hàng hoặc bộ đếm.

---

### 4. Tạo API với JSON Server & xử lý fetch API với `createAsyncThunk`
- Cài đặt **JSON Server** để giả lập API REST.
- Tạo endpoint giả (products, users, posts, v.v.).
- Sử dụng `createAsyncThunk` để gọi API bất đồng bộ.
- Xử lý trạng thái loading, success, error trong Redux.
- Kỹ thuật tách biệt logic gọi API và UI.

---

### 5. Cách query & fetch API trong RTK Query
- Giới thiệu **RTK Query** - công cụ tích hợp sẵn trong Redux Toolkit.
- So sánh RTK Query và `createAsyncThunk`.
- Tạo API service bằng `createApi` và `fetchBaseQuery`.
- Thực hiện `useGet...Query()` để lấy dữ liệu từ API.
- Tự động caching dữ liệu khi query.

---

### 6. Dùng mutation để POST, PUT, DELETE trong RTK Query
- Khai báo mutation trong `createApi`.
- Sử dụng `use...Mutation()` để gửi yêu cầu POST, PUT, DELETE.
- Xử lý cập nhật cache sau khi mutation thành công.
- Ví dụ CRUD với sản phẩm hoặc người dùng.

---

### 7. Xử lý lỗi trong RTK Query
- Xử lý lỗi khi query hoặc mutation thất bại.
- Hiển thị thông báo lỗi trong UI.
- Cách bắt lỗi từ `error` object của RTK Query.
- Tùy biến logic retry khi gặp lỗi mạng.

---

### 8. Caching, Polling, Refetch & Custom Header trong RTK Query
- Giải thích cách RTK Query cache dữ liệu và thời gian hết hạn cache.
- Polling dữ liệu liên tục (auto refresh) cho dữ liệu thời gian thực.
- Cách `refetch` thủ công khi cần.
- Gửi custom header (ví dụ: token xác thực) khi gọi API.

---

## 🚀 Công nghệ sử dụng
- **React** + **TypeScript**
- **Redux Toolkit**
- **RTK Query**
- **React Redux**
- **JSON Server** (fake API)

---

## 📦 Cài đặt

```bash
npm install
npm install @reduxjs/toolkit react-redux
