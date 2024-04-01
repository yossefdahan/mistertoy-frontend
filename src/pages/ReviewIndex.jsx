import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { socketService, SOCKET_EVENT_REVIEW_ADDED } from '../services/socket.service'

import { loadReviews, addReview, removeReview, getActionAddReview } from '../store/actions/review.actions'
import { loadUsers } from '../store/actions/user.actions'
import { loadToys } from '../store/actions/toy.action'

export function ReviewIndex() {

  const users = useSelector(storeState => storeState.userModule.users)
  const loggedInUser = useSelector(storeState => storeState.userModule.user)
  const reviews = useSelector(storeState => storeState.reviewModule.reviews)
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const [reviewToEdit, setReviewToEdit] = useState({ txt: '', toyId: '' })

  const dispatch = useDispatch()

  useEffect(() => {
    loadReviews()
    loadUsers()
    loadToys()
    socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
      console.log('GOT from socket', review)
      dispatch(getActionAddReview(review))
    })

    return () => {
      socketService.off(SOCKET_EVENT_REVIEW_ADDED)
    }
  }, [])

  const handleChange = ev => {
    const { name, value } = ev.target
    setReviewToEdit({ ...reviewToEdit, [name]: value })
  }

  const onAddReview = async ev => {
    ev.preventDefault()
    if (!reviewToEdit.txt || !reviewToEdit.toyId) return alert('All fields are required')
    try {

      await addReview(reviewToEdit)
      showSuccessMsg('Review added')
      setReviewToEdit({ txt: '', toyId: '' })
    } catch (err) {
      showErrorMsg('Cannot add review')
    }
  }

  const onRemove = async reviewId => {
    try {
      await removeReview(reviewId)
      showSuccessMsg('Review removed')
    } catch (err) {
      showErrorMsg('Cannot remove')
    }
  }

  function canRemove(review) {
    if (!loggedInUser) return false
    return review.byUser._id === loggedInUser._id || loggedInUser.isAdmin
  }

  return (
    <div className="review-index">
      <h1>Reviews and Gossip</h1>
      {reviews && <ul className="review-list">
        {reviews.map(review => (
          <li key={review._id}>
            {canRemove(review) &&
              <button onClick={() => onRemove(review._id)}>X</button>}
            <p>
              About:
              <Link to={`/toy/${review.toy._id}`}>
                {review.toy.name}
              </Link>
            </p>
            <h3><pre>{review.txt}</pre></h3>
            <p>
              By:
              <Link to={`/user/${review.byUser._id}`}>
                {review.byUser.fullname}
              </Link>
            </p>
          </li>
        ))}
      </ul>}
      {users && loggedInUser &&
        <form onSubmit={onAddReview}>
          <select
            onChange={handleChange}
            value={reviewToEdit.toyId}
            name="toyId"
          >
            <option value="">Select toy</option>
            {toys.map(toy => (
              <option key={toy._id}
                value={toy._id}>
                {toy.name}
              </option>
            ))}
          </select>
          <textarea
            name="txt"
            onChange={handleChange}
            value={reviewToEdit.txt}
          ></textarea>
          <button>Add</button>
        </form>}
      <hr />
    </div>
  )
}