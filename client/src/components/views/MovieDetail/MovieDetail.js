import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config'
import MainInage from '../Sections/MainImage'
import MovieInfo from '../MovieDetail/Section/MovieInfo'
import GridCards from '../commons/GridCards'
import { Row } from 'antd'
import Favorite from './Section/Favorite'
function MovieDetailPage(props) {
	console.log(props)
	const [Movie, setMovie] = useState('')
	const [Casts, setCasts] = useState([])
	const [ActorToggle, setActorToggle] = useState(false)
	let movieId = props.match.params.movieId
	useEffect(() => {
		// let movieId = 531219
		console.log(movieId)
		let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
		let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
		fetch(endpointInfo)
			.then((response) => response.json())
			.then((response) => {
				console.log(response)
				setMovie(response)
			})

		fetch(endpointCrew)
			.then((response) => response.json())
			.then((response) => {
				console.log('responseCrew', response)
				setCasts(response.cast)
			})
	}, [movieId])

	const toggleActionView = () => {
		setActorToggle(!ActorToggle)
	}

	return (
		<div>
			{/* Header */}
			<MainInage
				image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
				title={Movie.original_title}
				text={Movie.overview}
			/>
			{/* body */}
			<div style={{ width: '85%', margin: '1rem auto' }}>
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Favorite
						movieInfo={Movie}
						movieId={movieId}
						userFrom={localStorage.getItem('userId')}
					/>
				</div>
				{/* Movie Info */}
				<MovieInfo movie={Movie} />
				<br />
				<div
					style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}
				>
					<button onClick={toggleActionView}> Toggle Actor View</button>
				</div>
				{ActorToggle && (
					<Row gutter={[16, 16]}>
						{Casts &&
							Casts.map((cast, index) => (
								<React.Fragment key={index}>
									<GridCards
										image={
											cast.profile_path
												? `${IMAGE_BASE_URL}w500${cast.profile_path}`
												: null
										}
										characterName={cast.name}
									/>
								</React.Fragment>
							))}
					</Row>
				)}
			</div>
		</div>
	)
}

export default MovieDetailPage
