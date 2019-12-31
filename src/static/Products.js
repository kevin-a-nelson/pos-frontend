

function getDayStr() {
  let date = new Date()
  // Sun = 0, Mon = 1 ... 
  let dayNum = date.getDay();
  let dayStr = ""
  switch (dayNum) {
    case 0: dayStr = "Sunday"; break;
    case 1: dayStr = "Monday"; break;
    case 2: dayStr = "Tuesday"; break;
    case 3: dayStr = "Wednesday"; break;
    case 4: dayStr = "Thursday"; break;
    case 5: dayStr = "Friday"; break;
    case 6: dayStr = "Saturday"; break;
    default: dayStr = "Day"; break;
  }

  return dayStr
}

const DAY_OF_THE_WEEK = getDayStr()

export default [
  {
    id: 1,
    price: 5,
    label: "Socks",
    stripeLabel: "Socks",
    replaceLabel: null,
    dayInLabel: false,
    weekDayOnly: false,
    lines: 1,
    quantity: 0,
    image: "https://s7d5.scene7.com/is/image/UrbanOutfitters/36672103_031_b?$xlarge$&hei=900&qlt=80&fit=constrain"
  },
  {
    id: 1,
    price: 25,
    label: "Shirt",
    stripeLabel: "Shirt",
    replaceLabel: null,
    dayInLabel: false,
    weekDayOnly: false,
    lines: 1,
    quantity: 0,
    image: "http://sportsteam.com/pub/media/catalog/product//9/1/91285.jpg"
  },
  {
    id: 1,
    price: 40,
    label: "Jacket",
    stripeLabel: "Jacket",
    replaceLabel: null,
    dayInLabel: false,
    weekDayOnly: false,
    lines: 1,
    quantity: 0,
    image: "https://cdn.shopify.com/s/files/1/0665/2971/products/LifesTooShort-Crewneck-White_400x@2x.progressive.png.jpg?v=1575000922"
  },
  {
    id: 7,
    price: 60,
    label: `Adult ${DAY_OF_THE_WEEK}`,
    stripeLabel: "Adult Day",
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
    replaceLabel: null,
    weekDayOnly: true,
    lines: 2,
    quantity: 0,
    image: "https://previews.123rf.com/images/victor85/victor851711/victor85171100330/90448657-man-icon-black-icon-isolated-on-white-background-man-simple-silhouette-web-site-page-and-mobile-app-.jpg"
  },
  {
    id: 6,
    price: 60,
    label: `Kid/Senior ${DAY_OF_THE_WEEK}`,
    stripeLabel: "Kid/Senior Day",
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
    replaceLabel: null,
    dayInLabel: false,
    weekDayOnly: true,
    lines: 2,
    quantity: 0,
    image: "https://image.shutterstock.com/image-vector/old-man-child-icon-family-600w-748985377.jpg"
  },
];
