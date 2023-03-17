export const paramData = {
  login: "w",
  pass: "w",
  apiURL: "/api/",
  apiVersion: "v1",
  step: "login",
}

//  for api version "v1"
export const getReq = {
  route: '/items',
  qs: { action: '' },
  init: {
    withCredentials: true,
  }
}

export const delReq = {
  route: '/items',
  qs: { action: '' },
  init: {
    method: 'DELETE',
    body: "",  // delReq.init.body = JSON.stringify({ id: index, });
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
  }
}

export const addReq = {
  route: '/items',
  qs: { action: '' },
  init: {
    method: 'POST',
    body: "",   // addReq.init.body = JSON.stringify({ text: this.new_task.text });
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
  }
}

export const uptdateReq = {
  route: '/items',
  qs: { action: '' },
  init: {
    method: 'PUT',
    body: "",   // uptdateReq.init.body = JSON.stringify({ text: this.tasks[index].text, id: id, checked: this.tasks[index].checked });
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
  }
}

export const logout = {
  route: '/logout',
  qs: { action: '' },
  init: {
    method: 'POST',
    credentials: 'include',
  }
}

export const login = {
  route: '/login',
  qs: { action: '' },
  init: {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ login: 'w', pass: 'w' })   // login.init.body = JSON.stringify({ login: this.login, pass: this.pass });
  }
}

export const registr = {
  route: '/register',
  qs: { action: '' },
  init: {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ login: 'w', pass: 'w' })   // registr.init.body = JSON.stringify({ login: this.login, pass: this.pass });
  }
}


