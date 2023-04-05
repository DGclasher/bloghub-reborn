const whiteList = [
    "https://bloghub-reborn.netlify.app/",
  ];
  const corsOption = {
    origin: (origin, callback) => {
      if (whiteList.indexOf(origin) != -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionSuccessStatus: 200,
  };
  
  module.exports = corsOption;
  