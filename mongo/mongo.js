const mongoose = require("mongoose");

var TestSchema = new mongoose.Schema({
    name : { type:String },//属性name,类型为String
    age  : { type:Number, default:0 },//属性age,类型为Number,默认为0
    time : { type:Date, default:Date.now },
    gender: { type: Boolean, default: true }
});

// 创建Model
var TestModel = mongoose.model("sing", TestSchema);

var TestEntity = new TestModel({
    name : "Lenka",
    age  : 36,
    email: "lenka@qq.com"
});

// 将movie模型[构造函数]导出
module.exports = TestModel;


// TestEntity.save(function(error,doc){
//     if(error){
//         console.log("error :" + error);
//     }else{
//         console.log(doc);
//     }
// });

// TestModel.find({},function(error,docs){
//     //若没有向find传递参数，默认的是显示所有文档
// });
// TestModel.find({ "age": 36 }, function (error, docs) {
//     if(error){
//         console.log("error :" + error);
//     }else{
//         console.log(docs); //docs: age为28的所有文档
//     }
// }); 