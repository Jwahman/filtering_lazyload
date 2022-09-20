import logo from './logo.svg';
import React from 'react'
import axios from 'axios';
import './App.css';
import Card from './components/card/card.tsx';
import searchIcon from './assets/search.svg';
import sortIcon from './assets/sort.svg';
import gridIcon from './assets/grid.svg';
import listIcon from './assets/list.svg';

function App() {
  const usersUrl = 'https://randomuser.me/api/?results=5&page='
  const [users, setUsers] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [gridView, setGridView] = React.useState(true);
  const [nameOrder, setNameOrder] = React.useState(0);
  const [fetched, setFetched] = React.useState(false);

  React.useEffect(() => {
    if (!fetched) {
      setFetched(true);
      getMoreUsers();
    }
  }, []);

  return (
    <section className="main">
      <h1>Meet the team</h1>
      <div className="App">
        <div className="top-row">
          <button className="button-wrapper" alt="toggle grid/list order" onClick={() => {
            if (nameOrder == 1) {
              setNameOrder(2);
              sortUsers(users, 2);
            } else {
              setNameOrder(1);
              sortUsers(users, 1);
            }
          }}><img alt="sort icon" aria-label="sort icon" src={sortIcon} className="sort-icon" /></button>
          <div className="search-wrapper">
            <input
              aria-label="search field"
              alt="search field"
              type="search"
              className="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img src={searchIcon} alt="search button" className="search-icon" />
          </div>
          <button className="button-wrapper grid-icon" alt="toggle grid/list order" aria-label="Toggle between grid and listview" onClick={() => setGridView(!gridView)} ><img alt="grid or list icon" src={gridView ? gridIcon : listIcon} /></button>
          <div className='mobile-row'>
            <button className="button-wrapper" alt="toggle grid/list order" onClick={() => {
              if (nameOrder == 1) {
                setNameOrder(2);
                sortUsers(users, 2);
              } else {
                setNameOrder(1);
                sortUsers(users, 1);
              }
            }}><img aria-label="sort icon" src={sortIcon} className="sort-icon" /></button>
            <button className="button-wrapper grid-icon" alt="toggle grid/list order" onClick={() => setGridView(!gridView)} ><img src={gridView ? gridIcon : listIcon} /></button>
          </div>
        </div>
        <div className={`content ${!gridView ? 'listview' : ''}`}>
          {getFilteredUsers().length > 0 ? getFilteredUsers().map((user, index) => <Card grid={gridView} key={index} user={user} color={getColor(index)}></Card>) : <p>No users with that name</p>}
          <div className='load-more'>
            <button alt="get more users" onClick={() => getMoreUsers()}
              className="fetch">Fetch more</button>
          </div>
        </div>

      </div>
    </section>
  );

  function sortUsers(list, order) {
    if (!list) {
      return;
    }
    if (order == 0) {
      return setUsers(list);
    }
    const l = [...list.sort((a, b) => `${a.name.first} ${a.name.last}`.localeCompare(`${b.name.first} ${b.name.last}`))];
    if (order == 2) {
      return setUsers(l.reverse());
    }
    return setUsers(l);
  }

  function getFilteredUsers() {
    return users.filter(u => searchTerm.length == 0 || (`${u.name.first.toLowerCase()} ${u.name.last.toLowerCase()}`.includes(searchTerm.toLowerCase())));
  }
  function getMoreUsers() {
    axios.get(usersUrl + page).then((response) => {
      const list = [...users, ...response.data.results];
      sortUsers(list, nameOrder);
      setPage(page + 1);
    });
  }

  function getColor(index) {
    switch (index % 6) {
      case 0:
      case 5:
        return '#A7B8A8';
      case 1:
      case 3:
        return '#E1D3C7';
      default: return '#E7CDAB'
    }
  }
}




export default App;
