// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Pumpfun Clone",
      version: "1.0.0",
      description:
        "Cấu trúc tài liệu: HomePage , Tạo Token , Trading Token , My Profile ",
    },
    servers: [{ url: "http://localhost:4000" }],

    // nhóm tag cha–con để ReDoc và Swagger UI hiển thị dạng cây
    "x-tagGroups": [
      {
        name: "Homepage",
        tags: ["Homepage", "Homepage -> Navbar -> Connect Wallet", "Homepage -> Search -> Search by Textfield"],
      },
    ],

    tags: [
      { name: "Homepage", description: "Trang Chủ Hệ Thống " },
      { name: "Homepage -> Navbar -> Connect Wallet", description: "Chức Năng Connect Wallet" },
      { name: "Homepage -> Search -> Search by Textfield", description: "Chức Năng Search by Textfield" },
    ],
  },

  apis: ["./routes/*.js", "./index.js"],
};

const specs = swaggerJsdoc(options);
module.exports = { swaggerUi, specs };
