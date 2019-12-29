// Client for the example terminal backend: https://github.com/stripe/example-terminal-backend

class Client {
  constructor(url) {
    this.url = url;
  }

  createConnectionToken() {
    const formData = new URLSearchParams();
    return this.postRequest(`${this.url}/connection_token`, formData);
  }

  initTerminal() {
    const terminal = window.StripeTerminal.create({
      onFetchConnectionToken: async () => {
        let connectionTokenResult = await this.createConnectionToken();
        return connectionTokenResult.secret;
      },
      onUnexpectedReaderDisconnect: console.log,
      onConnectionStatusChange: console.log
    });

    terminal.onUnexpectedReaderDisconnect = terminal.clearReaderDisplay

    return terminal
  }

  registerReader({ label, registrationCode }) {
    const formData = new URLSearchParams();
    formData.append("label", label);
    formData.append("registration_code", registrationCode);
    window.localStorage.setItem("label", label)
    window.localStorage.setItem("registration_code", registrationCode)
    return this.postRequest(this.url + "/register_reader", formData);
  }

  processPaymentIntent({ amount, currency, description }) {

    const formData = new URLSearchParams();
    formData.append("amount", amount);
    formData.append("currency", currency);
    formData.append("description", description);
    return this.postRequest(this.url + "/create_payment_intent", formData);
  }

  capturePaymentIntent({ paymentIntentId }) {
    const formData = new URLSearchParams();
    formData.append("payment_intent_id", paymentIntentId);
    return this.postRequest(this.url + "/capture_payment_intent", formData);
  }

  savePaymentMethodToCustomer({ paymentMethodId }) {
    const formData = new URLSearchParams();
    formData.append("payment_method_id", paymentMethodId);
    return this.postRequest(
      this.url + "/attach_payment_method_to_customer",
      formData
    );
  }

  async postRequest(url, body) {
    let response = await fetch(url, {
      method: "post",
      body: body
    });

    if (response.ok) {
      return response.json();
    }

    let text = await response.text();
    throw new Error("Request Failed: " + text);
  }
}

export default Client;
