import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!filterBy.txt) filterBy.txt = ''
            const regExp = new RegExp(filterBy.txt, 'i')
            return toys.filter(toy => regExp.test(toy.name))
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY + toyId)
}

function remove(toyId) {
    return storageService.delete(STORAGE_KEY + toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getDefaultFilter() {
    return { txt: '' }
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

// storageService.post(STORAGE_KEY, { _id: 't101', name: 'Talking Doll', price: 123, labels: ['Doll', 'Battery Powered', 'Baby'], createdAt: 1631031801011, inStock: true, }).then(x => console.log(x))
