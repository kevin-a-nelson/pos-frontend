
import DAY_OF_THE_WEEK from "../Utils/dayOfTheWeek"

let cart = [
  {
    id: 1,
    price: 12,
    // label show on the screen and the reader
    name: "Socks",
    // label shown on the stripe website where payments are looked at
    stripeName: "Socks",
    lines: 1,
    quantity: 0,
    image: "https://thumbs.dreamstime.com/t/pair-socks-pair-socks-silhouette-isolated-white-background-118952582.jpg"
  },
  {
    id: 2,
    price: 25,
    name: "Shirt",
    stripeName: "Shirt",
    lines: 1,
    quantity: 0,
    image: "https://cdn.pixabay.com/photo/2017/09/25/18/16/t-shirt-2786105_960_720.png"
  },
  {
    id: 7,
    price: 8,
    name: `Adult ${DAY_OF_THE_WEEK}`,
    stripeName: "Adult Day",
    lines: 2,
    quantity: 0,
    image: "https://media.istockphoto.com/vectors/man-silhouette-icon-vector-icon-simple-element-illustration-man-vector-id1011132134?k=6&m=1011132134&s=170667a&w=0&h=Xzw1b2nu8OnB3pljC2W58Jf2su0-KevtP31E9eWRWRg="
  },
  {
    id: 8,
    price: 28,
    name: "Adult Weekend Pass",
    stripeName: "Adult Weekend Pass",
    lines: 2,
    quantity: 0,
    image: "https://media.istockphoto.com/vectors/man-silhouette-icon-vector-icon-simple-element-illustration-man-vector-id1011132134?k=6&m=1011132134&s=170667a&w=0&h=Xzw1b2nu8OnB3pljC2W58Jf2su0-KevtP31E9eWRWRg="
  },
  {
    id: 6,
    price: 6,
    name: `Student/Senior ${DAY_OF_THE_WEEK}`,
    stripeName: "Student/Senior Day",
    lines: 2,
    quantity: 0,
    image: "https://us.123rf.com/450wm/aliyevs002/aliyevs0021802/aliyevs002180200338/95258927-stock-vector-old-man-with-child-icon-family-icon-simple-black-family-icon-can-be-used-as-web-element-family-desig.jpg?ver=6"
  },
  {
    id: 9,
    price: 10,
    name: "Student/Senior Weekend Pass",
    stripeName: "Adult Whole Event",
    lines: 2,
    quantity: 0,
    image: "https://us.123rf.com/450wm/aliyevs002/aliyevs0021802/aliyevs002180200338/95258927-stock-vector-old-man-with-child-icon-family-icon-simple-black-family-icon-can-be-used-as-web-element-family-desig.jpg?ver=6"
  },
  {
    id: 10,
    price: 0,
    name: "Children 8 and Under",
    stripeName: "Child Day",
    lines: 2,
    quantity: 0,
    image: "https://cdn.clipart.email/1ce8a325245d501fd3da288df37abaaa_baby-silhouette-clip-art-at-clkercom-vector-clip-art-online-_962-768.svg"
  },
  {
    id: 11,
    price: 25,
    name: "Coaches Packet",
    stripeName: "Child Day",
    lines: 2,
    quantity: 0,
    image: "https://cdn.clipart.email/1ce8a325245d501fd3da288df37abaaa_baby-silhouette-clip-art-at-clkercom-vector-clip-art-online-_962-768.svg"
  },
];

let weekendCart = [
  {
    id: 1,
    price: 12,
    // label show on the screen and the reader
    name: "Socks",
    // label shown on the stripe website where payments are looked at
    stripeName: "Socks",
    lines: 1,
    quantity: 0,
    image: "https://thumbs.dreamstime.com/t/pair-socks-pair-socks-silhouette-isolated-white-background-118952582.jpg"
  },
  {
    id: 2,
    price: 25,
    name: "Shirt",
    stripeName: "Shirt",
    lines: 1,
    quantity: 0,
    image: "https://cdn.pixabay.com/photo/2017/09/25/18/16/t-shirt-2786105_960_720.png"
  },
  {
    id: 7,
    price: 12,
    name: `Adult ${DAY_OF_THE_WEEK}`,
    stripeName: "Adult Day",
    lines: 2,
    quantity: 0,
    image: "https://media.istockphoto.com/vectors/man-silhouette-icon-vector-icon-simple-element-illustration-man-vector-id1011132134?k=6&m=1011132134&s=170667a&w=0&h=Xzw1b2nu8OnB3pljC2W58Jf2su0-KevtP31E9eWRWRg="
  },
  {
    id: 6,
    price: 8,
    name: `Student/Senior ${DAY_OF_THE_WEEK}`,
    stripeName: "Student/Senior Day",
    lines: 2,
    quantity: 0,
    image: "https://us.123rf.com/450wm/aliyevs002/aliyevs0021802/aliyevs002180200338/95258927-stock-vector-old-man-with-child-icon-family-icon-simple-black-family-icon-can-be-used-as-web-element-family-desig.jpg?ver=6"
  },
  {
    id: 10,
    price: 0,
    name: "Children 8 and Under",
    stripeName: "Child Day",
    lines: 2,
    quantity: 0,
    image: "https://cdn.clipart.email/1ce8a325245d501fd3da288df37abaaa_baby-silhouette-clip-art-at-clkercom-vector-clip-art-online-_962-768.svg"
  },
  {
    id: 10,
    price: 25,
    name: "Coaches Packet",
    stripeName: "Child Day",
    lines: 2,
    quantity: 0,
    image: "https://cdn.clipart.email/1ce8a325245d501fd3da288df37abaaa_baby-silhouette-clip-art-at-clkercom-vector-clip-art-online-_962-768.svg"
  },
];

if (DAY_OF_THE_WEEK === "Saturday" || DAY_OF_THE_WEEK === "Sunday") {
  cart = weekendCart;
}

export default cart;