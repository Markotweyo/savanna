import React from 'react';
import { useQuery } from 'react-query';
import {useParams} from 'react-router-dom';
import { useLocation } from 'react-router-dom'


 const fetchPost = async (id)=> {
     const response= await fetch(`https://jsonplaceholder.typicode.com/posts/?userId=${id}`)
     
    return response.json()
    
}

const UserPost = () => {
    const {id} =useParams()
    const location = useLocation()
    console.log(location)
    console.log(id)
    const {data, error, isLoading, isError}= useQuery(
        ['posts', { id}],
        ()=>fetchPost(id)
    )
    console.log(data)
   
   
  return (
    <div>
        <h2 className="mb-4">Click to Show</h2>
        <h1> Posts By User {location.state}</h1>
        
      <div>
        {isError && <div>{error.message}</div>}

        {isLoading && <div>Loading...</div>}

        {data?.map((post)=> <div key={post.id}>
            <h2>{post.id}. {post.title}</h2>
            <p>{post.body}</p>
        </div>)}
      </div>
    </div>
  )
}

export default UserPost