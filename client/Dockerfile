# Sử dụng Node.js để build
FROM node:16 AS builder

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép file package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép mã nguồn
COPY . .

# Build ứng dụng React ở chế độ production
RUN npm run build

# Sử dụng Nginx để phục vụ file tĩnh
FROM nginx:1.21.0-alpine

# Sao chép file build vào thư mục phục vụ của Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Expose cổng 80
EXPOSE 80

# Khởi chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
