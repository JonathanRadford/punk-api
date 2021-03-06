import { useState, useEffect } from "react";
import "./App.scss";
import Nav from "./components/Nav/Nav";
import Main from "./components/Main/Main.jsx";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [beerArray, setBeerArray] = useState([]);
  const [newURL, setNewURL] = useState("");
  const [beerObj, setBeerObj] = useState("");

  useEffect(() => {
    const URL = `https://api.punkapi.com/v2/beers?${newURL}`;
    fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((beer) => {
        setBeerArray(beer);
        setBeerObj(beer);
      });
  }, [newURL]);

  const handleInput = (event) => {
    const searchInput = event.target.value.toLowerCase();
    setSearchTerm(searchInput);
  };

  const handleSubmitABV = (event) => {
    const abv = event.target.checked;
    if (abv === true) {
      setNewURL("abv_gt=6");
    } else {
      setNewURL("");
    }
  };

  const handleSubmitBrewDate = (event) => {
    const date = event.target.checked;
    if (date === true) {
      setNewURL("brewed_before=1-2010");
    } else {
      setNewURL("");
    }
  };

  const handleSubmitPH = (event) => {
    const ph = event.target.checked;
    const findPH = beerArray.filter((beer) => {
      return beer.ph > 0 && beer.ph < 4;
    });
    if (ph === true ) {
      setBeerArray(findPH);
    } else {
      setBeerArray(beerObj);
    }
  };



  const filteredBeers = beerArray.filter((beer) => {
    const beerNameLowerCase = beer.name.toLowerCase();
    return beerNameLowerCase.includes(searchTerm);
  });

  return (
    <div className="App">
      <Nav
        searchTerm={searchTerm}
        handleInput={handleInput}
        handleSubmitBrewDate={handleSubmitBrewDate}
        handleSubmitABV={handleSubmitABV}
        handleSubmitPH={handleSubmitPH}
      />
      <Main beerArr={filteredBeers} />
    </div>
  );
}

export default App;
