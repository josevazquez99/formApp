export interface Person{
    name: string;
    favourites: Favorite[]
}

export interface Favorite{
    id: number,
    name: string
}


export interface User{
    nombe: string,
    email: string,
    username: string,
    password: string

}