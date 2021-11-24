import './App.css';
import PetList from './components/PetList';
import PetOwnerStore from './PetOwnerStore';

function App() {
  const store = new PetOwnerStore();
  store.createPet({
    id: 1,
    name: "Bingo",
    type: "Dog",
    breed: "alsertian",
  });
  // -> We have 1 pets and 0 owners, so far!!!
  
  store.createPet({
    id: 2,
    name: "Lloyd",
    type: "Cat",
    breed: "winky",
  });
  // -> We have 2 pets and 0 owners, so far!!!
  store.createOwner({ id: 1, firstName: "Aleem", lastName: "Isiaka" });
  // -> We have 2 pets and 1 owners, so far!!!
  return (
    <div className="App">
      <PetList store={store} />
    </div>
  );
}

export default App;
