export default [
  {
    subStr: "Failed to fetch",
    cleanError: [
      {
        text: "No Internet Connection",
        className: "error-msg-header",
      }
    ]
  },
  {
    subStr: "Invalid registration code tokens",
    cleanError: [
      {
        text: "Error",
        className: "error-msg-header"
      },
      {
        text: "Mistyped registration code or veriphone is connected to a different wifi",
      },
    ],
  },
  {
    subStr: "established",
    cleanError: [
      {
        text: "The Veriphone Unexpectedly Disconnected",
        className: "error-msg-header"
      },
      {
        text: "go home and reconnect",
        isLink: true,
        to: "/"
      },
    ]
  },
  {
    subStr: "Error creating PaymentIntent!",
    cleanError: ["Error Collecting Payment",
      {
        text: "Error Creating Payment",
        className: "error-msg-header",
      },
      {
        text: "Return to Checkout",
        isLink: true,
        to: "/checkout"
      },
    ],
  },
  {
    subStr: "Cannot read property 'id' of undefined",
    cleanError: [
      {
        text: "Invalid Card",
        className: "error-msg-header",
      },
      {
        text: "Either ...",
        className: "error-msg-header",
      },
      {
        text: "1. The Card is invalid"
      },
      {
        text: "2. Your in the wrong mode (refresh page)",
      },
    ]
  }
]