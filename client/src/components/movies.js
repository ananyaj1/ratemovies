import React, { useEffect, useState } from "react";
import { Space, Button, Card } from "antd";
const { Meta } = Card;

export default function FindMovies() {
    const [playingmovies, setPlayingMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 5;
    const moviesThreshold = 5;
  
    useEffect(() => {
      async function getPlayingMovies() {
        const response = await fetch(`http://localhost:5050/movie/nowplaying?page=${currentPage}`);
  
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
  
        const movs = await response.json();
        setPlayingMovies((prevMovies) => [...prevMovies, ...movs]);
        console.log(playingmovies);
      }
  
      const remainingMovies = playingmovies.length - (currentPage - 1) * moviesPerPage;
      if (remainingMovies <= moviesThreshold) {
        getPlayingMovies();
      }
    }, [currentPage]);
  
    const handleNext = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    };
  
    const handlePrev = () => {
      if (currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
      }
    };
  
    const renderMovies = () => {
      const startIndex = (currentPage - 1) * moviesPerPage;
      const endIndex = startIndex + moviesPerPage;
      const moviesToDisplay = playingmovies.slice(startIndex, endIndex);
  
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {moviesToDisplay.map((movie, index) => (
            <div key={index} style={{ marginRight: '10px' }}>
              <Card hoverable style={{ width: 240 }} cover={<img alt="example" src={movie.posterUrl} />}>
                <Meta title={movie.title} />
              </Card>
            </div>
          ))}
        </div>
      );
    };
  
    return (
      <div>
        <br/>
        <div style={{ display: 'flex', justifyContent: 'center' }}><h3>Now Playing</h3></div>
        {renderMovies()}
        <br/>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Space>
                <Button onClick={handlePrev}>Previous</Button>
                <Button onClick={handleNext}>Next</Button>
            </Space>
        </div>
        <br/>
      </div>
    );
}
  
  
  
  
  
  
  