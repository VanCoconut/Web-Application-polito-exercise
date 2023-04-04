'use strict';

const dayjs = require('dayjs');

const sqlite = require('sqlite3');

const db = new sqlite.Database('films.db', err => { if (err) throw err })

function Film(id, title, favorite, date, rating) {
    this.id = id;
    this.title = title;
    this.favorite = favorite || 0;
    this.date = dayjs(date).format('YYYY-MM-DD') || null;
    this.rating = rating || null;
}

function FilLibrary() {

    this.getAllFilms = () => {

        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films';
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    let array = [];
                    array = rows.map(r => new Film(r.id, r.title, r.favorite, r.watchdate, r.rating));
                    resolve(array);

                }
            })
        })
    }

    this.getFavorite = () => {

        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films WHERE favorite=1';
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    let array = [];
                    array = rows.map(r => new Film(r.id, r.title, r.favorite, r.watchdate, r.rating));
                    resolve(array);
                }
            })
        })
    }

    this.getWatchedToday = () => {

        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films WHERE watchdate= ?';
            db.all(sql, [dayjs().format('YYYY-MM-DD')], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    let array = [];
                    array = rows.map(r => new Film(r.id, r.title, r.favorite, r.watchdate, r.rating));
                    if (array.length != 0) {
                        resolve(array)
                    } else {
                        reject(err)
                    }

                }
            })
        })
    }

    this.getWatchedBefore = (date) => {

        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films WHERE watchdate < ?';
            db.all(sql, [dayjs(date).format('YYYY-MM-DD')], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    let array = [];
                    array = rows.map(r => new Film(r.id, r.title, r.favorite, r.watchdate, r.rating));
                    if (array.length != 0) {
                        resolve(array)
                    } else {
                        reject(err)
                    }
                }
            })
        })
    }

    this.getRated = (number) => {

        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films WHERE rating >= ?';
            db.all(sql, [number], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    let array = [];
                    array = rows.map(r => new Film(r.id, r.title, r.favorite, r.watchdate, r.rating));
                    if (array.length != 0) {
                        resolve(array)
                    } else {
                        reject(err)
                    }
                }
            })
        })

    }

    this.getWithWord = (word) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM films WHERE title LIKE ?';
            db.all(sql, ["%" + word + "%"], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    let array = [];
                    array = rows.map(r => new Film(r.id, r.title, r.favorite, r.watchdate, r.rating));
                    if (array.length != 0) {
                        resolve(array)
                    } else {
                        reject(err)
                    }
                }
            })
        })
    }

    this.addFilm = (film) => {

        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO films(id, title, favorite, watchdate, rating) VALUES(?, ?, ?, ?, ?)';
            db.run(sql, [film.id, film.title, film.favorite, film.date, film.rating], function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    this.delete = (id) => {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM films WHERE id = ?';
            db.run(sql, [id], function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(this.changes)
                }
            })
        })
    }

    this.resetWatchDate = () => {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE films SET watchdate = NULL';
            db.run(sql, [], function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(this.changes)
                }
            })
        })

    }
}
//[dayjs().format('YYYY-MM-DD')]
const filmLibrary = new FilLibrary();
//filmLibrary.getAllFilms().then(r => console.log(r));

//filmLibrary.getFavorite().then(r => console.log(r));

//filmLibrary.getWatchedToday().then(r => console.log(r)).catch( e => console.log( 'NESSUN FILM GUARDATO OGGI ' +e ));

const date = dayjs('2000-12-12')

//filmLibrary.getWatchedBefore(date).then(r => console.log(r)).catch( e => console.log( 'NESSUN FILM GUARDATO PRIMA ' + date.format('YYYY-MM-DD') +' errore: '+e ));

let rate = 4;

//filmLibrary.getRated(rate).then(r => console.log(r)).catch( e => console.log( `NESSUN FILM di rating ${rate}  `+e ));

let word = "star";

//filmLibrary.getWithWord(word).then(r => console.log(r)).catch( e => console.log( `NESSUN FILM contiene: ${word}  `+e ));

const film1 = new Film(10, 'Django', true, dayjs().toISOString(), 5);

//filmLibrary.addFilm(film1).then(() => console.log("Success")).catch( e => console.log( `IMPOSSIBILE INSERIRE FILM  `+e ));

let id = 1;
/* 
filmLibrary.delete(id).then(r => {
    if (r) console.log('Succes')
        else console.log(`NESSUN FILM di id ${id}`)
}).catch(e => console.log(`NESSUN FILM di id ${id}  ` + e)); */

filmLibrary.resetWatchDate().then(r => {
    if (r) console.log('Succes')
        else console.log(`NESSUN data da resettare `)
}).catch(e => console.log(`NESSUN FILM di id ${id}  ` + e)); 

debugger;