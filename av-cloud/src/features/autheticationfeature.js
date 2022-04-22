import axios from 'axios';

export async function register(body){
        const response = await axios.post('http://localhost:5000/signin',body)
        console.log(response)

        const data= await response.json()
        return data
}


export async function login(body){
    const response = await axios.post('http://localhost:5000/login',body)
    console.log(response)

    const data= await response.json()
    return data;
}