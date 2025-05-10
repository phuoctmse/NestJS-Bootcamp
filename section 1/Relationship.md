# README

## Mối Quan Hệ Giữa Các Entity

Dự án này sử dụng NestJS và TypeORM để quản lý các entity trong cơ sở dữ liệu MongoDB. Dưới đây là mô tả về các entity và mối quan hệ giữa chúng:

### 1. User

- **Entity**: `User`
- **Trường**:
  - `_id`: ID của người dùng (ObjectId)
  - `firstName`: Tên của người dùng (String)
  - `lastName`: Họ của người dùng (String)
  - `isActive`: Trạng thái hoạt động của người dùng (Boolean)
- **Mối Quan Hệ**:
  - Một `User` có thể có nhiều `Post`. (One-to-Many)

### 2. Post

- **Entity**: `Post`
- **Trường**:
  - `_id`: ID của bài viết (ObjectId)
  - `title`: Tiêu đề của bài viết (String)
  - `content`: Nội dung của bài viết (String)
  - `createdAt`: Thời gian tạo bài viết (Date)
  - `updatedAt`: Thời gian cập nhật bài viết (Date)
- **Mối Quan Hệ**:
  - Một `Post` thuộc về một `User`. (Many-to-One)
  - Một `Post` có thể có nhiều `Photo`. (One-to-Many)

### 3. Photo

- **Entity**: `Photo`
- **Trường**:
  - `_id`: ID của ảnh (ObjectId)
  - `url`: Đường dẫn đến ảnh (String)
  - `description`: Mô tả của ảnh (String)
- **Mối Quan Hệ**:
  - Một `Photo` thuộc về một `Post`. (Many-to-One)