const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const catalogRoutes = require('./routes/catalog')
const contactsRoutes = require('./routes/contacts')
const aboutUsRoutes = require('./routes/aboutus')
const conditionsRoutes = require('./routes/conditions')
const basketRoutes = require('./routes/basket')
const Handlebars = require('handlebars');

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
        // Function to do basic mathematical operation in handlebar
        math: function (lvalue, operator, rvalue) {
            lvalue = parseFloat(lvalue);
            rvalue = parseFloat(rvalue);
            return {
                "+": lvalue + rvalue,
                "-": lvalue - rvalue,
                "*": lvalue * rvalue,
                "/": lvalue / rvalue,
                "%": lvalue % rvalue
            }[operator];
        }
    }
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/catalog',catalogRoutes)
app.use('/contacts', contactsRoutes)
app.use('/aboutus', aboutUsRoutes)
app.use('/conditions', conditionsRoutes)
app.use('/basket', basketRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})