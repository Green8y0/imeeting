const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
	const {openid,start_date,start_time,end_date,end_time,note} = ctx.request.body

	try{				
		await mysql('records').insert({
			openid,start_date,start_time,end_date,end_time,note
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