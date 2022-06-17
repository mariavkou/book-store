import * as React from 'react';
import { AppState } from '../../States/AppState';
import { BookStore } from '../BookStore/BookStore';
import './BookStores.scss';

export class BookStores extends React.Component<{
    appState: AppState;
}> {

    render(): JSX.Element {
        const {stores, books, authors, countries} = this.props.appState;

        return (
            <div className="bookstores">
                {stores?.length !== 0 && stores?.map(st => {
                    return <BookStore store={st} books={books} countries={countries} authors={authors} key={st?.id}/>
                })}
            </div>
        );
    }
}