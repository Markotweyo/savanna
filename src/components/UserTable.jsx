import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import { AppContext } from '../store/app-context';
import FlashAlert from './FlashAlert';
import EditIcon from '../icons/edit';
import DeleteIcon from '../icons/delete';
import DeleteModal from './DeleteModal';

import './table.css';

function UserTable({ users, posts }) {
  console.log(users)
  
  console.log(posts)
  
  
  const combinedData = users.map(user => ({...user, ...posts.find(post => post.id === user.id)}))
  console.log(combinedData)

  // Delete Modal Show State
  const [deleteId, setDeleteId] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [flashMessage, setFlashMessage] = useContext(AppContext)

  const queryClient = useQueryClient()

  const deleteMutation = useMutation(
    (id) => axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries()
        setFlashMessage('Delete Successful!')
        hideModal()
      },
    }
  )

  const showDeleteModal = (id) => {
    setDeleteId(id)
    setShowModal(true)
  }

  const onDelete = async (id) => {
    deleteMutation.mutateAsync(id)
  }

  const hideModal = () => setShowModal(false)

  const rows = combinedData.map((user, index) => (
    <tr
      className="bg-white border border-cyan-800 hover:bg-lime-100 active:bg-lime-700 active:text-lime-100"
      key={index}
    >
      <td>{user.userId}</td>
      <td>{user.name}</td>
      <td>{user.username}</td>
      <td className="hover:underline">{user.email}</td>
     {/* <td>{user.gender}</td>*/}
      <td className="inline-flex border-none">
        <Link
          className="p-2 text-cyan-800 hover:text-cyan-500"
          to={`/user/edit/${user.id}`}
        >
          <EditIcon />
        </Link>
        <button
          className="p-2 text-cyan-800 hover:text-cyan-500"
          onClick={() => showDeleteModal(user.id)}
        >
          <DeleteIcon />
        </button>
      </td>
      <td>{user.title}</td>
       
    </tr>
  ))

  return (
    <React.Fragment>
      <DeleteModal
        id={deleteId}
        showModal={showModal}
        deleteAction={onDelete}
        cancelAction={hideModal}
      />
      
      <table className="table-fixed">
        <thead className="text-white bg-cyan-900">
          <tr className="py-4">
            <th className="w-1/12">Id</th>
            <th className="w-1/12">Name</th>
            <th className="w-1/12">Username</th>
            <th className="w-1/12">Email</th>
            {/*<th className="w-1/12">Gender</th>*/}
            <th className="w-1/12">Action</th>
            <th className="w-3/12">Posts</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </React.Fragment>
  )
}

export default UserTable
