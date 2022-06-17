export type Store = {
    attributes: StoreAttributes;
    id: number;
    relationships: Relationship;
    type: string;
}
export type StoreAttributes = {
    establishmentDate: string;
    name: string;
    rating: number;
    storeImage: string;
    website: string;
}
export type Book = {
    attributes: BookAttributes;
    id: number;
    relationships: Relationship;
    type: string;
}
export type BookAttributes = {
    name: string;
    copiesSold: number;
}
export type Country = {
    attributes: CountryAttributes;
    id: number;
    type: string;
}
export type CountryAttributes = {
    code: string;
}
export type Author = {
    attributes: AuthorAttributes;
    id: number;
    type: string;
}
export type AuthorAttributes = {
    fullName: string;
}
export type Relationship = {
    books?: BooksDataRelationship;
    countries?: CountriesDataRelationship;
    author?: AuthorDataRelationship;
}
export type BooksDataRelationship = {
    data: Data[];
}
export type CountriesDataRelationship = {
    data: Data;
}
export type AuthorDataRelationship = {
    data: Data;
}
export type Data = {
    id: number;
    type:string;
}

export class AppState {
    stores: Store[];
    books: Book[];
    countries: Country[];
    authors: Author[];

    constructor(stores: Store[], books: Book[], countries: Country[], authors: Author[]) {
       this.stores = stores;
       this.books = books;
       this.countries = countries;
       this.authors = authors;
    } 
}