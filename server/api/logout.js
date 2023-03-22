const router = require('express').Router()

router.post('/', (req, res)=>{
    res.cookie('token', '').json("Looged Out")
})

module.exports = router