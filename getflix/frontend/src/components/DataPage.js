import React, { useEffect, useState, useContext } from 'react';
import MovieAPI from '../apis/MovieApi';
import UserContext from '../UserContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

import { useParams } from 'react-router-dom'

/** DataPage => CURRENTLY NOT BEING USED
 *
 * The rendered page for an individual film or series.
 */

const DataPage = ({ category, add, remove, getFavs }) => {
    const { currentUser } = useContext(UserContext);
    const [ data, setData ] = useState(null);
    // const [ images, setImages ] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const { id } = useParams();

    useEffect(function getDataOnMount() {
        async function getData() {
            setData(await MovieAPI.fetchSingle(id, category));
            // setImages(await MovieAPI.fetchImagesForPage(id, category))
            setFavorites(await getFavs(currentUser.username));
        }
        getData();
    }, [id, category]);


    if(!data) return <h1>Loading...</h1>

    function formatReleaseDate(date) {
        if (date) return String(date).slice(0,4);
        return;
    }

    async function addToFavorites(id, id_type) {
        const newFavs = [...favorites, { id, id_type }]
        setFavorites(newFavs);
        await add({ username: currentUser.username, id, id_type });
    }

    async function removeFromFavorites(id, id_type) {
        const newFavs = [...favorites].filter(f => f.id !== +id && f.id_type !== category)
        setFavorites(newFavs);
        await remove({ username: currentUser.username, id, id_type });
    }

    // const image_path = `https://image.tmdb.org/t/p/original/${images.backdrops[0].file_path}`

    // console.log("DATA:", data);
    // console.log("IMAGES:", images);

    return (
        <div className='DataPage container'>
            <h1 className='display-4'>{data.title || data.name}</h1>
            <p>{formatReleaseDate(data.release_date || data.first_air_date)}</p>




            {favorites.some(f => f.id === +id && f.id_type === category) ?
            // check if displayed film/show is already in favorites, returns boolean

            <button data-testid="removeFavBtn" className='btn btn-light text-warning' onClick={() => removeFromFavorites(data.id, category)}>
                            <FontAwesomeIcon icon={solid("star")} />
            </button>

            :

            <button data-testid="addFavBtn" className='btn btn-secondary text-light' onClick={() => addToFavorites(data.id, category)}>
                            <FontAwesomeIcon icon={solid("star")} />
            </button>

        }
        </div>
    )
}

export default DataPage;
