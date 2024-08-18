const {Router, text} = require('express')
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const store = require('store')

const router = Router()
const Basket = require('../models/basket')
const Card = require('../models/card')

router.post('/add', async (req, res) => {
    const card = await Card.getById(req.body.id)
    await Basket.add(card)

    res.redirect('/basket')
})

router.delete('/remove/:id', async (req, res) => {
    const basket = await Basket.remove(req.params.id)
    res.status(200).json(basket)
})

router.get('/', async(req,res) => {
    const basket = await Basket.fetch()
    console.log(basket)
    res.render('basket', {
        title: 'Корзина',
        isBasket: true,
        cards: basket.cards
    })
})

router.post('/send', async (req, res) => {
    const basket = await Basket.fetch()
    let textHtml = `<h1>Контактные данные:</h1>
                    <h1>Имя: ${req.body.name}</h1>
                    <h1>Email: ${req.body.email}</h1>
                    <h1>Товары:</h1>`;
    basket.cards.forEach(el => {
        textHtml = textHtml + `
            <h2>Название предмета: ${el.cardTitle}</h2>
            <h2>Кол-во ярусов: ${el.tierNumber}</h2>
            <h2>Количество: ${el.count}</h2>
            <br>`
    });

    const transporter = nodemailer.createTransport({
        host: "smtp.mail.ru",
        auth: {
          user: 'finnhorizzonte@mail.ru',
          pass: 'D3EAmA5Uffz7h4Cqcfhg',
        }
    })
    await transporter.sendMail({
        from: 'finnhorizzonte@mail.ru',
        to: 'finnhorizzonte@mail.ru',
        subject: 'Новая заявка с сайта',
        text: 'This message was sent from Node js server.',
        html: textHtml
    })
    await store.set('basket', {cards: []})
    res.redirect('/')
})

module.exports = router