import axios from "axios";

class Services {
    constructor() {
        this.apiCaller = axios.create({
            baseURL: `http://api.wolframalpha.com/v1`,
            withCredentials: false,
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
              },
        })
    }

    async solveEquation(equation) {
        const response = await this.apiCaller.get('/simple?appid=YEU5E6-JXHX24R27T&i=solve' + equation)
        
        return response.data
    }
}

const axiosRequestFunctions = new Services()

export default axiosRequestFunctions;