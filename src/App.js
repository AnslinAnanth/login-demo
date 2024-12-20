import logo from './logo.svg';
import './App.css';
import Notes from './pages/notes/notes';
import PokemonList from './pages/PokemonList/pokemonlist';
import Studentlist from './pages/StudentList/studentlist';
import Gadget from './pages/gadgets/gadget';

function App() {
  return (
    <div className="App">
       <div className='student'> <Notes/>
        </div>
    </div>
  );
}

export default App;
