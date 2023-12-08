async function request (url: string, method: string, body: any) {
  return await fetch(`http://localhost:3021/${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(async response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText)
      }

      return await response.json()
    }).then(data => {
      return data
    })
}

export const loginRequest = async (username: string) => {
  return await request('login', 'POST', { username })
}

export const chatRequest = async () => {
  return await request('messages', 'GET', undefined)
}
