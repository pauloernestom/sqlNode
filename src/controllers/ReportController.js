const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
    async show(req,res) {
        // Encontrar usuarios que tem email que termina com email.com
        //Desses usuários eu quero todos que moram em rua Pe José carlos Beldermann
        // DEsses usuários quero buscar as tec n ologias que começam com React

        const users = await User.findAll({
            attributes: ['name', 'email'],
            where:{
                email: {
                    [Op.iLike]: '%@email.com%'
                }
            },
            include: [
                {
                    association: 'addresses', 
                    where: {
                        street: 'Pe José carlos Beldermann'
                    }
                },
                {
                    association: 'techs', 
                    required:false,
                    where: {
                        name:{
                            [Op.iLike]: 'React%'
                        }
                    }
                }
            ]

        })

        res.json(users)
    }
}