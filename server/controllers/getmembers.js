//knex操作数据库
const {mysql} = require('../qcloud')

module.exports = async(ctx) => {
	const {group_id} = ctx.request.query
	try{
		const records = await mysql("groups")
							.where('group_id',group_id)
							.select('openid', 'leader')
		console.log('records=', records)
		// if (!res) {
		// 	var groupid = res.groupid
		// }else {
		// 	var groupid = 0
		// }					
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