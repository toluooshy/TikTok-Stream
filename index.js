const { WebcastPushConnection } = require("tiktok-livestream-chat-connector");
const axios = require("axios");

const apiPost = (id, img, type) => {
  const payload = {
    id: id,
    img: img,
    type: type,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post("http://127.0.0.1:8000/log", payload, config)
    .then((res) => {
      console.log(`Status: ${res.status}`);
      console.log("Body: ", res.data);
    })
    .catch((err) => {
      console.error(err);
    });
};

let tiktokUsername = "therealsupat";
let tiktokChatConnection = new WebcastPushConnection(tiktokUsername);

tiktokChatConnection
  .connect()
  .then((state) => {
    console.info(`Connected to roomId ${state.roomId}`);
  })
  .catch((err) => {
    console.error("Failed to connect", err);
  });

// tiktokChatConnection.on("chat", (data) => {
//   console.log(
//     `${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`
//   );
// });

tiktokChatConnection.on("member", (data) => {
  apiPost(data.uniqueId, data.profilePictureUrl, 1);
});

tiktokChatConnection.on("like", (data) => {
  apiPost(data.uniqueId, data.profilePictureUrl, 2);
});

tiktokChatConnection.on("gift", (data) => {
  apiPost(data.uniqueId, data.profilePictureUrl, 3, [data.giftId]);
});

tiktokChatConnection.on("social", (data) => {
  if (data.displaytype.indexOf("follow") != -1) {
    apiPost(data.uniqueId, data.profilePictureUrl, 4);
  }
  if (data.displaytype.indexOf("share") != -1) {
    apiPost(data.uniqueId, data.profilePictureUrl, 5);
  }
});
