export function isValidEmail(email) {
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
}

export function apiCall(payload) {
  return new Promise(function(resolve, reject) {
    let request=new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/graphql", true);
    request.setRequestHeader("Content-Type",
                             "application/graphql");
    let token = localStorage.getItem('token')
    if (token) {
      request.setRequestHeader("Authorization", `Bearer ${token}`)
    }
    request.send(payload);
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        resolve(request.responseText)
      }
    }
  })
}