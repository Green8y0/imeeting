//knex操作数据库
const {mysql} = require('../qcloud')

module.exports = async(ctx) => {
	const {open_id} = ctx.request.query
	try{
		console.log('open_id=',open_id)
		const records = await mysql("cSessioninfo")
							.where('open_id',open_id)
							.select('user_info')
		console.log('records=', records)

		ctx.state.data = {
			records
		}
	}
	catch(e){
		ctx.state = {
			code:-1,
			data:{
				msg:"获取失败"+e.sqlMessage
			}
		}
	}
}