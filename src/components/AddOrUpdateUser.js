import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import './styles/AddOrUpdateUser.css'

const AddOrUpdateUser = () => {
  // useParams hooks that let you access the parameters of the current route.
  const { id } = useParams()
  const navigate = useNavigate()
  const isIdExists = !id
  const [customer, setCustomer] = useState({
    name: '',
    address: '',
    phone: '',
  })
  const [isValidated, setIsValidated] = useState(false)
  const [isError, setIsError] = useState(false)

  // load perticular customer of requested id
  const loadEditUser = async () => {
    if (!isIdExists) {
      await axios
        .get(`https://fst-invoice.herokuapp.com/api/customers/${id}`)
        .then((user) => {
          if (user.data !== null) {
            setCustomer(user.data)
          } else {
            toast.error(`No Data found for id ${id}.`, {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
            })
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            // show toast alert
            toast.error(`Something Went Wrong while fetching data.`, {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
            })
          }
        })
    }
  }

  // load user after component rendered
  useEffect(() => {
    loadEditUser()
  }, [])

  // set customer's details
  const handleInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value })
  }

  // if not id then it will show create user form else update user form with populated details
  const formSubmit = async (e) => {
    e.preventDefault()
    const { name, address, phone } = customer
    if (name === '' && address === '' && phone === '') {
      setIsError(true)
      return false
    } else {
      return isIdExists ? createUser() : updateUser()
    }
  }

  // create user
  const createUser = async () => {
    try {
      const user = await axios.post(
        'https://fst-invoice.herokuapp.com/api/customers',
        customer,
      )
      // if customer's data
      if (user && user.status === 200) {
        setIsValidated(true)
        toast.success('Data created Successfully')
        // wait for 2 seconds
        setTimeout(() => {
          navigate('/api/customers')
        }, 2000)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // update user
  const updateUser = async () => {
    try {
      const user = await axios.put(
        `https://fst-invoice.herokuapp.com/api/customers/${id}`,
        customer,
      )
      // if customer's data is not null
      if (user && user.status === 200) {
        toast.info('Data Updated Successfully')
        setTimeout(() => {
          navigate('/api/customers')
        }, 2000)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const navigateAllUsers = () => {
    navigate('/api/customers')
  }
  return (
    <>
      <div className="container mt-5">
        <div className="section">
          <div className="userForm">
            <form onSubmit={(e) => formSubmit(e)}>
              <h3>Customer details</h3>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Customer Name"
                  value={customer.name}
                  onChange={(e) => handleInputChange(e)}
                />
                <span className="inputError">
                  {isError && 'This field is mandatory'}
                </span>
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  name="address"
                  placeholder="Customer Address"
                  value={customer.address}
                  onChange={(e) => handleInputChange(e)}
                />
                <span className="inputError">
                  {isError && 'This field is mandatory'}
                </span>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  placeholder="Customer Phone No"
                  value={customer.phone}
                  onChange={(e) => handleInputChange(e)}
                />
                <span className="inputError">
                  {isError && 'This field is mandatory'}
                </span>
              </div>
              <div className="formHandlers mt-3">
                <button
                  onClick={navigateAllUsers}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                {/* if form is validated then it will disable the button and change the text */}
                {/* if id not exists then it will show create user else update user */}
                <button disabled={isValidated} className="btn btn-success">
                  {isValidated
                    ? 'Saving....'
                    : isIdExists
                    ? 'Create'
                    : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default AddOrUpdateUser
