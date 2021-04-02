const {mysql} = require('../qcloud')

module.exports = async(ctx) => {
	const {id} = ctx.request.body
	try{
		const res = await mysql('records').where("id",id).del()

		ctx.state.data = {
			code:0,
			msg:"success",
		}
		console.log("执行成功")
	}
	catch(e){
		console.log("执行失败",e)
		ctx.state = {
			code:-1,
			data:{
				mag:'删除失败'+e.sqlMessage
			}
		}
	}
}