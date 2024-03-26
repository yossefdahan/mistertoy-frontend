import { useRef, useState } from "react";
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js";
import { utilService } from "../services/util.service.js";

export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffectUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        // value = type === 'number' ? +value : value
        // if (type === 'checkbox') value = target.checked
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="toy">Toy:</label>
                <input type="text"
                    id="toy"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />


                <label htmlFor="inStock">In stock:</label>
                <select id="inStock"
                    name="inStock"
                    value={filterByToEdit.inStock}
                    onChange={handleChange}>
                    <option value="all">All</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </form>

        </section>
    )
}