import { useState,useEffect } from "react";
import axios from "axios";
import {RAPID_API_KEY} from '@env'
const key=RAPID_API_KEY
const useFetch=({endpoint,query})=>{
    const [data,setData]=useState([]);
    const [isLoading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
        'X-RapidAPI-Key':key,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    params:{...query}
    };

    const fetchData=async()=>{
        setLoading(true);

        try{
            const response=await axios.request(options);
            setData(response.data.data);
            setLoading(false);
        }catch(error){
            setError(error);
            alert('this is an error')
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
    fetchData();
    },[]
    );

    const refetch=()=>{
    setIsLoading(true);
    fetchData(); 
    }

    return {data,isLoading,error,refetch}

}