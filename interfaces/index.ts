export interface wall_paper {
    id: string,
    url: string
    favourite: string
}

export interface user_data {
    "favourites": string[],
    "photoURL": string,
    "name": string,
    "isVerified": boolean,
    "email": string,
    "uid": string
}