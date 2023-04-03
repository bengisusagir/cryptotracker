/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import "./App.css";
import { Input, Table } from "reactstrap";
import axios from "axios";

let App = () => {
  const [coins, setCoins] = useState([]);
  const [searchTitle, setSearchTitle] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );

      setCoins(res.data);
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        maxHeight: "600px",
        maxWidth: "600px",
        backgroundColor: "#1c1c1c",
        color: "white",
        padding: 20,
        marginBottom: "10px",
        borderRadius: "10px",
      }}
    >
      <h2>Crypto Tracker</h2>
      <br></br>
      <Input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchTitle(e.target.value)}
          ></Input>
      <div
        style={{
          maxHeight: "400px",
          maxWidth: "600px",
          overflowY: "auto",
          display: "flex",
          
        }}
      >
        <Table >
          
          <thead>
            <tr>
              <th>Isim</th>
              <th>Sembol</th>
              <th>Fiyat</th>
              <th>Degisim</th>
            </tr>
          </thead>
          
          {coins
            .filter((value) => {
              if (searchTitle === "") {
                return value;
              } else if (
                value.name.toString().toLowerCase().includes(searchTitle.toString().toLowerCase())
              ) {
                return value;
              }
            
            })

            .map((isim) => (
              <tbody>
                <tr>
                  <td>
                    {" "}
                    <img
                      height="20px"
                      width="20px"
                      src={isim?.image}
                    ></img>{" "}
                    {isim.name}
                  </td>
                  <td>{isim.symbol}</td>
                  <td>${isim.current_price}</td>
                  {isim.price_change_percentage_24h > 0 ? (
                    <td style={{ color: "green" }}>
                      {isim.price_change_percentage_24h}%
                    </td>
                  ) : (
                    <td style={{ color: "red" }}>
                      {isim.price_change_percentage_24h}%
                    </td>
                  )}
                </tr>
                
              </tbody>
           
              
            ))}
           
        </Table>
        
        
      </div>
      
    </div>
  );
};

export default App;
