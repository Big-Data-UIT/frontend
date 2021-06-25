import { Movie } from "../model/Movie";
import { Rating } from "../model/Rating";
import { ApiResponse } from "../model/Response";
function serialize(obj: any) {
    let str = [];
    for (let p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}
export class ApiClient {
    BASE_URL: string = "/";
    userId: number
    constructor(data: any) {
        this.userId = data?.userId || null;
    }
    // private BASE_URL : string = 
    public async getMovieList(offset: number = 1,limit: number = 12): Promise<any> {
        const queryParams = {
            offset,
            limit
        }
        const response = await fetch(`${this.BASE_URL}movie?${serialize(queryParams)}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
        })
        return response.json()

    }
    // private BASE_URL : string = 
    public async getMovieListUnRate(offset: number = 1,limit: number = 12, userId : string): Promise<any> {
        const queryParams = {
            offset,
            limit,
            userId
        }
        const response = await fetch(`${this.BASE_URL}unrated-movie?${serialize(queryParams)}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
        })
        return response.json();

    }
    public async getRatings(limit: number): Promise<ApiResponse<Rating>> {
        const queryParams = {
            limit
        }
        const response = await fetch(`${this.BASE_URL}ratings?${serialize(queryParams)}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        return response.json();
    }
    public async getMovieRatings(movieId: number): Promise<any> {
        const queryParams = {
            movieId,
        }
        const response = await fetch(`${this.BASE_URL}movie/ratings/${serialize(queryParams)}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
        });
        return response.json();
    }
    public async postMovieRating(movieId: string, rating: number, userId: string): Promise<any> {
        console.log(movieId, rating, userId);
        const response = await fetch(`${this.BASE_URL}movie/ratings`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ "movieId": movieId, "rating": rating, "userId": userId || this.userId })
        });
        return response.json()
    }
}

export const getApiClient = (data: any) => {
    return new ApiClient(data);
}