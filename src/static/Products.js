export default [
  {
    id: 1,
    price: 40,
    // Label seen on reader and screen
    label: "Shirt",
    // Label sent to stripe account
    stripeLabel: "Shirt",
    dayInLabel: false,
    weekDayOnly: false,
    // Does not controll whether or not label breaks into to lines in cart
    // Only says if it breaks into to lines are not
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
    weekDayOnly: false,
    lines: 1,
    quantity: 0,
    image: "https://designmodo.com/demo/shopping-cart/item-1.png"
  },
  {
    id: 8,
    price: 120,
    label: "Adult Weekend",
    weekDayOnly: true,
    lines: 2,
    quantity: 0,
    image: "https://designmodo.com/demo/shopping-cart/item-1.png"
  },
  {
    id: 9,
    price: 120,
    label: "Kid/Senior Weekend",
    dayInLabel: false,
    weekDayOnly: true,
    lines: 2,
    quantity: 0,
    image: "https://designmodo.com/demo/shopping-cart/item-1.png"
  },
];
