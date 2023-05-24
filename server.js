const express = require('express')
const app = express()
const ejs = require('ejs')
const conn =require('./database')
const path = require('path')
const bodyParser= require('body-parser')
const session = require('express-session')
const PORT = process.env.PORT || 3000

function isProductInCart(cart, id){
    for(let i= 0; i < cart.length; i++){
        if(cart[i].ids == ids){
            return true;

        }
        return false

    }

}

function calculateTotal(cart, req){
    total =0
    for(let i =0; i<cart.length; i++){
        if(cart[i].prices){
            total = total + cart[i].prices * cart[i].quantities
        }else{
            total = total + cart[i].prices * cart[i].quantities
        }
    }
    req.session.total = total
    return total
}

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    secret:"secret",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
    resave: false
}))
app.set('view engine', 'ejs')



app.get('^/$|/index', (req, res)=>{
    conn.query(`SELECT * FROM items`, (err, result)=>{
        res.render('index',{results:result})
    })
    

})

app.get('^/$|/contact', (req, res)=>{
    res.render('contact')    
})

app.get('^/$|/about', (req, res)=>{
    res.render('about')    
})

app.get('^/$|/service', (req, res)=>{
    res.render('service')    
})



app.post('/add_to_cart', (req, res)=>{
    var id = req.body.id
    var name = req.body.name
    var price = req.body.price
    var quantity = req.body.quantity
    var image = req.body.image
    var product = {
        ids: id,
        names: name,
        prices: price,
        quantities: quantity,
        images: image
    }

    if(req.session.cart){
        var cart = req.session.cart
        if(!isProductInCart()){
            cart.push(product)

        }
    }else{
        req.session.cart = [product]
        var cart = req.session.cart
    }

    
//calculate total

calculateTotal(cart, req)

//redirect to cart
res.redirect('/cart')


})


app.get('/cart', (req, res)=>{
    var cart = req.session.cart
    var total = req.session.total

    res.render('cart', {carts:cart, totals: total})


})

app.get('/*', (req, res)=>{
    res.status(404).render('404')    
})

app.listen(PORT, ()=>{console.log(`server running at port: ${PORT}`)})