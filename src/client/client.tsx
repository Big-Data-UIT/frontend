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
    public async getMovieList(limit: number = 10): Promise<any> {
        const queryParams = {
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
    public async postMovieRating(movieId: string, rating: number): Promise<any> {
        const response = await fetch(`${this.BASE_URL}movie/ratings`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ "movieId": movieId, "rating": rating, "userId": this.userId })
        });
        return response.json()
    }
}

export const getApiClient = (data: any) => {
    return new ApiClient(data);
}