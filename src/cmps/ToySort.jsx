import { useEffect, useState } from "react"


export function ToySort({ onSetSort, sortBy }) {
    const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })

    useEffect(() => {
        onSetSort(sortByToEdit)
    }, [sortByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.value

        if (field === 'dir')
            setSortByToEdit(prevSort => ({
                ...prevSort,
                dir: -prevSort.dir,
            }))
        else
            setSortByToEdit(prevSort => ({
                ...prevSort,
                [field]: value,
            }))
    }

    return (
        <form className="toy-sort">
            <select className="sort-type"
                name="type"
                value={sortByToEdit.type}
                onChange={handleChange}>

                <option value={''}>----</option>
                <option value="name">Name</option>
                <option value="createdAt">Date</option>
                <option value="price">Price</option>
            </select>
            <label>
                <input type="checkbox"
                    name="dir"
                    value={!sortByToEdit.dir === -1}
                    onChange={handleChange} />
                Descending
            </label>
        </form>
    )
}