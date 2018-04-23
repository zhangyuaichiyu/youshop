/**
 * 字典管理
 * 分类字典、商品字典、客户列表
 */
const DictionaryService = require('../service/dictionary')

module.exports = {
  // 跳转到分类字典
  category: async (ctx, next) => {
    await ctx.render('dictionary/dictionary_category', {
      session: ctx.session,
      title: "分类字典",
      pagename: 'dictionary-category',
      pageclass: 'dictionary-category'
    })
  },
  // 跳转到商品字典
  goods: async (ctx, next) => {
    await ctx.render('dictionary/dictionary_goods', {
      session: ctx.session,
      title: "商品字典",
      pagename: 'dictionary-goods',
      pageclass: 'dictionary-goods'
    })
  },
  // 跳转到创建商品——基本信息页
  goodsBase: async (ctx, next) => {
    let goodsId = ctx.request.query.goodsId;
    await ctx.render('dictionary/new_goods/goods_base', {
      goodsId: goodsId,
      session: ctx.session,
      title: "商品字典——创建商品",
      pagename: 'dictionary-goods',
      pageclass: 'new-goods'
    })
  },
  // 跳转到创建商品——轮播图
  goodsSlideshow: async (ctx, next) => {
    await ctx.render('dictionary/new_goods/goods_slideshow', {
      session: ctx.session,
      title: "商品字典——创建商品",
      pagename: 'dictionary-goods',
      pageclass: 'new-goods'
    })
  },
  // 跳转到创建商品——图文介绍
  goodsInfo: async (ctx, next) => {
    await ctx.render('dictionary/new_goods/goods_info', {
      session: ctx.session,
      title: "商品字典——创建商品",
      pagename: 'dictionary-goods',
      pageclass: 'new-goods'
    })
  },
  // 跳转到创建商品——规格参数
  goodsSpecification: async (ctx, next) => {
    await ctx.render('dictionary/new_goods/goods_specification', {
      session: ctx.session,
      title: "商品字典——创建商品",
      pagename: 'dictionary-goods',
      pageclass: 'new-goods'
    })
  },
  // 跳转到客户列表
  customer: async (ctx, next) => {
    await ctx.render('dictionary/dictionary_customer', {
      session: ctx.session,
      title: "客户列表",
      pagename: 'dictionary-customer',
      pageclass: 'dictionary-customer'
    })
  },
  /**  增加字典列表
   * @param name：名称
   * @param sort：排序数字
   * @param code：字典编码（方便查询）
   */
  addDictionary: async (ctx, next) => {
    let params = ctx.request.body;
    let dictionary = [
      params.name,
      params.sort,
      params.code
    ]

    let result = await DictionaryService.addDictionary(dictionary)
    ctx.body = result
  },
  /**  通过 id删除字典记录
   * @param id：字典 id
   */
  deleteDictionaryById: async (ctx, next) => {
    let params = ctx.request.body;
    let id = params.id;
    let result = await DictionaryService.deleteDictionaryById(id)
    ctx.body = result
  },
  /**  通过 ids 批量删除字典记录
   * @param ids：批量字典 id
   */
  deleteDictionaryByIds: async (ctx, next) => {
    let params = ctx.request.body;
    let ids = params.ids;
    let result = await DictionaryService.deleteDictionaryByIds(ids)
    ctx.body = result
  },
  /**  通过 id 修改对应字典记录
   * @param name：名称
   * @param sort：排序数字
   * @param code：字典编码（方便查询）
   * @param id：字典 id
   */
  updateDictionaryById: async (ctx, next) => {
    let params = ctx.request.body;
    let dictionary = [
      params.name,
      params.sort,
      params.code,
      params.id
    ]
    let result = await DictionaryService.updateDictionaryById(dictionary)
    ctx.body = result
  },
  /**  查询全部字典列表
   */
  findAllParentLists: async (ctx, next) => {
    let result = await DictionaryService.findAllParentLists()
    ctx.body = result
  },
  /** 通过字典编码 查询父字典分类对应的字段列表
   * @param code：字典编码
   */
  findParentDicByCode: async (ctx, next) => {
    let code = ctx.request.query.code;
    let result = await DictionaryService.findParentDicByCode(code)
    ctx.body = result
  },

  /**  根据字典 id 查询字段列表
   */
  findFieldsById: async (ctx, next) => {
    let params = ctx.request.body;
    let id = params.id;
    let result = await DictionaryService.findFieldsById(id)
    ctx.body = result
  },
  /**  增加字段列表
   * @param name：名称
   * @param sort：排序数字
   * @param code：字典编码（方便查询）
   */
  addField: async (ctx, next) => {
    let params = ctx.request.body;
    let dictionary = [
      params.parent_id,
      params.name,
      params.sort,
      params.code
    ]

    let result = await DictionaryService.addField(dictionary)
    ctx.body = result
  },
  /** 通过 id 修改对应字段记录
   * @param name：名称
   * @param sort：排序数字
   * @param code：字典编码（方便查询）
   * @param id：字典 id
   */
  updateFieldById: async (ctx, next) => {
    let params = ctx.request.body;
    let field = [
      params.name,
      params.sort,
      params.id
    ]
    let result = await DictionaryService.updateFieldById(field)
    ctx.body = result
  },
  /**   新增客户
   * @param  code：客户编号
   * @param  name：客户公司名称
   * @param  contact：联系人
   * @param  phone：联系电话/手机
   * @param  address：地址
   * @param  sort：排序
   * @param  remark：备注
   */
  addCustomer: async (ctx, next) => {
    let params = ctx.request.body;
    let customer = [
      params.code,
      params.name,
      params.contact,
      params.phone,
      params.address,
      params.sort,
      params.remark
    ]
    let result = await DictionaryService.addCustomer(customer)
    ctx.body = result
  },
  /**  通过 id删除客户记录
   * @param id: 客户 id
   */
  deleteCustomerById: async (ctx, next) => {
    let params = ctx.request.body;
    let id = params.id;
    let result = await DictionaryService.deleteCustomerById(id)
    ctx.body = result
  },
  /**  通过 id 修改对应客户记录
   * @param  code：客户编号
   * @param  name：客户公司名称
   * @param  contact：联系人
   * @param  phone：联系电话/手机
   * @param  address：地址
   * @param  sort：排序
   * @param  remark：备注
   * @param  id: 客户 id
   */
  updateCustomerById: async (ctx, next) => {
    let params = ctx.request.body;
    let customer = [
      params.code,
      params.name,
      params.contact,
      params.phone,
      params.address,
      params.sort,
      params.remark,
      params.id
    ]
    let result = await DictionaryService.updateCustomerById(customer)
    ctx.body = result
  },
  /**  查询全部客户列表
   */
  findAllCustomers: async (ctx, next) => {
    let result = await DictionaryService.findAllCustomers()
    ctx.body = result
  },
  /**   新增商品字典记录
   *  code: 商品编号
   *  title: 商品名称
   *  abbr: 商品简称
   *  brand_id: 品牌id
   *  brand_name: 品牌名称
   *  category_id: 分类id
   *  category_name: 分类名称
   *  unit_id: 计量单位id
   *  unit_name: 计量单位名
   *  sale_price:  销售单价
   *  sort: 排序
   *  goods_desc: 图文详情
   */
  addGoods: async (ctx, next) => {
    let params = ctx.request.body;
    let goods = [
      params.code,
      params.title,
      params.abbr,
      params.brand_id,
      params.brand_name,
      params.category_id,
      params.category_name,
      params.unit_id,
      params.unit_name,
      params.sale_price,
      params.sort,
      params.goods_desc
    ]
    let result = await DictionaryService.addGoods(goods)
    ctx.body = result
  },
  /**  通过 id删除商品字典记录
   * @param id: 商品字典 id
   */
  deleteGoodsById: async (ctx, next) => {
    let params = ctx.request.body;
    let id = params.id;
    let result = await DictionaryService.deleteGoodsById(id)
    ctx.body = result
  },
  updateGoodsById: async (ctx, next) => {
    let params = ctx.request.body;
    let goods = [
      params.code,
      params.title,
      params.abbr,
      params.brand_id,
      params.brand_name,
      params.category_id,
      params.category_name,
      params.unit_id,
      params.unit_name,
      params.sale_price,
      params.sort,
      params.goods_desc,
      params.goods_id
    ]
    let result = await DictionaryService.updateGoodsById(goods)
    ctx.body = result
  },
  /** 查询全部商品字典列表
   * @param goodsName:商品名称
   * @param goodsBrandId:商品品牌Id
   * @param goodsCategoryId:商品分类Id
   * @param goodsUnit:商品单位
   * @param priceSort:价格排序 desc：降序，asc：升序
   */
  findGoodsLists: async (ctx, next) => {
    let params = ctx.request.body;
    let goods = [
      params.goodsName,
      params.goodsBrandId,
      params.goodsCategoryId,
      params.goodsUnit,
      params.priceSort
    ]
    // console.log(goods);
    let result = await DictionaryService.findGoodsLists(goods)
    ctx.body = result
  },
  /** 通过id查找对应商品字典记录
   * @param  id:商品id
   */
  findGoodsById: async (ctx, next) => {
    let id = ctx.request.query.id;
    let result = await DictionaryService.findGoodsById(id)
    ctx.body = result
  },
  /** 查询商品字典的最后一条记录的id
   *
   */
  findLastGoodsId: async (ctx, next) => {
    let result = await DictionaryService.findLastGoodsId()
    ctx.body = result
  }
}