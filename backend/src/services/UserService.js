const createUser = () => {
    return new Promise((resole, reject) => {
        try {
            resole({})
        } catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser
}