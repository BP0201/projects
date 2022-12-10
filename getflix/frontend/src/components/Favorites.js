import React, { useEffect, useContext, useState } from 'react';
import MovieAPI from '../apis/MovieApi';
import UserContext from '../UserContext';
import DataCard from './DataCard';

export default function Favorites({ add, remove }) {
  const { userFavorites } = useContext(UserContext);
  const [resolvedFavorites, setResolvedFavorites] = useState([]);

  useEffect(function loadFavoritesOnMount() {
    getFavorites();
  }, []);

  async function getFavorites() {
    // create promise array of each favorite
    const favsInfo = userFavorites.map(f => MovieAPI.fetchSingle(f.id, f.id_type));
    // resolve promise array and set state
    setResolvedFavorites(await Promise.all(favsInfo));
    }

  // render all favorites as DataCards
  function handleFavorites(data) {
    return data.map(d => (
      <DataCard
        name={d.title || d.name}
        key={d.id}
        id={d.id}
        poster={ d.poster_path }
        release_date={d.release_date || d.first_air_date}
        // genres={d.genres}
        description={d.overview}
        category={d.first_air_date ? "tv" : "movie"}
        add={add}
        remove={remove}
      />
    ))}

  return (
    <div className='Favorites container'>
      <h1 className='display-4 m-3'>Favorites</h1>
      {resolvedFavorites.length
            ? (
                <div className="Favorites-DataCards">
                  {handleFavorites(resolvedFavorites)}
                </div>
            ) : (
                <p className="lead">You currently have no favorites.</p>
            )}
    </div>
  )
}