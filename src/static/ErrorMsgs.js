export default [
  {
    subStr: "Invalid registration code tokens",
    cleanError: [
      "Invalid registration code. Make sure that ... ",
      "1. The Registration code was typed correctly",
      "2. The Reader and tablet are connected to the same wifi",
      "3. The wifi is working",
    ],
  },
  {
    subStr: "No established connection to the Reader",
    cleanError: [
      "No established connection to the Reader. Make sure that ... ",
      "1. The Reader and tablet are connected to the same wifi",
      "2. The Wifi is Working",
    ],
  },
  {
    subStr: "Error creating PaymentIntent!",
    cleanError: ["Error Collecting Payment. Make sure that ...",
      "1. The Reader and tablet are connected to the same wifi",
      "2. The Wifi is Working"
    ],
  }
]