import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { toyService } from '../services/toy.service.js'
import { loadToys, removeToy, saveToy, setFilterBy, setSortBy } from '../store/actions/toy.action'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { useEffect, useState } from 'react'
import { ToySort } from '../cmps/ToySort.jsx'
import { MyChart } from '../cmps/MyChart.jsx'

export function ToyIndex() {
    const dispatch = useDispatch()
    // const [sortBy, setSortBy] = useState({ type: '', dir: 1 })
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)


    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy, sortBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSort(sortBy) {
        setSortBy(sortBy)

    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getRandomToy()

        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update toy')
            })
    }



    return (
        <div>

            <main className='main-container flex'>
                <div className='filter-sort-edit-container'>
                    <div className='add-container full main-layout flex'>
                        <Link className='add-link' to="/toy/edit">Add toy</Link>
                        <button className='add-btn' onClick={onAddToy}>Add random toy </button>
                    </div>

                    <div className='filter-sort-container flex '>
                        <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                        <ToySort onSetSort={onSetSort} sortBy={sortBy} />
                    </div>
                </div>
                <div className='chart-container'>
                    <MyChart toys={toys} />
                </div>
                {!isLoading
                    ? <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                    />
                    : <div>Loading...</div>
                }

            </main>
        </div>
    )
}