const corsOption = {
  origin: ["https://bloghub-reborn.netlify.app", "http://localhost:3000"],
  AccessControlAllowOrigin: '*',
  methods: "GET,POST,PUT,DELETE,OPTIONS,PUT",
};

module.exports = corsOption;
