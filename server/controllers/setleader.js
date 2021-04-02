//knex操作数据库
const {mysql} = require('../qcloud')

module.exports = async(ctx) => {
	const {openid} = ctx.request.body
	
	try{
		await mysql("groups").where("openid",openid).update('leader',1)

		ctx.state.data = {
			code:0,
			msg:"success"
		}
		console.log("执行成功")
	}catch(e){
		ctx.state = {
			code:-1,
			data:{
				msg:"修改失败" + e.sqlMessage
			}
		}
		console.log("执行错误")
	}
}