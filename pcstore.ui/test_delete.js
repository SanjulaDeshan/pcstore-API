process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function testDelete() {
  const loginRes = await fetch('https://localhost:7297/api/Auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'Admin@123' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token;

  console.log('Logged in, got token:', token ? 'YES' : 'NO');

  const deleteRes = await fetch('https://localhost:7297/api/Advertisement/671bc3ee-e5af-4cb9-4d54-08deba46c26a', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  console.log('Delete status:', deleteRes.status);
  const text = await deleteRes.text();
  console.log('Delete response:', text);
}

testDelete();
