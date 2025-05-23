export const login = async (userName, password) => {
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userName, password })
  });
  
  const data = await response.json();
  data.status = response.status;
  return data;
}