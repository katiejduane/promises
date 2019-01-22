// JavaScript is an asynchronous language.
// What does this mean?
// console.log("1")
// setTimeout(()=>{
//     console.log("2")
// },0)
// console.log("3")
// It means that line 3 runs, then line 4, which sends the callback out to
// the event loop to be checked the next times it runs, line 7 runs, then it
// goes back up to the top of the event loop and runs everything again, and 
// line 5 finally runs. 
// JAVASCRIPT RUNS OUT OF ORDER BECAUSE IT DEPENDS/RUNS ON THE EVENT LOOP!

// PROMISES are the answer to this problem (it's not always a problem but it can be)

const request = require('request');
const apiBaseUrl = 'http://api.themoviedb.org/3';
const apiKey = 'fec8b5ab27b292a68294261bb21b04a5';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`

// get now playing movies: 
// - get, from the movie data, the cast data
// -- get, from cast data, an indivdual actor
// --- get, from individual actor, highest grossing movie

// let movieData = '';
// Promise is a constructor/class. It's built into JS. Make a new one with the
// 'new' keyword. It takes 1 arg: a callback function. That callback function 
// takes 2 args: resolve, reject.
const moviePromise = new Promise((resolve, reject) => { 
    request.get(nowPlayingUrl,(err, response, body) => {
        // when we call reject, the outside world will know our promise has failed
        if (err) {
            reject(err);
        }
        const parsedBody = JSON.parse(body)
        // console.log(parsedBody)
        // when we call resolve, the outside world will know the promise is done.
        resolve(parsedBody);
    })
})

// THEN = PROMISE!!!
// a promise has a 'then'. The 'then' will run whenever resolve is called inside the promise.
moviePromise.then((dataGivenToResolve) => {
    console.log(dataGivenToResolve)
}).catch((dataGivenToReject) => {
    // if reject is called, then catch runs
    console.log(dataGivenToReject)
})

console.log(moviePromise)

// const castUrl = `${apiBaseUrl}/${movieData.results[0].id}/credits?api_key=${apiKey}`
// request.get(castUrl, (err, response, body) => {

// })
