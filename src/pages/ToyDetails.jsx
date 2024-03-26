import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"



export function ToyDetails() {
    const [toy, setToys] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToys(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading..</div>
    return (
        <section className="toy-details-container">
            <h1>Toy name: {toy.name}</h1>
            <h5>ID: {toy._id}</h5>
            <h5>Price: ${toy.price}</h5>
            <p>Labels: {toy.labels && toy.labels.length > 0 ? toy.labels.join(', ') : 'No Labels'}</p>
            <p>Status: {toy.inStock ? 'In Stock' : 'Out of Stock'}</p>
            <p>🪀</p>
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to={`/toy`}>Back</Link>

        </section>
    )
}