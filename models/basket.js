const path = require('path')
const fs = require('fs')
const store = require('store')


const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'basket.json'
)

class Basket {
    static async add(card){
        const basket = await Basket.fetch()
        const idx = basket.cards.findIndex(c => c.id === card.id)
        const candidate = basket.cards[idx]

        if (candidate) {
            // курс уже есть
            candidate.count++
            basket.cards[idx] = candidate
        } else {
            // курс нужно добавить
            card.count = 1
            basket.cards.push(card)
        }

        store.set('basket', basket)
    }

    static async remove(id){
        const basket = await Basket.fetch()
        const idx = basket.cards.findIndex(c => c.id == id)
        const card = basket.cards[idx]

        if (card.count == 1) {
            //удалить
            basket.cards = basket.cards.filter(c => c.id !== parseInt(id))
        } else {
            //изменить кол-во
            basket.cards[idx].count--
        }
        console.log()
        store.set('basket', basket)
        return store.get('basket')
        
    }

    static async fetch(){
        if (store.get('basket')){
            return store.get('basket')
        } else {
            store.set('basket', {cards: []})
            return store.get('basket')
        }
    }
}

module.exports = Basket