import * as React from 'react';
import { Suspense } from 'react';
import './App.scss';
import { BookStores } from './Components/BookStores/BookStores';
import { AppState } from './States/AppState';

class App extends React.Component<{
    appState: AppState;
}> {
    render(): JSX.Element {
        return (
            <Suspense fallback={<div>Loading</div>}>
                <div className="app">
                    <BookStores appState={this.props.appState}/>
                </div>
            </Suspense>
        );
    }
}

export default App;
