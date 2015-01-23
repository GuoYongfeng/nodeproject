var mongoose = require('mongoose');

//模式
var MovieSchema = new mongoose.Schema({
	doctor: String,
	title: String,
	language: String,
	country: String,
	summary: String,
	flash: String,
	poster: String,
	year: Number,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});

//添加方法 每次存储数据的时候 都会来调用该方法
MovieSchema.pre('save', function(next){
	if(this.isNew){
		//新增和更新数据的时间 都设置为当前时间
		this.meta.createAt = this.meta.updateAt = Date.now;
	} else {
		this.meta.updateAt = Date.now();
	}

	next();
});

//模式编译 实例化时候才有该方法
MovieSchema.statics = {
	//取出数据库中的所有时间
	fetch: function(cb){
		return this
			.find({})
			.sort('meta.updateAt') //按更新时间排序
			exec(cb) //执行该回调函数
	},
	//查询单条数据
	findById: function(id, cb){
		return this
			.findOne({_id: id})
			exec(cb)
	}
}

module.exports = MovieSchema;
