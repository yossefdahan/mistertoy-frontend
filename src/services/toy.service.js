// import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { httpService } from './http.service'

// const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'
export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getRandomToy,
    getDefaultSort,
    getLabels,
    saveMsg,
    getEmptyMsg
}

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]


function getLabels() {
    return [...labels]
}

function query(filterBy, sortBy) {

    return httpService.get(BASE_URL, { params: { filterBy, sortBy } })

}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {

    if (toy._id) {
        return httpService.put(BASE_URL + toy._Id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function saveMsg(toyId, msg) {
    const url = `${BASE_URL}/${toyId}/msg`
    return httpService.post(url, msg)
}

function getEmptyMsg() {
    return {
        msgs: [
            {
                txt: ''
            }
        ]
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        inStock: '',
        labels: [],
    }
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
        inStock: false,
        msgs: []
    }
}

function getRandomToy() {
    return {
        name: utilService.makeLorem(2),
        price: utilService.getRandomIntInclusive(1, 250),
        labels: utilService.getRandomLabels(3),
        createdAt: Date.now(),
        inStock: Math.random() < 0.5,
        // msgs: [
        //     {
        //         id: 'm101',
        //         txt: utilService.makeLorem(2),
        //         by: {
        //             _id: 'u101',
        //             fullname: 'Puki Ga'
        //         },
        //     }
        // ]
    }
}


// const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
// storageService.post(STORAGE_KEY, { _id: 't101', name: 'Talking Doll', price: 123, labels: ['Doll', 'Battery Powered', 'Baby'], createdAt: 1631031801011, inStock: true, }).then(x => console.log(x))

