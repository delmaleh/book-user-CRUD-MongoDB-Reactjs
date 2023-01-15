//functions to send requests to server 

import axios from 'axios';
import {API_BASE_URL} from '../constante';


export const get_users = async () =>{  
  let response = await axios.get(API_BASE_URL+'/user')
  return response.data;
}

export const get_user = async (id) =>{  
    let response = await axios.get(API_BASE_URL+'/user/'+id)
    return response.data;
}

export const delete_user = async (id) =>{  
    let response = await axios.delete(API_BASE_URL+'/user/'+id)
    return response.data;
}

export const create_user = async (user) =>{ 
    const payload = user; 
    let response = await axios.post(API_BASE_URL+'/user', payload)
    return response;
}

export const update_user = async (user) =>{ 
    const id = user.id;
    const payload = user;
    let response = await axios.put(API_BASE_URL+'/user/'+id, payload)
    return response;
}

export const book_filter = async (filter) =>{ 
    const payload = filter;
    let response = await axios.post(API_BASE_URL+'/user/filter',payload)
    return response.data;
}