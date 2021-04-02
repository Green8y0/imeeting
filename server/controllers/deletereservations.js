const {mysql} = require('../qcloud')

module.exports = async(ctx) => {
	const ids = ctx.request.body
	try{
		console.log('deletereservations中ids=', ids)
    for (const id of ids) {
      const res = await mysql('reservations').where("id",id).del()
    }
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
