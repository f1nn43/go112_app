const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('conditions', {
        title: 'Условия',
        isConditions: true
    })
})

module.exports = router