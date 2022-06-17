import * as React from 'react';
import './BookStore.scss';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined';
const moment = require('moment');
import { v4 as uuidv4 } from 'uuid';
import { Author, Book, Country, Store } from '../../States/AppState';

export class BookStore extends React.Component<{
    store: Store;
    books: Book[];
    authors: Author[];
    countries: Country[];
}> {

    constructor(props){
        super(props);
        this.state = {
            flagImg: ''
        }
    }

    componentDidMount(): void {
        const country = this.props.countries?.filter(obj => obj.id === this.props.store?.relationships?.countries?.data.id)[0];
        this.fetchCountryJSON(country?.attributes?.code).then(resp => this.setState({
            flagImg: resp
        }))
    }

    private async fetchCountryJSON(code: string) {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        const jsonResponse = await response.json();
        const flag = jsonResponse[0].flags.png;
        return flag;
    }

    render(): JSX.Element {
        const {books, authors, store} = this.props;
        const {name, storeImage, establishmentDate, website, rating} = store?.attributes;
        const booksRelationships = store?.relationships?.books?.data;

        const storeBookIds = [];
        booksRelationships?.forEach(book => {
            storeBookIds.push(book.id)
        })
        const storeBooks = [];
        books?.forEach(bk => {
            if (storeBookIds.indexOf(bk?.id) != -1) storeBooks.push(bk)
        })

        const selectedBooks = storeBooks.sort((a, b) => (a.attributes.copiesSold < b.attributes.copiesSold ? 1 : -1)).splice(0, 2);

        return (
            <div className="store">
                <div className="store-container">
                    <div className="part-one">
                        <div className="icon">
                            <img src={storeImage}></img>
                        </div>
                        <div className="data-container">
                            <div className="title-container">
                                <div className="title">{name}</div>
                                <div className="rating">
                                    {[1, 2, 3, 4, 5].map(star => {
                                        if (star <= rating) return <StarRateIcon sx={{ fontSize: 20 }} key={star} />;
                                        else return <StarRateOutlinedIcon sx={{ fontSize: 20 }} key={star} />;
                                    })}
                                </div>
                            </div>
                            <div className="data">
                                <table>
                                    <thead>
                                        <tr>
                                            <th colSpan={2}>Best-selling books</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedBooks.length !== 0 && selectedBooks.map(bk => {
                                            const author = authors.filter(obj => obj.id === bk.relationships.author.data.id);
                                            return (
                                                <tr key={uuidv4()}>
                                                    <td key={uuidv4()}>{bk.attributes.name}</td>
                                                    <td key={uuidv4()}>{authors.filter(obj => obj.id === bk.relationships.author.data.id)[0]?.attributes?.fullName}</td>
                                                </tr>
                                            )
                                        })}
                                        {selectedBooks.length === 0 && (
                                                <tr key={uuidv4()}>
                                                    <td key={uuidv4()}>No data available</td>
                                                    <td key={uuidv4()}></td>
                                                </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="part-two">
                        <div className="metadata">
                            {moment(establishmentDate).format("DD.MM.YYYY")} - {website}
                        </div>
                        <div className="country">
                            <img src={this.state?.flagImg}></img>
                        </div>
                    </div>
                </div>   
            </div>
        )
    }
}