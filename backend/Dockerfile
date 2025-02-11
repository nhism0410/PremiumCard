# Sử dụng Node.js LTS làm base image
FROM node:lts

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/server

# Copy file package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy mã nguồn còn lại vào container
COPY . .

# Mở cổng 4000 cho ứng dụng Node.js
EXPOSE 4000

# Chạy ứng dụng khi container khởi động
CMD ["npm", "start"]
