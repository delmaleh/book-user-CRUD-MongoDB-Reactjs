//functions to send requests to server 

import axios from 'axios';
import {API_BASE_URL} from '../constante';


export const get_books = async () =>{  
  let response = await axios.get(API_BASE_URL+'/book')
  return response.data;
}

export const get_book = async (id) =>{  
    let response = await axios.get(API_BASE_URL+'/book/'+id)
    return response.data;
}

export const delete_book = async (id) =>{  
    let response = await axios.delete(API_BASE_URL+'/book/'+id)
    return response.data;
}

export const create_book = async (book) =>{ 
    const payload = book; 
    let response = await axios.post(API_BASE_URL+'/book', payload)
    return response;
}

export const update_book = async (book) =>{ 
    const id = book.id;
    const payload = book;
    let response = await axios.put(API_BASE_URL+'/book/'+id, payload)
    return response;
}

export const book_filter = async (filter) =>{ 
    const payload = filter;
    let response = await axios.post(API_BASE_URL+'/book/filter',payload)
    return response.data;
}