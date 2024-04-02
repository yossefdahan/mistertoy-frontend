import { useRef, useState } from "react";
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js";
import { utilService } from "../services/util.service.js";
import { toyService } from "../services/toy.service.js";
import { MultiSelect } from "./MultiSelect.jsx";

import { FormPropsTextFields } from "./FormPropsTextFields.jsx";
import { InStockFilter } from "./InStockFilter.jsx";


export function ToyFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))
    const labels = toyService.getLabels()

    useEffectUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { value, name, type } = target;
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [name]: type === 'checkbox' ? target.checked : value }))
    }

    function handleLabelSelect(selectedLabels) {
        setFilterByToEdit(prevFilter => ({
            ...prevFilter,
            labels: selectedLabels
        }))
    }

    function handleInStockChange(value) {
        setFilterByToEdit(prevFilter => ({ ...prevFilter, inStock: value }))
    }

    return (
        <section className="toy-filter full ">
            <FormPropsTextFields
                value={filterByToEdit.txt}
                onChange={(e) => handleChange({ target: { name: 'txt', value: e.target.value } })}
            />
            <MultiSelect
                selectedLabels={filterByToEdit.labels}
                onChange={handleLabelSelect}
                labels={toyService.getLabels()}
            />
            <InStockFilter
                inStock={filterByToEdit.inStock}
                onInStockChange={handleInStockChange}
            />
        </section>
    )
}