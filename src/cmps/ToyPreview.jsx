
import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    return (
        <article>
            <hr />
            <h4>{toy.name}</h4>
            <h1>🧸</h1>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {toy.labels && toy.labels.length > 0 && (
                <p>Labels: {toy.labels.join(', ')}</p>
            )}
            <p>Status: <span>{toy.inStock ? "In Stock" : "Out of Stock"}</span></p>
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link to={`/toy/${toy._id}`}>Details</Link>
        </article>
    )
}