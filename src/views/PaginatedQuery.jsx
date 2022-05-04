import React, { useState } from 'react'
import { useQuery } from 'react-query'

import UserTable from '../components/UserTable'

const pageLimit = 5

const fetchUsers = async (page = 1) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${pageLimit}`
  )
  // console.log(res.headers.get('Link')) // Can be used to validate pagination buttons
  return response.json()
}


const fetchPosts = async (page = 1) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${pageLimit}`
  )

  return response.json()
}

function PaginatedQuery() {
  const [page, setPage] = useState(1)
  const { data: users, isLoading, isError, status, error } = useQuery(
    ['paginatedUsers', page],
    () => fetchUsers(page),
    {
      keepPreviousData: true,
    }
  )
  console.log(users)

  const { data: posts } = useQuery(
    ['posts', page],
    () => fetchPosts(page),
    {
      keepPreviousData: true,
    }
  )
  console.log(posts)
 

 

  const prevPage = () => {
    if (page > 1) setPage(page - 1)
  }

  const nextPage = () => {
    setPage(page + 1)
  }

  return (
    <div>
      <h2 className="mb-4">List of Users</h2>
      <div>
        {isError && <div>{error.message}</div>}

        {isLoading && <div>Loading...</div>}

        {status === 'success' && <UserTable users={users} posts={posts}/>}
      </div>
      <div className="flex mt-4 justify-between items-center">
        <button
          className="btn btn-page"
          onClick={prevPage}
          disabled={page <= 1}
        >
          Prev
        </button>
        <span className="rounded font-semibold text-teal-900">
          Page: {page}
        </span>
        <button
          className="btn btn-page"
          onClick={nextPage}
          disabled={users && users.length < pageLimit}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default PaginatedQuery
