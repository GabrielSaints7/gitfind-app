// Imagens
import { useState } from 'react';
import background from '../../assets/images/background.svg'
// Components
import Header from "../Header/Header";
import ItemList from "../Input";
// Styles
import './styles.css'



const App = () => {


  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`)
    const newUser = await userData.json()

    

    if (newUser.login) {
      const { avatar_url, login, bio, name } = newUser;
      setCurrentUser({ avatar_url, login, bio, name })

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`)
      const newRepos = await reposData.json()

      if (newRepos.length) {
        setRepos(newRepos)
      }
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={background} alt="Background icon Github" className="background" />
        <div className="info">
          <div>
            <input name="usuario" placeholder="@username"
              value={user}
              onChange={event => setUser(event.target.value)} 
            />
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {currentUser?.name ? (
            <>
              <div className="perfil">
                <img className="profile"
                  src={currentUser.avatar_url}
                  alt="imagem de perfil"
                />
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          ) : ''}
          {repos?.length ? (
          <div >
            <h4 className="repositorio">Repositórios</h4>
            {repos.map(item => {
              return <ItemList title={item.name} description={item.description} />
            }
            )}
          </div>

          ) : null}

        </div>
      </div>
    </div >
  );
}

export default App;
