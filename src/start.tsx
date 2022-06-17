import * as ReactDOM from 'react-dom';
import * as React from 'react';
import App from './App/App';
import { AppState, Author, Book, Country, Store } from './App/States/AppState';

export default function start(stores: Store[], books: Book[], countries: Country[], authors: Author[]) {
    const appState = new AppState(stores, books, countries, authors)

    ReactDOM.render(
            <App appState={appState}/>,
        document.getElementById('root')
    );
}