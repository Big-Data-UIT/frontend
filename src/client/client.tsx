import { Movie } from "../model/Movie";
import { ApiResponse } from "../model/Response";
function serialize(obj: any) {
    let str = [];
    for (let p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}
class ApiClient {
    // private BASE_URL : string = 
    public async getMovieList(path: string, limit: number): Promise<any> {
        const response = await fetch("/movies", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                limit: limit,
            })
        })
        return response.json()

    }


    public async getMoviesChart(sort: string): Promise<ApiResponse<Movie>> {
        const param = {
            sort: sort
        }
        const response = await fetch(`/movies/chart?${serialize(param)}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
        });
        return response.json()
    }
}

export const getApiClient = () => {
    return new ApiClient();
}