
import { toyService } from "../services/toy.service.js"
import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy, onEditToy }) {


    return (
        <ul className="toy-list-container">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div>
                        <button className="remove-btn" onClick={() => onRemoveToy(toy._id)}>X</button>
                        {/* <button onClick={() => onEditToy(toy)}>Edit</button> */}
                    </div>

                </li>)}
        </ul>
    )
}