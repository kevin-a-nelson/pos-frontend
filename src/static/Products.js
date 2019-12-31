export default [
  {
    id: 1,
    price: 40,
    // Label seen on reader and screen
    label: "Shirt",
    // Label sent to stripe account
    stripeLabel: "Shirt",
    replaceLabel: null,
    dayInLabel: false,
    weekDayOnly: false,
    // Does not controll whether or not label breaks into to lines in cart
    // Only says if it does break into to mult lines are not
    // if line === 1 then margin top is 8per
    // if line === 2 then marign top is 10per
    lines: 1,
    quantity: 0,
    image: "http://sportsteam.com/pub/media/catalog/product//9/1/91285.jpg"
  },
  {
    id: 2,
    price: 20,
    label: "Adult Entry",
    stripeLabel: "Adult Entry",
    replaceLabel: null,
    dayInLabel: false,
    weekDayOnly: false,
    lines: 1,
    quantity: 0,
    image: "http://sportsteam.com/pub/media/catalog/product//9/1/91285.jpg"
  },
  {
    id: 3,
    price: 10,
    label: "Child Entry",
    stripeLabel: "Child Entry",
    replaceLabel: null,
    weekDayOnly: false,
    lines: 1,
    quantity: 0,
    image: "http://sportsteam.com/pub/media/catalog/product//9/1/91285.jpg"
  },
  {
    id: 6,
    price: 120,
    // ${day} is replaced with current day
    label: "Kid/Senior ${day}",
    stripeLabel: "Kid/Senior day",
    // replace ${day} in label with current date
    // ex. Kid/Senior ${day} => Kid/Senior Monday
    replaceLabel: {
      replace: "${day}",
      replaceWith: "CURRENT_DATE",
    },
    weekDayOnly: false,
    lines: 2,
    quantity: 0,
    image: "https://designmodo.com/demo/shopping-cart/item-1.png"
  },
  {
    id: 7,
    price: 120,
    label: "Adult ${day}",
    stripeLabel: "Adult day",
    replaceLabel: {
      replace: "${day}",
      replaceWith: "CURRENT_DATE",
    },
    weekDayOnly: false,
    lines: 1,
    quantity: 0,
    image: "https://designmodo.com/demo/shopping-cart/item-1.png"
  },
  {
    id: 8,
    price: 120,
    label: "Adult Weekend",
    stripeLabel: "Adult Weekend",
    replaceLabel: {
      replace: "${day}",
      replaceWith: "CURRENT_DATE",
    },
    weekDayOnly: true,
    lines: 2,
    quantity: 0,
    image: "https://designmodo.com/demo/shopping-cart/item-1.png"
  },
  {
    id: 9,
    price: 120,
    label: "Kid/Senior Weekend",
    stripeLabel: "Adult Weekend",
    replaceLabel: {
      replace: "${day}",
      replaceWith: "CURRENT_DATE",
    },
    dayInLabel: false,
    weekDayOnly: true,
    lines: 2,
    quantity: 0,
    image: "https://designmodo.com/demo/shopping-cart/item-1.png"
  },
];
