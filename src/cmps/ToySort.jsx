import { useEffect, useState } from "react"
import { SortBySelect } from "./SortBySelect"


export function ToySort({ onSetSort, sortBy }) {
    const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })

    useEffect(() => {
        onSetSort(sortByToEdit)
    }, [sortByToEdit])

    const handleSortByChange = (value) => {
        setSortByToEdit(prevSort => ({
            ...prevSort,
            type: value,
        }));
    }

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
        <form className="toy-sort flex">
            <SortBySelect
                sortBy={sortByToEdit.type}
                onSetSortBy={handleSortByChange}
            />

            <label className="desc-label">
                Descending:
                <input type="checkbox"
                    name="dir"
                    value={!sortByToEdit.dir === -1}
                    onChange={handleChange} />

            </label>
        </form>
    )
}