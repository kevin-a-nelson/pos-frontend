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
      { text: "2. Are connecting to a different wifi from the reader" },
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
      { text: "If the reader is displaying items, unplug the reader and then plug it in again to clear it.", },
      {
        text: "Reconnect",
        isLink: true,
        to: "/",
      },
      {
        text: "I understand how to clear the reader (close)",
        isClose: true,
      }
    ]
  },
  {
    subStr: "Error creating PaymentIntent!",
    cleanError: ["Error Collecting Payment",
      { text: "1. Click Cancel Purchase" },
      { text: "2. If the reader is still displaying items. Unplug it and then plug it in again" },
      { text: "3. If the reader resets, then try again" },
      { text: "4. If you tried multiple times, their is something wrong with the card" },
    ],
  }
]