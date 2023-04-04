'use strict';

const dayjs = require('dayjs');

function Movie(id, title, inFavorite, date, rating) {
    this.id = id;
    this.title = title;
    this.inFavorite = inFavorite || false;
    this.date = dayjs(date).format('DD/MM/YYYY') || null;
    //this.date = new Date(date);
    this.rating = rating || null;
}

function MoviesLibrary() {

    this.moviesList = [];
    this.moviesLiestByDate = [];
    this.moviesLiestByRank = [];

    this.addNewMovie = movie => this.moviesList.push(movie)

    this.printList = (list) => {
        list.forEach(element =>  console.log(element));
    }

    this.sortByDate = () => {
        this.moviesLiestByDate = [...this.moviesList];
        this.moviesLiestByDate.sort((a,b) => dayjs(b.date)-dayjs(a.date));
    }

    this.sortByRank = () => { 
        this.moviesLiestByRank = this.moviesList.filter(e => e.rating!=null);   
        this.moviesLiestByRank.sort((a,b) => b.rating-a.rating);
    }

    this.deleteMovie = (id) => {
        this.moviesList.splice( this.moviesList.findIndex(a => a.id === id),1);
    }

    this.resetWatchedMovies = () => {
        this.moviesList.forEach(e => e.date=null);
    }
}

const m1 = new Movie(1,"Rosso Malpelo",false,'2023-05-05',5 );
const m3 = new Movie(3,"Una Poltrona per Due", true, '2023-01-01', 1);
const m4 = new Movie(4,"Ryse", false, '2023-03-03', 5);
const m2 = new Movie(2,"Geppetto", false, '2020-03-03', 4);

const list = new MoviesLibrary();
list.addNewMovie(m1);
list.addNewMovie(m2);
list.addNewMovie(m3);
list.addNewMovie(m4);
//list.printList(list.moviesList);
//console.log("");
list.sortByDate();
//list.printList(list.moviesLiestByDate);
list.sortByRank();
//list.printList(list.moviesLiestByRank);
//console.log("");
list.printList(list.moviesList);
list.resetWatchedMovies();
list.deleteMovie(2);
list.printList(list.moviesList);
//list.resetWatchedMovies();
//list.printList(list.moviesList);


 debugger;