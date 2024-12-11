# 🛒 E-commerce MERN Stack  

Dự án E-commerce MERN là một ứng dụng bán hàng trực tuyến được xây dựng bằng MERN Stack (MongoDB, ExpressJS, ReactJS, NodeJS). Ứng dụng cho phép người dùng mua sắm trực tuyến, quản lý giỏ hàng, thanh toán và quản lý tài khoản cá nhân. Quản trị viên (admin) có thể quản lý sản phẩm, đơn hàng và người dùng.

## 📺 Link youtube 
- [Link website](https://3t-ecommerce-i3lx.vercel.app/)
- [Demo Youtube](https://youtu.be/pHNKcAeyb3A)

## 🚀 Chức năng chính
- 🛒 Người dùng (User)
Đăng ký, đăng nhập, đăng xuất (JWT)
Xem và tìm kiếm sản phẩm
Thêm sản phẩm vào giỏ hàng
Đặt hàng và thanh toán trực tuyến(paypal)
Quản lý đơn hàng của mình
- 🔐 Quản trị viên (Admin)
Quản lý sản phẩm (thêm, sửa, xóa)
Quản lý người dùng (xem thông tin, xóa)
Quản lý đơn hàng (cập nhật trạng thái) 


## 📁 Cấu trúc thư mục
```bash
ECOMMERCE/
├── client/
│   ├── public/         
│   ├── src/
│       ├── Asset/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       ├── redux/
│       ├── Routes/
│       ├── Service/
│       ├── App.css/
│       ├── App.js/
│       ├── App.test.js/
│       ├── index.css/
│       ├── index.js/
│       ├── reportWebVitals.js/
│       ├── setupTests.js/
│       ├── utils.js/
│   ├── .env/         
│   ├── .gitignore/         
│   ├── package-lock.json/     
│   └── package.json/    
│   └── README.md/    
├── server/
│   └── src/
│       ├── controller/ 
│       ├── middleware/     
│       ├── model/      
│       ├── routes/   
│       └── services/     
│       └── utils/     
├── .env                
├── .gitattributes        
├── .gitignore          
├── index.js          
├── package.json        
└── README.md
```

## 📦 Cài đặt
1. Yêu cầu cài đặt
  - NodeJS (v16 trở lên)
  -  MongoDB (cài đặt cục bộ hoặc sử dụng MongoDB Atlas)
  - Git
2. clone repo: https://github.com/vominhtaii/NodeJS_CK.git
3. Cấu hình file .env
- Front end
```bash
REACT_APP_API_KEY =https://node-js-ck.vercel.app/api
```
- Back end
```bash
PORT = 3001
MONGO_DB = mongodb+srv://root:123@cluster0.9thcp.mongodb.net/
ACCESS_TOKEN = accses_token
REFRESH_TOKEN = refresh_token
PORT_REACT = http://localhost:3000
```
4. Chạy server và client
- server
```bash
  cd server
  npm start
```
- client
```bash
  cd client
  npm start
```

## 📦 Login account
- Admin: admin@gmail.com password: 123456
- User: user@gmail.com password:123456

## Paypal info 
- Email: sb-2wz5a34732211@personal.example.com
- paassword: a&U3'wdm

## 🛠️ Công nghệ sử dụng (Technologies Used)
- Liệt kê các công nghệ được sử dụng trong dự án.

1. 💻 Frontend: React, Redux, Axios
2. 📡 Backend: Node.js, Express.js, JWT, bcryptjs
3. 🗃️ Database: MongoDB, Mongoose
4. 💳 Thanh toán: PayPal
5. 🛠️ Công cụ khác: Postman, VS Code, Git

## 📚 API Endpoints User
| Phương thức | Endpoint             | Mô tả                         |
|------------|----------------------|---------------------------------|
| **POST**   | `/api/users/sgin-up`  | Đăng ký tài khoản               |
| **POST**   | `/api/users/sign-in`  | Đăng nhập tài khoản               |
| **POST**   | `/api/users/logout`  | Đăng xuất tài khoản               |
| **POST**   | `/api/users/update-user/:id`  | Cập nhật thông tin tài khoản người dùng              |
| **DELETE**   | `/api/users/detele-user/:id`  | Xóa tài khoản người dùng               |
| **GET**   | `/api/users/getAll`  | Xem tài khoản               |
| **GET**   | `/api/users/get-details/:id`  | Lấy thông tin chi tiết một người dùng               |
| **POST**   | `/api/users/refresh-token`  | Refresh lại token               |
| **POST**   | `/api/users/detele-many`  | Xóa nhiều tài khoản               |
| **POST**   | `/api/users/forgot-password`  | Lấy lại mật khẩu               |
| **POST**   | `/api/users/verify-otp`  | Verify lại mã otp              |

## 📚 API Endpoints Product
| Phương thức | Endpoint             | Mô tả                         |
|------------|----------------------|---------------------------------|
| **POST**   | `/api/product/create`  | Tạo mới sản phẩm               |
| **PUT**   | `/api/product/update/:id`  | Cập nhật sản phẩm theo id              |
| **GET**   | `/api/product/get-details/:id`  | Lấy chi tiết sản phẩm theo id               |
| **DELETE**   | `/api/product/delete-product/:id`  | Xóa  sản phẩm              |
| **GET**   | `/api/product/get-all`  | Xem toàn bộ sản phẩm              |
| **GET**   | `/api/product/getAll-type`  | Xem toàn bộ loại sản phẩm                |
| **GET**   | `/api/product/delete-many`  | Xóa nhiều sản phẩm                |

## 📚 API Endpoints Order
| Phương thức | Endpoint             | Mô tả                         |
|------------|----------------------|---------------------------------|
| **POST**   | `/api/order/create/:id`  | Tạo hóa dơn              |
| **PUT**   | `/api/order/get-order-details/:id`  | Lấy chi tiết hóa đơn  theo id           |
| **GET**   | `/api/order/order-detail/:id`  | Lấy hóa đơn theo id              |
| **DELETE**   | `/api/order/cancel-order/:id`  | Hủy một hóa đơn             |
| **GET**   | `/api/order/getAll-order`  | Xem toàn bộ hóa đơn             |

## 📷 Ảnh chụp màn hình
- Trang chủ
![Ảnh trang chủ](./screenshot/home-page.jpg)
- Trang chi tiết sản phẩm
![Ảnh chi tiết sản phẩm](./screenshot/product-details.jpg)
- Giỏ hàng và thanh toán
![Ảnh giỏ hàng](./screenshot/cart.jpg)

## 🔑 Bảo mật
- JWT Authentication: Bảo mật API thông qua token.
- Mã hóa mật khẩu: Sử dụng bcrypt để mã hóa mật khẩu trước khi lưu.
- Bảo vệ route: Middleware bảo vệ các route admin và user.

## 📜 Giấy phép
Dự án này được cấp phép theo MIT License.

## ✍️ Tác giả (Author)
Tên: [Phan Thiết Trung]
GitHub: [My Github](https://github.com/trungka982004)

Tên: [Đỗ Duy Tân]
GitHub: [My Github](https://github.com/tan06022004)

Tên: [Võ Minh Tài]
GitHub: [My Github](https://github.com/vominhtaii)


