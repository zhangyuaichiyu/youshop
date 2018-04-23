/**
 * 账户设置
 * 修改密码、修改个人资料
 */

const AccountService = require('../service/account')
const SettingService = require('../service/setting')

module.exports = {
  // 跳转到修改密码
  changepwd: async (ctx, next) => {
    await ctx.render('setting/change_pwd', {
      session: ctx.session,
      title: "修改密码",
      pagename: 'change-pwd',
      pageclass: 'change-pwd'
    })
  },
  // 跳转到修改个人资料页
  changeinfo: async (ctx, next) => {
    await ctx.render('setting/change_info', {
      session: ctx.session,
      title: "个人资料",
      pagename: 'change-info',
      pageclass: 'change-info'
    })
  },
  // 跳转到切换账号页
  changeaccount: async (ctx, next) => {
    await ctx.render('setting/change_account', {
      session: ctx.session,
      title: "切换账号",
      pagename: 'change-account',
      pageclass: 'change-account'
    })
  },
  /**
   * 修改密码接口
   * uid：用户 id
   * oldpwd：原密码
   * newpwd：新密码
   * confirmpwd：确认密码
   */
  updatePwd: async (ctx, next) => {
    let params = ctx.request.body;
    let user = {
      uid: params.uid,
      oldpwd: params.oldpwd,
      newpwd: params.newpwd,
      confirmpwd: params.confirmpwd
    }
    let result = await SettingService.updatePwd(user)
    // 密码修改成功，清除登录 session
    if (result.status) {
      ctx.session = null;
    }
    ctx.body = result;
  },
  /**
   * 更新注册用户个人资料
   *  username：用户名
   *  sex：性别
   *  phone：手机号
   *  email：邮箱
   *  uid：用户 id
   */
  updateUserInfo: async (ctx, next) => {
    let params = ctx.request.body;
    let user = {
      username: params.username,
      sex: params.sex,
      phone: params.phone,
      email: params.email,
      uid: params.uid
    }
    let res = await SettingService.updateUserInfo(user)
    // console.log(res)
    // 更新个人资料成功，同时更新 session 的名称
    if (res.status) {
      ctx.session.username = user.username
    }
    ctx.body = res
  },
  /**
   * 增加关联账号记录
   * main_account_id：主账号id 第一次登入的账号
   * link_account_id:关联账号id  关联的账号
   */
  addLinkAccount: async (ctx, next) => {
    let params = ctx.request.query;
    let linkData = [
      params.mainId,
      params.linkId
    ]
    let res = await AccountService.addLinkAccount(linkData)
    // console.log(res)
    ctx.body = res
  },
  /**
   * 根据主账号查询关联账号
   * mainId：主账号id
   */
  findLinkAccountByMainId: async (ctx, next) => {
    let currId = ctx.request.body.currId;
    let mainId = ctx.request.body.mainId;
    let res = await SettingService.findLinkAccountByMainId(mainId)

    // 返回关联账户列表
    let list = {
      status: true,
      data: [],
      msg: '关联账户列表'
    }
    if (res.status) {
      // 有关联记录
      let info = res.data;

      for (let i = 0; i < info.length; i++) {
        let linkId = info[i].link_account_id;
        // 通过 uid 查询个人资料
        let userInfo = await AccountService.findUserInfoByUID(linkId)
        // 获取账户的 username、avator
        let currInfo = {
          id: linkId,
          username: userInfo.data.username,
          avator: userInfo.data.avator,
          type: 'link'
        }
        list.data[i] = currInfo

      }
      // 添加主账号信息记录
      let mainUser = await AccountService.findUserInfoByUID(mainId)
      let mainInfo = {
        id: mainId,
        username: mainUser.data.username,
        avator: mainUser.data.avator,
        type: 'main'
      }
      list.data.unshift(mainInfo)
    }
    ctx.body = list
  },
  /**
   * 关联账号免密登录
   * linkId：关联账号 id
   */
  linkAccountLogin: async (ctx, next) => {
    let linkId = ctx.request.body.linkId;
    let res = await AccountService.linkAccountLogin(linkId)
    // 切换 session
    ctx.session = {
      id: res.data.id,
      mainId: res.data.mainId,
      username: res.data.username,
      avator: res.data.avator
    }
    ctx.body = res
  },
  /**
   * 删除关联账号
   * main_account_id：主账号id 第一次登入的账号
   * link_account_id:关联账号id  关联的账号
   */
  deleteLinkAccount: async (ctx, next) => {
    let params = ctx.request.body;
    let linkAccount = [
      params.mainId,
      params.linkId
    ]
    let res = await SettingService.deleteLinkAccount(linkAccount)
    // Step2 更新当前账号  main_id为空
    let linkData = [null, params.linkId]
    let updateAccount = await AccountService.updateAccountMainId(linkData)
    if (res.status && updateAccount.status) {
      ctx.body = res
    } else {
      ctx.body = {
        status: false,
        msg: "删除失败请稍后重试"
      }
    }
  }

}