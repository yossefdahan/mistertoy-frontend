import { useEffect, useState } from "react"
import { Link, NavLink, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { ToyMsgs } from "../cmps/ToyMsgs"
import { useSelector } from "react-redux"
import { loadReviews } from "../store/actions/review.actions"
import { reviewService } from "../services/review.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"



export function ToyDetails() {
    const [review, setReview] = useState(reviewService.getEmptyReview())
    const [toy, setToys] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        loadToy()
        loadReviews()
    }, [toyId])


    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToys(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }
    }

    async function loadReviews() {
        try {
            // Create a filter object with both aboutToyId and additional filters
            // const filter = { name: 'exampleFilter', sort: 'exampleSort' };

            // Fetch reviews based on aboutToyId and additional filters
            const reviews = await reviewService.query({ toyId: toyId });
            setReviews(reviews);
        } catch (err) {
            console.log('Had issues loading reviews', err);
            showErrorMsg('Cannot load reviews');
        }
    }

    function handleReviewChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setReview((review) => ({ ...review, [field]: value }))
    }

    async function onSaveReview(ev) {
        ev.preventDefault()

        try {

            const savedReview = await reviewService.add({ txt: review.txt, toyId: toy._id })
            setReviews(prevReviews => [savedReview, ...prevReviews]);
            setReview(reviewService.getEmptyReview())
            showSuccessMsg('Review saved!')
        } catch (err) {
            console.log('error saving the review :', err)
        }
    }

    function onMessageSaved() {
        loadToy()
    }

    async function onRemoveReview(reviewId) {
        try {
            await reviewService.remove(reviewId)
            setReviews(prev => prev.filter(r => r._id !== reviewId))
            showSuccessMsg('Review removed!')
        } catch (err) {
            console.log('problem with removing review', err)
        }
    }

    async function onRemoveMsg(toyId, msgId) {
        try {
            toyService.removeMsg(toyId, msgId)
            onMessageSaved()

        } catch (err) {
            console.error('Failed to remove message', err)
        }
    }

    const txtR = review.txt
    if (!toy) return <div>Loading..</div>
    return (
        <section className="messages-container toy-details-container">
            <h1>Toy name: {toy.name}</h1>
            <h5>ID: {toy._id}</h5>
            <h5>Price: ${toy.price}</h5>
            <p>Labels: {toy.labels && toy.labels.length > 0 ? toy.labels.map(label => <span key={label}>{label}</span>) : 'No Labels'}</p>
            <p>Status:<span className={toy.inStock ? 'in-stock' : 'out-of-stock'}>{toy.inStock ? 'In Stock' : 'Out of Stock'}</span></p>

            <Link className="link-btn-edit" to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link className="back-btn-details" to={`/toy`}>Back</Link>
            <h5 className="toy-description-heading">Messages</h5>
            <ToyMsgs toy={toy} onMessageSaved={onMessageSaved} />
            {toy.msgs && (
                <div>
                    {toy.msgs.map((msg) => (
                        <article key={msg.id} className="message">
                            {/* <p>Msg id: {msg.id}</p> */}
                            <h4> Added by : <span> {msg.by.fullname}</span></h4>
                            <pre>Message: {msg.txt}</pre>

                            {/* <p>Msg user id: {msg.by._id}</p> */}
                            <button onClick={() => onRemoveMsg(toy._id, msg.id)}>Remove</button>
                        </article>

                    ))}
                </div>
            )}

            <section className="reviews">
                <h5 className="toy-description-heading">Reviews</h5>
                <ul>
                    {!!reviews.length && reviews.map((review) => (
                        <li key={review._id}>
                            By: {review.byUser.fullname}, {review.txt} {/* Use user.fullname here */}
                            <button type="button" onClick={() => onRemoveReview(review._id)}>
                                ❌
                            </button>
                        </li>
                    ))}
                </ul>
                <form className="login-form" onSubmit={onSaveReview}>
                    <input
                        type="text"
                        name="txt"
                        value={txtR}
                        placeholder="Write a Review"
                        onChange={handleReviewChange}
                        required
                    />
                    <button>Submit Review</button>
                </form>
            </section>

        </section>
    )
}