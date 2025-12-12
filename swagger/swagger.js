// swagger/swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Pumpfun Clone API",
      version: "1.0.0",
      description: `
        API Documentation for Pumpfun Clone.
        Modules: Authenticate , Home Page , Token , Trading Page , Profile Page , Leaderboard Page , Referral Page , Reward Page , Points Page , Create Token Page .
 

      `
    },
    servers: [{ url: "http://localhost:4000" }],

    // GROUPS TREE
    "x-tagGroups": [
      {
        name: "Auth",
        tags: [         
          "Connect Wallet"
        ]
      },
      {
        name: "Homepage",
        tags: [
          "Homepage -> Trending",
          "Homepage -> Search"
        ]
      },
      {
        name: "Token",
        tags: [
          "Token",
          "Token -> Info",
          "Token -> Liquidity",
          "Token -> Price",
          "Token -> Holders"
        ]
      },
      {
        name: "Trading",
        tags: [
          "Trading -> Buy",
          "Trading -> Sell"
        ]
      },
      {
        name: "Chatroom",
        tags: [
          "Chatroom -> Write Message",
          "Chatroom -> Load Messages"
        ]
      },
      {
        name: "Profile",
        tags: [
          "Profile -> User Info",
          "Profile -> User Stats"
        ]
      },
      {
        name: "Leaderboard",
        tags: [
          "Leaderboard -> Top",
          "Leaderboard -> List"
        ]
      },
      {
        name: "Referral",
        tags: [
          "Referral -> Summary",
          "Referral -> Link",
          "Referral -> List",
          "Referral -> Claim"
        ]
      },
      {
        name: "Reward System",
        tags: [
          "Reward -> Info",
          "Reward -> Convert",
          "Reward -> Spin"
        ]
      },
      {
        name: "Points",
        tags: [
          "Points -> Overview",
          "Points -> View",
          "Points -> History"
        ]
      },
      {
        name: "Create Token",
        tags: [
          "Create Token -> Basic",
          "Create Token -> Trust",
          "Create Token -> Finalize"
        ]
      },
      {
        name: "Stake",
        tags: ["Stake (TBD)"]
      },
      {
        name: "Thread",
        tags: ["Thread (TBD)"]
      }
    ],

    tags: [
      { name: "🟥 Authenticate", description: "Các Chức Năng Xác Thực" },
      { name: "Connect Wallet", description: "Đăng nhập ví" },

      { name: "🟥 Home Page", description: "Các Chức Năng Trang Chủ" },
      { name: "Homepage -> Trending", description: "Trending Tokens" },
      { name: "Homepage -> Search", description: "Tìm kiếm token" },

      { name: "🟥 Token", description: "Các Chức Năng Liên Quan Token" },
      { name: "Token -> Info", description: "Thông tin token" },
      { name: "Token -> Liquidity", description: "Sự kiện liquidity" },
      { name: "Token -> Price", description: "Giá & biểu đồ" },
      { name: "Token -> Holders", description: "Danh sách holders" },

      { name: "🟥 Trading Page", description: "Các Chức Năng Liên Quan Trading" },
      { name: "Trading -> Buy", description: "Mua token" },
      { name: "Trading -> Sell", description: "Bán token" },
      { name: "Chatroom -> Write Message", description: "Gửi tin nhắn" },
      { name: "Chatroom -> Load Messages", description: "Load tin nhắn" },

      { name: "🟥 Profile Page", description: "Các Chức Năng Liên Quan Profile" },
      { name: "Profile -> User Info", description: "Thông tin người dùng" },
      { name: "Profile -> User Stats", description: "Thống kê" },

      { name: "🟥 Leaderboard Page", description: "Bảng xếp hạng token" },
      { name: "Leaderboard -> Top", description: "Top token leaderboard cards" },
      { name: "Leaderboard -> List", description: "Danh sách leaderboard chi tiết" },

      { name: "🟥 Referral Page", description: "Referral & Rewards system" },
      { name: "Referral -> Summary", description: "Tổng quan referral" },
      { name: "Referral -> Link", description: "Tạo & lấy referral link" },
      { name: "Referral -> List", description: "Danh sách người được mời" },
      { name: "Referral -> Claim", description: "Claim referral rewards" },

      { name: "🟥 Reward Page", description: "Rewards system" },
      { name: "Reward -> Info", description: "Lấy thông tin reward (points, tickets)" },
      { name: "Reward -> Convert", description: "Đổi point → ticket" },
      { name: "Reward -> Spin", description: "Quay thưởng bằng ticket" },

      { name: "🟥 Points Page", description: "User points, ranks, and progress" },
      { name: "Points -> Overview", description: "Points summary (points, tickets)" },
      { name: "Points -> View", description: "Rank & trading volume progress" },
      { name: "Points -> History", description: "Points earning history" },
      
      { name: "🟥 Create Token Page", description: "User points, ranks, and progress" },
      { name: "Create Token -> Basic", description: "Step 1: Token basic info & image" },
      { name: "Create Token -> Trust", description: "Step 2: Trust score & tokenomics" },
      { name: "Create Token -> Finalize", description: "Step 3: Finalize & initial buy" },

      { name: "🟥 Stake Page", description: "To Be Design" },
      { name: "Stake (TBD)", description: "Stake system – to be designed" },

      { name: "🟥 Thread Page", description: "To Be Design" },
      { name: "Thread (TBD)", description: "Thread / forum system – to be designed" },

    ]
  },

  apis: ["./routes/*.js"]
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
