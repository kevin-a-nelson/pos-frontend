export default [
  {
    id: 1,
    price: 5,
    // Label seen on reader and screen
    label: "Socks",
    // Label sent to stripe account
    stripeLabel: "Socks",
    replaceLabel: null,
    dayInLabel: false,
    weekDayOnly: false,
    // Does not controll whether or not label breaks into to lines in cart
    // Only says if it does break into to mult lines are not
    // if line === 1 then margin top is 8per
    // if line === 2 then marign top is 10per
    lines: 1,
    quantity: 0,
    image: "https://s7d5.scene7.com/is/image/UrbanOutfitters/36672103_031_b?$xlarge$&hei=900&qlt=80&fit=constrain"
  },
  {
    id: 1,
    price: 25,
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
    id: 1,
    price: 40,
    // Label seen on reader and screen
    label: "Jacket",
    // Label sent to stripe account
    stripeLabel: "Jacket",
    replaceLabel: null,
    dayInLabel: false,
    weekDayOnly: false,
    // Does not controll whether or not label breaks into to lines in cart
    // Only says if it does break into to mult lines are not
    // if line === 1 then margin top is 8per
    // if line === 2 then marign top is 10per
    lines: 1,
    quantity: 0,
    image: "https://cdn.shopify.com/s/files/1/0665/2971/products/LifesTooShort-Crewneck-White_400x@2x.progressive.png.jpg?v=1575000922"
  },
  {
    id: 7,
    price: 60,
    label: "Adult day",
    stripeLabel: "Adult Day",
    replaceLabel: {
      replace: "Day",
      replaceWith: "CURRENT_DATE",
    },
    weekDayOnly: false,
    lines: 1,
    quantity: 0,
    image: "https://previews.123rf.com/images/victor85/victor851711/victor85171100330/90448657-man-icon-black-icon-isolated-on-white-background-man-simple-silhouette-web-site-page-and-mobile-app-.jpg"
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
    image: "https://previews.123rf.com/images/victor85/victor851711/victor85171100330/90448657-man-icon-black-icon-isolated-on-white-background-man-simple-silhouette-web-site-page-and-mobile-app-.jpg"
  },
  {
    id: 6,
    price: 60,
    // ${day} is replaced with current day
    label: "Kid/Senior Day",
    stripeLabel: "Kid/Senior Day",
    // replace ${day} in label with current date
    // ex. Kid/Senior ${day} => Kid/Senior Monday
    replaceLabel: {
      replace: "Day",
      replaceWith: "CURRENT_DAY",
    },
    weekDayOnly: false,
    lines: 2,
    quantity: 0,
    image: "https://image.shutterstock.com/image-vector/old-man-child-icon-family-600w-748985377.jpg"
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
    image: "https://image.shutterstock.com/image-vector/old-man-child-icon-family-600w-748985377.jpg"
  },
];
