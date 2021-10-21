import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([])
  const [searchData, setSearchData] = useState({})
  const rows = ['id', 'name', 'username', 'email', 'address']

  useEffect(() => {
    fetch("http://localhost:8000/data")
      .then(response => response.json())
      .then(data => {
        setData(data)
      })
  }, [])

  useEffect(() => {
    const table = document.getElementById("App-Table");
    const tr = table.getElementsByTagName("tr");
    tr[1].style.display = "";
    for (let i = 2; i < tr.length; i++) {
      const rowCheck = Object.entries(searchData).every(eachSearch => {
        const td = tr[i].getElementsByTagName("td")[eachSearch[0]];
        if (td) {
          const txtValue = td.textContent || td.innerText;
          return txtValue.toUpperCase().indexOf(eachSearch[1]) > -1
        }
      })
      if (rowCheck) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }, [searchData])

  const handleSearch = async (e) => {
    if (rows.indexOf(e.target.classList[0].split('-')[1]) > -1) {
      const idx = rows.indexOf(e.target.classList[0].split('-')[1]);
      const value = e.target.value.toUpperCase();
      if (searchData.hasOwnProperty(rows[idx])) {
        let newsearchData = searchData
        newsearchData[idx] = value
        await setSearchData(newsearchData)
      }
      else {
        await setSearchData({ ...searchData, [idx]: value })
      }
    }
  }

  return (
    <div className="App">
      <h1>PWC Assignment to Display Table</h1>
        <table id="App-Table">
          <thead>
            <tr>
              <th key="id">ID</th>
              <th key="name">Name</th>
              <th key="Un">UserName</th>
              <th key="email">Email</th>
              <th key="Add">Address</th>
            </tr>
          </thead>
          <tbody>
            <tr key="search">
              <td key="serach-id"><input type="search" className="search-id" onChange={handleSearch} /></td>
              <td key="search-name"><input type="search" className="search-name" onChange={handleSearch} /></td>
              <td key="search-username"><input type="search" className="search-username" onChange={handleSearch} /></td>
              <td key="search-email"><input type="search" className="search-email" onChange={handleSearch} /></td>
              <td key="search-address"><input type="search" className="search-address" onChange={handleSearch} /></td>
            </tr>
            {data.length > 0 && data.map((item, idx) =>
              <tr key={idx}>
                <td className="id" key={item.id}>{item.id}</td>
                <td className="name" key={item.name}>{item.name}</td>
                <td className="username" key={item.username}>{item.username}</td>
                <td className="email" key={item.email}>{item.email}</td>
                <td className="address" key={item.address.street}>
                  {Object.values(item.address)
                    .filter(ele => typeof (ele) !== 'Object').join(",")},{item.address.geo.lat},{item.address.geo.lng}</td>
              </tr>
            )}
          </tbody>
        </table>
    </div>
  );
}

export default App;
