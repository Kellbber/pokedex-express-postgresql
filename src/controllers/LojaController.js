const Items = require("../models/Items")

const getAll = async (req, res) => {
    try{
        const loja = await Items.findAll();
        res.render("index", {loja})
        }catch (err) {
        res.status(500).send({err: err.message})
        }
}
module.exports = {
    getAll,

}