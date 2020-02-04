export default [
  {
    subStr: "Failed to fetch",
    cleanError: [
      {
        text: "No Internet",
        className: "error-msg-header",
      },
      {
        text: "Make sure that your wifi is still up",
      },
      {
        text: "close",
        isClose: true,
      }
    ]
  },
  {
    subStr: "Invalid registration code tokens",
    cleanError: [
      {
        text: "Invalid registration code",
        className: "error-msg-header"
      },
      { text: "You Either" },
      { text: "1. Typed the code incorrectly" },
      { text: "or" },
      { text: "2. Are connected to a different wifi from the reader" },
      {
        text: "try again",
        isClose: true,
      }
    ],
  },
  {
    subStr: "established",
    cleanError: [
      {
        text: "The Reader Unexpectedly Disconnected",
        className: "error-msg-header"
      },
      {
        text: "go home and reconnect",
        isLink: true,
        isClose: true,
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
      { text: "• Press the Cancel Purchase button down below" },
      { text: "• Wait 10 seconds" },
      { text: "• Continue Below" },
      {
        text: "If the Reader is Displaying Items",
        className: "error-msg-sub-header",
      },
      {
        text: "• Unplug it and then plug it in again to reset.",
      },
      {
        text: "• go home and reconnect",
        isLink: true,
        to: "/",
      },
      {
        text: "If the Reader is not displaying items",
        className: "error-msg-sub-header",
      },
      { text: "• Try Checkouting Out Again" },
      {
        text: "close",
        isClose: true,
      },
    ],
  }
]