const routes = (app) => {
    app.use('/user', (req,res) => {
        res.send('User page')
    })
}

module.exports = routes