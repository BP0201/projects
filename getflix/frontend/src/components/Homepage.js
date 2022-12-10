import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import MovieAPI from '../apis/MovieApi';
import UserContext from '../UserContext';
import DataCard from './DataCard';

import './Homepage.css'

const Homepage = ({ add, remove }) => {
    const { currentUser } = useContext(UserContext);
    const [trending, setTrending] = useState([]);

    useEffect(function getTrendingOnMount() {
        async function getTrending() {
            if (currentUser) {
                setTrending(await MovieAPI.getTrending())
            }
        }
        getTrending()
    }, [currentUser])

    return (
        <div className='Homepage'>
            {currentUser ?
            <div className="container col-sm-6 col-md-12 col-lg-10">
                <h4 data-testid="trending-header" className='display-4 my-3 text-center'>
                    What's Hot <span aria-label="flame_emoji" role="img">🔥🔥</span>
                </h4>
                {trending.map(d => (
                    <DataCard
                        name={d.title || d.name}
                        key={d.id}
                        id={d.id}
                        poster={ d.poster_path }
                        release_date={d.release_date || d.first_air_date}
                        // genres={d.genres}
                        description={d.overview}
                        category={d.media_type}
                        add={add}
                        remove={remove}
                    />
                ))}
            </div>

            :

            <div className="container col-md-6 col-lg-12">

                <div className='row justify-content-center'>
                <div className="card col-4 my-5 shadow">
                    <div className="card-body">
                        <h3 className="card-title text-center">Already have an account?</h3>
                        <Link className="link" data-testid="login-link" to="/login">Click here to login</Link>
                        <br />
                        <span>Or <Link className='link' to="/signup">signup</Link> here.</span>
                    </div>
                </div>
                </div>

                <div className='row text-center'>
                    <div className='mt-5 col'>
                    <h1 className='Title'>
                        Getflix
                    </h1>
                    </div>
                </div>

                <div className='Intro text-center'>
                    <div className='row mt-5 mb-3'>
                        <h2 className='col'>Browse movies and shows from all over the world.</h2>
                    </div>
                    <div className='row'>
                        <p className='col'>The information available on this website comes from The Movie Database API.</p>
                    </div>
                </div>

            </div>
            }
        </div>
    )
}

export default Homepage;