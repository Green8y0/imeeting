const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
	const {location,topic,content,start_date,start_time,end_time,participant} = ctx.request.body

	try{				
		await mysql('reservations').insert({
			location,topic,content,start_date,start_time,end_time,participant
		})

		ctx.state.data = {
			code:0,
			msg:'success'
		}
		console.log("执行成功")
	}
	catch(e){
		ctx.state = {
			code:-1,
			data:{
				msg:"添加失败" + e.sqlMessage
			}
		}
		console.log("执行错误",e)
	}
	
}