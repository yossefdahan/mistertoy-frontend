import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getRandomToy,
    getDefaultSort
}

function query(filterBy = {}, sortBy = {}) {

    return storageService.query(STORAGE_KEY)
        .then(toys => {
            let toysToShow = toys
            if (!filterBy.txt) filterBy.txt = ''
            if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
            const regExp = new RegExp(filterBy.txt, 'i')
            toysToShow = toysToShow.filter(toy => regExp.test(toy.name) && toy.price <= filterBy.maxPrice)

            if (sortBy.type === 'createdAt') {
                toysToShow.sort((b1, b2) => (+sortBy.dir) * (b1.createdAt - b2.createdAt))
            } else if (sortBy.type === 'price') {
                toysToShow.sort((b1, b2) => (+sortBy.dir) * (b1.price - b2.price))
            } else if (sortBy.type === 'name') {
                toysToShow.sort((a, b) => sortBy.dir * a.name.localeCompare(b.name))
            }
            return toysToShow
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {

    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}

function getDefaultSort() {
    return { type: '', dir: 1 }
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        createdAt: Date.now(),
        inStock: true,
    }
}

function getRandomToy() {
    return {
        name: utilService.makeLorem(2),
        price: utilService.getRandomIntInclusive(1, 250),
        labels: [],
        createdAt: Date.now(),
        inStock: true,
    }
}

// storageService.post(STORAGE_KEY, { _id: 't101', name: 'Talking Doll', price: 123, labels: ['Doll', 'Battery Powered', 'Baby'], createdAt: 1631031801011, inStock: true, }).then(x => console.log(x))
