import axios from "axios";


axios.defaults.baseURL = "http://localhost:8000/api";

const responseBody = (response: any) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url:string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url:string ) => axios.delete(url).then(responseBody),
  };
  


const Product = {
  create: (name: string,price: number, description: string,image: string) => requests.post('products', {name, price, description, image}),
  list: () =>  requests.get('products'),
  delete : (id: number) => requests.delete(`products/${id}`),
  update: (id:number,name: string,price: number, description: string,image: string) => requests.put(`products/${id}`, {name, price, description, image}),
};

const agent = {Product }

export default agent;