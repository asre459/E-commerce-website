const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", // or 'live' for production
  client_id: "AQVwy4sbfKVDC4ZHE62a4yW7aV38FNL6wCqIY7HWI-glutqg3tQrCAlM_qZWWlutV-8hHseoz0PfAYiF",
  client_secret: "EBjmATNPU9ku6725iGRu9FtsGa6TUZi04spjJF88UTGmONW2_0dEBUwj97RL5e8niJybn6L8fYKeDgdy",
});

module.exports = paypal;
