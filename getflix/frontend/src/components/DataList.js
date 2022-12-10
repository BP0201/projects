import React, { useState, useEffect } from 'react';

import MovieAPI from '../apis/MovieApi';
import SearchForm from '../forms/SearchForm'
import DataCard from './DataCard';

/** DataList
 * Renders the SearchForm and an array of DataCards, displayed after a search.
 */

const DataList = ({ category = "multi", add, remove }) => {
    // console.debug("DataList");
    const [data, setData] = useState([]);
    // const [isFavorited, setIsFavorited] = useState(false);

    useEffect(function getDataOnMount() {
        // console.debug("DataList useEffect getDataOnMount")
            search();
    }, []);

    async function search(q) {
        const data = await MovieAPI.fetch(q, category)
        if (!(data.length && data[0].id === 954884)) {
            setData(data);
        }
    }

    function filter(category) {
        const filtered = data.filter(d => d.media_type === category);
        setData(filtered);
    }

    function sortByRelease(type) {
        let newData = [...data];
        function sortOld(a, b) {
            if (
            (a.release_date || a.first_air_date)
            <
            (b.release_date || b.first_air_date)
            ){
              return -1;
            }
            if (
            (a.release_date || a.first_air_date)
            >
            (b.release_date || b.first_air_date) ){
              return 1;
            }
            return 0;
          }
          function sortNew(a, b) {
            if (
            (a.release_date || a.first_air_date)
            <
            (b.release_date || b.first_air_date)
            ){
              return 1;
            }
            if (
            (a.release_date || a.first_air_date)
            >
            (b.release_date || b.first_air_date) ){
              return -1;
            }
            return 0;
          }
        if (type === "old") {
            newData.sort( sortOld );
        } else if (type === "new") {
            newData.sort( sortNew );
        }
        setData(newData);
    }

    if(!data) return <h1>Loading...</h1>

    function handleResults(data) {
        return data.map(d => (
            <DataCard
                name={d.title || d.name}
                key={d.id}
                id={d.id}
                poster={ d.poster_path }
                release_date={d.release_date || d.first_air_date}
                // genres={d.genres}
                description={d.overview}
                category={d.media_type}
                knownFor={d.known_for}
                handleResults2={handleResults2}
                add={add}
                remove={remove}
            />
        ))
    }

    function handleResults2(arr) {
        return arr.map(d => (
            <DataCard
                name={d.title || d.name}
                key={d.id}
                id={d.id}
                poster={ d.poster_path }
                release_date={d.release_date || d.first_air_date}
                // genres={d.genres}
                description={d.overview}
                category={d.media_type}
                knownFor={d.known_for}
                add={add}
                remove={remove}
            />
        ))
    }

    return (
        <div className='DataList container'>
            <h3 className='display-4 my-2'>Search</h3>
            {data.length ?
            <div className='button-group'>
            <button onClick={() => filter("tv")}>Hide Movies</button>
            <button onClick={() => filter("movie")}>Hide Shows</button>
            <button onClick={() => sortByRelease("old")}>Sort results by oldest</button>
            <button onClick={() => sortByRelease("new")}>Sort results by newest</button>
            </div>
            :
            ""
            }
            <SearchForm searchFor={search} />
            {data.length
            ? (
                <div className="DataList-list">
                  {handleResults(data)}
                </div>
            ) : (
                <p className="lead">Results will appear here.</p>
            )}
        </div>
    )
}

export default DataList;