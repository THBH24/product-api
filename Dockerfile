# Sử dụng base image Node.js phiên bản ổn định
FROM node:24-alpine

# Đặt thư mục làm việc bên trong container
WORKDIR /app

# Copy các file quản lý dependency trước để tối ưu hóa caching
COPY package*.json ./

# Cài đặt các gói thư viện
RUN npm install

# Copy toàn bộ mã nguồn còn lại của dự án vào container
COPY . .

# Mở cổng 5000 của container
EXPOSE 5000

# Lệnh để chạy ứng dụng khi container khởi động
CMD ["npm", "start"]