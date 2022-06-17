import 'es6-object-assign/auto'
import start from './start'

(async () => {
    const stores = await fetch('http://localhost:3000/stores').then(response => response.json());
    const books = await fetch('http://localhost:3000/books').then(response => response.json());
    const countries = await fetch('http://localhost:3000/countries').then(response => response.json());
    const authors = await fetch('http://localhost:3000/authors').then(response => response.json());

    start(stores?.data, books?.data, countries?.data, authors?.data)
})()