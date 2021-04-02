const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
	const location = ctx.request.body

	try{
		const records = await mysql('reservations')
							.where("location","9-506")
							.orderBy('id','desc')
							.limit(20)
		console.log('records=', records)

		ctx.state.data = {
			records
		}
		console.log("执行成功")
	}
	catch(e){
		ctx.state = {
			code:-1,
			data:{
				msg:"查询失败" + e.sqlMessage
			}
		}
		console.log("执行错误",e)
	}
	
}