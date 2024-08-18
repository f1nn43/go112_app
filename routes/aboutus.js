const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('aboutus', {
        title: 'Про нас',
        isAboutUs: true
    })
})

module.exports = router