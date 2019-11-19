class HTTP {
  constructor() {
    this.baseUrl = "https://qapper.herokuapp.com";
  }

  send(path, method, body = null) {
    if (body) {
      body = JSON.stringify(body);
    }

    return fetch(`${this.baseUrl}/${path}`, {
      method,
      body,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        console.error(response);
      })
      .catch(error => {
        console.error(error);
      });
  }

  get(path) {
    return this.send(path, "GET");
  }

  post(path, body) {
    return this.send(path, "POST", body);
  }

  patch(path, body) {
    return this.send(path, "PATCH", body);
  }

  delete(path, body) {
    return this.send(path, "DELETE", body);
  }
}

export default new HTTP();
