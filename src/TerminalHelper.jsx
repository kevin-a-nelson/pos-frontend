
class TerminalHelper {
  getLineItems(cart) {
    let lineItems = []
    cart.forEach((item) => {
      if (item.quantity > 0) {
        let displayItem = {
          "description": item.label,
          "amount": item.price * 100,
          "quantity": item.quantity
        }
        lineItems.push(displayItem)
      }
    })
    return lineItems
  }

}

export default TerminalHelper