const CrudRepository = require('./crud-repository');
const { Role } = require('../models');


class RoleRepository extends CrudRepository {
    constructor() {
        super(Role);
    }

    async getRoleByName(name){
        const res= await Role.findOne({where:{name:name}})
        return res
       }
}



    module.exports = RoleRepository;