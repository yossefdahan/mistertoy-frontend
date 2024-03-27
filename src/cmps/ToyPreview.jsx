
import { utilService } from "../services/util.service";
import { Link } from "react-router-dom";
// import img from 'img/'

export function ToyPreview({ toy }) {
    const randomImg = utilService.getRandomIntInclusive(1, 6)
    return (
        <article className="toy-container">

            <h4>{toy.name}</h4>
            <img src={`img/${randomImg}.webp`} alt={`${randomImg}`} />
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>Status: <span>{toy.inStock ? "In Stock" : "Out of Stock"}</span></p>
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link to={`/toy/${toy._id}`}>Details</Link>
        </article>
    )
}