const TestModel = require('../mongo/mongo')

module.exports = {
    list: async (ctx, next) => {
        await TestModel.find({}, function (error, docs) {
            if(error){
                console.log("error :" + error);
            }else{
                ctx.response.body = docs
            }
        });
    },
    search: async (ctx, next) => {
        name = ctx.query.name || '';
        // let { name = '1111'} = ctx.request.query;
        await TestModel.find({"name": name}, function (error, data) {
            if(error) {
                console.log(error);
            } else {
                ctx.response.body = data;
            }
        })
    },
    add: async (ctx, next) => {
        let name = ctx.request.body.name || ''
        let age = ctx.request.body.age || ''
        await TestModel.create({ "name": name, 'age':age}, function(error,doc){
            if(error) {
                console.log(error);
            } else {
                ctx.response.body = 'success';
            }
        });
    },
    update: async (ctx, next) => {
        let _id = ctx.request.body._id || ''
        let name = ctx.request.body.name || ''
        let age = ctx.request.body.age || ''
        var conditions = {'_id' : _id};
    
        var update = {$set : { 'name' : name, 'age': age }};
        
        await TestModel.update(conditions, update, function(error){
            if(error) {
                console.log(error);
            } else {
                ctx.response.body = '编辑成功'
            }
        });
    },
    delete: async (ctx, next) => {
        let _id = ctx.request.body._id
        let conditions = { '_id': _id };
    
        await TestModel.remove(conditions, function(error){
            if(error) {
                console.log(error);
            } else {
                ctx.response.body = 'Delete success!';
            }
        });
    }
}