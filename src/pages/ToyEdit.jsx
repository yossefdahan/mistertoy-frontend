import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.action.js"


export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    const labelsOptions = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name, checked } = target
        if (type === 'checkbox') {
            if (name === 'inStock') {
                setToyToEdit(prevToy => ({ ...prevToy, [name]: checked }))
            } else {
                setToyToEdit(prevToy => {
                    const labelsUpdate = checked ? [...prevToy.labels, value] : prevToy.labels.filter(label => label !== value)
                    return { ...prevToy, labels: labelsUpdate }
                })
            }
        } else {
            const updatedValue = type === 'number' ? +value : value
            setToyToEdit(prevToy => ({ ...prevToy, [name]: updatedValue }))
        }
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        if (!toyToEdit.price) toyToEdit.price = 100
        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg('Toy Saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Had issues in toy details')
            })
    }

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

            <form onSubmit={onSaveToy} >
                <label htmlFor="name">name : </label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name..."
                    value={toyToEdit.name}
                    onChange={handleChange}
                />
                <label htmlFor="price">Price : </label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={toyToEdit.price}
                    onChange={handleChange}
                />
                <div>
                    {labelsOptions.map(label => (
                        <label key={label}>
                            <input
                                type="checkbox"
                                name="labels"
                                value={label}
                                checked={toyToEdit.labels.includes(label)}
                                onChange={handleChange}
                            />
                            {label}
                        </label>
                    ))}
                </div>
                <label htmlFor="inStock">In Stock: </label>
                <input
                    type="checkbox"
                    name="inStock"
                    id="inStock"
                    checked={toyToEdit.inStock}
                    onChange={handleChange}
                />
                <div>
                    <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy">Cancel</Link>
                </div>
            </form>
        </section>
    )

}