const {mysql} = require('../qcloud')

module.exports = async(ctx) => {
	const {openid} = ctx.request.body
	try{
		console.log('clearrecords中openid=', openid)
		const res = await mysql('records').where("openid",openid).del()
		ctx.state.data = {
			code:0,
			msg:"success"
		}
		console.log("执行成功")
	}
	catch(e){
		console.log("执行失败",e)
		ctx.state = {
			code:-1,
			data:{
				mag:'清除记录失败'+e.sqlMessage
			}
		}
	}
}