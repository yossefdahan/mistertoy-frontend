import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { ToyMsgs } from "../cmps/ToyMsgs"



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

    function onMessageSaved() {
        loadToy()
    }

    async function onRemoveMsg(toyId, msgId) {
        try {
            toyService.removeMsg(toyId, msgId)
            onMessageSaved()

        } catch (err) {
            console.error('Failed to remove message', err)
        }
    }

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
        </section>
    )
}