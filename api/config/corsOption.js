const corsOption = {
  origin: ["https://bloghub-reborn.netlify.app", "http://localhost:3000"],
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS,PUT",
  allowerHeaders: ["Content-Type", "Cookie"],
};

module.exports = corsOption;
