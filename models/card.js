const {v4:uuid} = require('uuid')
const fs = require('fs')
const path = require('path')
const { resolve } = require('path')

class Card{
    constructor(title, description1, description2, description3) {
        this.id = uuid(),
        this.title = title,
        this.description1 = description1,
        this.description2 = description2,
        this.description3 = description3
    }

    toJSON(){
        return {
            id: this.id,
            title: this.title,
            description1: this.description1,
            description2: this.description2,
            description3: this.description3
        }
    }

    async save(){
        const deals = await Deal.getAll()
        const dealId = deals.find(d => d.title == this.stage)
        dealId.deals.push(this.toJSON())

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'cards.json'),
                JSON.stringify(deals),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    static getAll(){
        return new Promise((resolve, reject)=> {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'cards.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(content))
                    }
    
                }
            )
        })
    }

    static async getById(id){
       const cards = await Card.getAll()
       let result;
       cards.forEach(el => {
        if(el.descriptions.find(c => c.id == id)){
            result = el.descriptions.find(c => c.id == id)
            result.cardTitle = el.title
        }
       })
       return result
    }
}

module.exports = Card