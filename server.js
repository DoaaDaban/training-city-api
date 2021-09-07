const express = require('express')
const cors = require('cors')
require('dotenv').config();
const axios = require('axios')
const server = express()
server.use(cors())


const PORT = process.env.PORT

// http://localhost:3008/movies?cityName=amman
server.get('/movies',getMovies)


// https://api.themoviedb.org/3/search/movie?api_key=6e2225e412c3dd76ada4ad42411a4c48&query=amman
function getMovies(req,res){

    const cityName= req.query.cityName

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API}&query=${cityName}`)
    .then(result => {

        const movieArr= result.data.results.map((movieElement)=> {
            return new Movie(movieElement)
        })
        res.send(movieArr)
    })

}

class Movie{
    constructor(movie){
        this.title= movie.title;
        this.img= process.env.IMG_URL + movie.poster_path;
        this.overview= movie.overview;
    }
}



server.listen(PORT, () =>{
    console.log('listening to', PORT)
})