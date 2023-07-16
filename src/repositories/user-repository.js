const CrudRepository = require('./crud-repository');
const { api } = require('../models');


class UserRepository extends CrudRepository {
    constructor() {
        super(api);
    }

    async getUserByEmail(email){
        const res= await api.findOne({where:{email:email}})
        return res
       }
}



    module.exports = UserRepository;