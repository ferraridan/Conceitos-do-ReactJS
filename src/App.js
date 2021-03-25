import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(responde => {
      setRepositories(responde.data);
    });
  }, []);

  async function handleAddRepository() {
    const responde = await api.post('repositories', {
      title: 'Brie',
      url: 'https://github.com/ferraridan/brie',
      techs: ['Node.js', 'ReactJS']
    })

    setRepositories([ ... repositories, responde.data ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
