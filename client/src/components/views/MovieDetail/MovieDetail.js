import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config'
import MainInage from '../Sections/MainImage'
import MovieInfo from '../MovieDetail/Section/MovieInfo'
function MovieDetailPage(props){
    console.log(props)
   const [Movie, setMovie] = useState("")
    useEffect(() => {
        let movieId = props.computedMatch.params.movieId 
        // let movieId = 531219
        console.log(movieId)
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovie(response)
        })
        // return () => {
        //     fetch
        
        // }
    }, [])

    return (
        <div>
            {/* Header */}
            <MainInage
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            />
            {/* body */}
            <div style={{ width : '85%', 'margin' : '1rem auto'}}>

            {/* Movie Info */}
            <MovieInfo movie={Movie}/>
                <br/>
                <div style={{display : 'flex', justifyContent : 'center', margin : '2rem', }}>
                    <button> Toggle Actor View</button>
                </div>
            </div>
        </div>
    )
}

export default MovieDetailPage