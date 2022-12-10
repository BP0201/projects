import React, { useContext } from 'react';
// import { Link } from 'react-router-dom'
import backupImg from '../imgs/default-placeholder.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import UserContext from '../UserContext';

/** DataCard
 * Card containing a poster image, title, description, year of release, and media type
 * Displayed in favorites and after making a search
 */

const DataCard = ({ id, description, poster, category, name, release_date, knownFor, handleResults2, add, remove }) => {
    const { userFavorites } = useContext(UserContext)

    // console.debug("userFavorites:", userFavorites);

    function formatDate(date) {
        if (date) return String(date).slice(0,4);
        return;
    }

    function setMediaType(category) {
        if (category === "movie" || category === "movies") return "Film";
        if (category === "tv" || category === "shows") return "Series";
    }

    // function matchCategoryToParam(category) {
    //     if (category === "tv") return "shows";
    //     if (category === "movie") return "movies";
    //     if (category === "person") return "actors";
    // }

    if (poster) poster = `https://image.tmdb.org/t/p/original${poster}`;

    function checkFavorites() {
        if (userFavorites.some(f => f.id === id && f.id_type === category)) {
            return <button data-testid="removeFavBtn" className='text-warning' onClick={() => remove(id, category)}>
                        <FontAwesomeIcon icon={solid("star")} />
                   </button>
        } else {
            return <button data-testid="addFavBtn" className='' onClick={() => add(id, category)}>
                        <FontAwesomeIcon icon={solid("star")} />
                   </button>
        }
    }

    function handleFilmOrShowResult() {
        return (
            <div className="row">
                <img className="col-md-3" src={poster || backupImg} alt={name} />
                <div className="col-md-9">
                    <h5 className="">{name}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">{formatDate(release_date)}</small></p>
                    <p className="card-text"><small className="text-muted">{setMediaType(category)}</small></p>
                    {/* {userFavorites.some(f => f.id === id && f.id_type === category) ?
                    <button data-testid="removeFavBtn" className='text-warning' onClick={() => remove(id, category)}>
                        <FontAwesomeIcon icon={solid("star")} />
                    </button>
                    :
                    <button data-testid="addFavBtn" className='' onClick={() => add(id, category)}>
                        <FontAwesomeIcon icon={solid("star")} />
                    </button>
                    } */}
                    {checkFavorites()}
                </div>
            </div>
        )
    }



    return (
        <div className='DataCard p-3'>
                {category === "person" ? handleResults2(knownFor) : handleFilmOrShowResult()}
        </div>
    )
}

export default DataCard;