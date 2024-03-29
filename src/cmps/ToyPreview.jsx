
import { utilService } from "../services/util.service";
import { Link } from "react-router-dom";
// import img from 'img/'

export function ToyPreview({ toy }) {
    const randomImg = utilService.getRandomIntInclusive(1, 6)
    return (
        <article className="toy-container">

            <img src={`img/${randomImg}.webp`} alt={`${randomImg}`} />
            <div>
                <h2>{toy.name}</h2>
                <h3>Price: <span>${toy.price.toLocaleString()}</span></h3>
                <p>Status:<span className={toy.inStock ? 'in-stock' : 'out-of-stock'}>{toy.inStock ? 'In Stock' : 'Out of Stock'}</span></p>
                <Link className="edit-toy-btn" to={`/toy/edit/${toy._id}`}>Edit</Link>
                <Link className="details-btn" to={`/toy/${toy._id}`}>Details</Link>
            </div>
        </article>
    )
}