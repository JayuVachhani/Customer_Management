import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './styles/DisplayAllUsers.css'

const DisplayAllUsers = () => {
  const navigate = useNavigate()
  const [allUsers, setAllUsers] = useState([])
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    fetchAllUsers()
  }, [])

  // fetch all customers data from API
  const fetchAllUsers = async () => {
    setLoader(true)
    const users = await axios.get(
      ' https://fst-invoice.herokuapp.com/api/customers',
    )
    setAllUsers(users.data)
    setLoader(false)
  }

  // send customer id to update details
  const updateUserDetails = (id) => {
    navigate(`/api/customers/${id}`)
  }

  // delete particular customer
  const deleteUser = async (id) => {
    const confirmation = window.confirm(
      'Are you sure want to delete this customer?',
    )
    if (confirmation) {
      await axios.delete(
        `https://fst-invoice.herokuapp.com/api/customers/${id}`,
      )
      setAllUsers(fetchAllUsers())
    }
  }
  // Navigate to create customer page
  const navigateCreateUser = () => {
    navigate('/create')
  }

  return (
    <>
      <div className="all_customers">
        <div className="userDetails">
          <h2>All Customers</h2>
          <button className="btn btn-success" onClick={navigateCreateUser}>
            Create User
          </button>
          <div>
            {loader ? (
              <span className="loader">Loading...</span>
            ) : (
              <table border={1} className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone No</th>
                    <th scope="col" colSpan={2}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Display all users on UI */}
                  {allUsers.length > 0 ? (
                    allUsers.map((user) => {
                      return (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.phone}</td>
                          <td>
                            <button
                              className="btn btn-outline-warning text-dark"
                              onClick={() => updateUserDetails(user.id)}
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => deleteUser(user.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan={5}>No User Detail Available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default DisplayAllUsers
