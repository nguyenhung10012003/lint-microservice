# Sử dụng một ảnh base từ Node.js chính thức
FROM node:20

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json (nếu có) vào container
COPY yarn.lock package.json ./ 

# Cài đặt các dependencies
RUN yarn install

# Sao chép toàn bộ mã nguồn của dự án vào container
COPY . .

# Chạy lệnh thiết lập ban đầu
RUN yarn run prisma:all

# Build dự án
RUN yarn run build

# Khai báo cổng mà ứng dụng sẽ chạy
EXPOSE 5000

# Command để khởi chạy ứng dụng
CMD ["yarn", "run", "start:prod"]