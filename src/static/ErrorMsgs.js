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
  }
]