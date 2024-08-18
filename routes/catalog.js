const {Router} = require('express')
const Card = require('../models/card')
const router = Router()

router.get('/', async (req, res) => {
    const cards = await Card.getAll()
    res.render('catalog', {
        title: 'Каталог',
        isCatalog: true,
        cards
    })
})


// Функция админки
// router.post('/createCard', async (req, res) => {
//     const deal = new Card(req.body.title, req.body.price, req.body.stage)

//     await deal.save()

//     res.redirect('/catalog')
// })

module.exports = router