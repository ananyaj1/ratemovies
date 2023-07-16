import React, { useEffect, useState } from "react";
import { Space, Button, Card } from "antd";
const { Meta } = Card;

export default function FindMovies() {
    const [playingmovies, setPlayingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [currentPlayingPage, setCurrentPlayingPage] = useState(1);
    const [currentPopularPage, setCurrentPopularPage] = useState(1);
    const [currentTopRatedPage, setCurrentTopRatedPage] = useState(1);
    const moviesPerPage = 5;
    const moviesThreshold = 5;
  
    // useEffect for playing Movies
    useEffect(() => {
      async function getPlayingMovies() {
        const response = await fetch(`http://localhost:5050/movie/nowplaying?page=${currentPlayingPage}`);
  
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
  
        const movs = await response.json();
        setPlayingMovies((prevMovies) => [...prevMovies, ...movs]);
        console.log(playingmovies);
      }
  
      const remainingMovies = playingmovies.length - (currentPlayingPage - 1) * moviesPerPage;
      if (remainingMovies <= moviesThreshold) {
        getPlayingMovies();
      }
    }, [currentPlayingPage]);

     // useEffect for Popular Movies
    useEffect(() => {
        async function getPopularMovies() {
          const response = await fetch(`http://localhost:5050/movie/popular?page=${currentPopularPage}`);
    
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
    
          const movis = await response.json();
          setPopularMovies((prevMovies) => [...prevMovies, ...movis]);
          console.log(popularMovies);
        }
    
        const remainingMovies = popularMovies.length - (currentPopularPage - 1) * moviesPerPage;
        if (remainingMovies <= moviesThreshold) {
          getPopularMovies();
        }
    }, [currentPopularPage]);

     // useEffect for Top rated Movies
     useEffect(() => {
        async function getRatedMovies() {
          const response = await fetch(`http://localhost:5050/movie/toprated?page=${currentTopRatedPage}`);
    
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
    
          const movis = await response.json();
          setTopRatedMovies((prevMovies) => [...prevMovies, ...movis]);
          console.log(topRatedMovies);
        }
    
        const remainingMovies = topRatedMovies.length - (currentTopRatedPage - 1) * moviesPerPage;
        if (remainingMovies <= moviesThreshold) {
          getRatedMovies();
        }
    }, [currentTopRatedPage]);
  
    const handleNext = (moviesType) => {
        if (moviesType === 'playing') {
          setCurrentPlayingPage((prevPage) => prevPage + 1);
        } else if (moviesType === 'popular') {
          setCurrentPopularPage((prevPage) => prevPage + 1);
        } else if (moviesType === 'topRated') {
          setCurrentTopRatedPage((prevPage) => prevPage + 1);
        }
    };
  
    const handlePrev = (moviesType) => {
        if (moviesType === 'playing') {
          if (currentPlayingPage > 1) {
            setCurrentPlayingPage((prevPage) => prevPage - 1);
          }
        } else if (moviesType === 'popular') {
          if (currentPopularPage > 1) {
            setCurrentPopularPage((prevPage) => prevPage - 1);
          }
        } else if (moviesType === 'topRated') {
          if (currentTopRatedPage > 1) {
            setCurrentTopRatedPage((prevPage) => prevPage - 1);
          }
        }
    };
  
    const renderMovies = (moviesType) => {
        let movies = [];
        let currentPage = 1;
      
        if (moviesType === 'playing') {
          movies = playingmovies;
          currentPage = currentPlayingPage;
        } else if (moviesType === 'popular') {
          movies = popularMovies;
          currentPage = currentPopularPage;
        } else if (moviesType === 'topRated') {
          movies = topRatedMovies;
          currentPage = currentTopRatedPage;
        }
      
        const startIndex = (currentPage - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;
        const moviesToDisplay = movies.slice(startIndex, endIndex);
      
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h2>Find Movies, Write Reviews. </h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h3>Now Playing</h3>
        </div>
        {renderMovies('playing')}
        <br/>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Space>
            <Button onClick={() => handlePrev('playing')}>Previous</Button>
            <Button onClick={() => handleNext('playing')}>Next</Button>
        </Space>
        </div>
        <br/>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h3>Popular Movies</h3>
        </div>
        {renderMovies('popular')}
        <br/>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Space>
            <Button onClick={() => handlePrev('popular')}>Previous</Button>
            <Button onClick={() => handleNext('popular')}>Next</Button>
        </Space>
        </div>
        <br/>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h3>Top Rated Movies</h3>
        </div>
        {renderMovies('topRated')}
        <br/>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Space>
            <Button onClick={() => handlePrev('topRated')}>Previous</Button>
            <Button onClick={() => handleNext('topRated')}>Next</Button>
        </Space>
        </div>
        <br/>
     </div>
    );
}
  
  
  
  
  
  
  