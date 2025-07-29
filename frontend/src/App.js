import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch('http://3.93.178.115:8000/api/users/')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const addUser = () => {
    if (!name || !email) return alert('Preencha nome e email');
    fetch('http://3.93.178.115:8000/api/users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao adicionar');
        return res.json();
      })
      .then(newUser => {
        setUsers([...users, newUser]);
        setName('');
        setEmail('');
      })
      .catch(err => alert(err.message));
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>Cadastro de Usuários</h1>
      <input
        type="text"
        value={name}
        placeholder="Nome"
        onChange={e => setName(e.target.value)}
      />
      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={addUser}>Adicionar</button>

      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
