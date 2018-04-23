// 数据库
const StringDecoder = require('string_decoder').StringDecoder;
const userModel = require('../lib/mysql')

module.exports = {
  /**
   * 增加字典列表
   * name：名称
   * sort：排序数字
   * code：字典编码（方便查询）
   */
  addDictionary: async (dictionary) => {
    let data;
    await userModel.dictionarySql.insertDictionary(dictionary)
      .then(() => {
        data = {
          status: true,
          msg: '增加成功'
        }
      }).catch(() => {
        data = {
          status: false,
          msg: '新增失败，请稍后重试'
        }
      })
    return data;
  },
  /**
   * 通过 id删除字典记录
   * id：字典 id
   */
  deleteDictionaryById: async (id) => {
    let data;
    await userModel.dictionarySql.deleteDictionaryById(id)
      .then(() => {
        data = {
          status: true,
          msg: '删除成功'
        }
      }).catch(() => {
        data = {
          status: false,
          msg: '删除失败，请稍后重试'
        }
      })
    return data;
  },
  /**
   * 通过 ids批量删除字典记录
   * ids：批量字典 id
   */
  deleteDictionaryByIds: async (ids) => {
    let data;
    await userModel.dictionarySql.deleteDictionaryByIds(ids)
      .then(() => {
        data = {
          status: true,
          msg: '删除成功'
        }
      }).catch(() => {
        data = {
          status: false,
          msg: '删除失败，请稍后重试'
        }
      })
    return data;
  },
  /**
   * 通过 id 修改对应字典记录
   * name：名称
   * sort：排序数字
   * code：字典编码（方便查询）
   * id：字典 id
   */
  updateDictionaryById: async (dictionary) => {
    let data;
    await userModel.dictionarySql.updateDictionaryById(dictionary)
      .then(() => {
        data = {
          status: true,
          msg: '更新成功'
        }
      }).catch(() => {
        data = {
          status: false,
          msg: '更新失败，请稍后重试'
        }
      })
    return data;
  },
  /**
   * 查询全部字典列表
   */
  findAllParentLists: async () => {
    let data;
    await userModel.dictionarySql.findAllParentLists()
      .then((result) => {
        let res = JSON.parse(JSON.stringify(result))
        data = {
          status: true,
          data: res,
          msg: '全部字典列表'
        }
      }).catch((err) => {
        data = {
          status: false,
          msg: '查询失败，请稍后重试'
        }
      })
    return data
  },
  /** 通过字典编码 查询父字典分类对应的字段列表
   * @param code：字典编码
   */
  findParentDicByCode: async (code) => {
    let data;
    await userModel.dictionarySql.findParentDicByCode(code)
      .then((result) => {
        let res = JSON.parse(JSON.stringify(result))
        data = {
          status: true,
          data: res,
          msg: '字段列表'
        }
      }).catch((err) => {
        data = {
          status: false,
          msg: '查询失败，请稍后重试'
        }
      })
    return data;
  },
  /**
   * 根据字典 id 查询字段列表
   */
  findFieldsById: async (id) => {
    let data;
    await userModel.dictionarySql.findFieldsById(id)
      .then((result) => {
        let res = JSON.parse(JSON.stringify(result))
        data = {
          status: true,
          data: res,
          msg: '字段列表'
        }
      }).catch((error) => {
        data = {
          status: false,
          msg: '查询失败，请稍后重试'
        }
      })
    return data;
  },
  /**
   * 增加字段列表
   * parent_id：对应字典 id
   * name：名称
   * sort：排序数字
   * code：字典编码（对应字典 code）
   */
  addField: async (field) => {
    let data;
    await userModel.dictionarySql.insertField(field)
      .then(() => {
        data = {
          status: true,
          msg: '增加成功'
        }
      }).catch(() => {
        data = {
          status: false,
          msg: '新增失败，请稍后重试'
        }
      })
    return data;
  },
  /**
   * 通过 id 修改对应字段记录
   * name：名称
   * sort：排序数字
   */
  updateFieldById: async (field) => {
    let data;
    await userModel.dictionarySql.updateFieldById(field)
      .then(() => {
        data = {
          status: true,
          msg: '更新成功'
        }
      }).catch(() => {
        data = {
          status: false,
          msg: '更新失败，请稍后重试'
        }
      })
    return data;
  },
  /**
   *  新增客户
   *  code：客户编号
   *  name：客户公司名称
   *  contact：联系人
   *  phone：联系电话/手机
   *  address：地址
   *  sort：排序
   *  remark：备注
   */
  addCustomer: async (customer) => {
    let data;
    await userModel.dictionarySql.insertCustomer(customer)
      .then(() => {
        data = {
          status: true,
          msg: '增加成功'
        }
      }).catch(() => {
        data = {
          status: false,
          msg: '新增失败，请稍后重试'
        }
      })
    return data;
  },
  /**
   * 通过 id删除客户记录
   * id: 客户 id
   */
  deleteCustomerById: async (id) => {
    let data;
    await userModel.dictionarySql.deleteCustomerById(id)
      .then(() => {
        data = {
          status: true,
          msg: '删除成功'
        }
      }).catch(() => {
        data = {
          status: false,
          msg: '删除失败，请稍后重试'
        }
      })
    return data;
  },
  /**
   * 通过 id 修改对应客户记录
   *  code：客户编号
   *  name：客户公司名称
   *  contact：联系人
   *  phone：联系电话/手机
   *  address：地址
   *  sort：排序
   *  remark：备注
   *  id: 客户 id
   */
  updateCustomerById: async (customer) => {
    let data;
    await userModel.dictionarySql.updateCustomerById(customer)
      .then(() => {
        data = {
          status: true,
          msg: '更新成功'
        }
      }).catch(() => {
        data = {
          status: false,
          msg: '更新失败，请稍后重试'
        }
      })
    return data;
  },
  /**
   * 查询全部客户列表
   */
  findAllCustomers: async () => {
    let data;
    await userModel.dictionarySql.findAllCustomers()
      .then((result) => {
        let res = JSON.parse(JSON.stringify(result))
        data = {
          status: true,
          data: res,
          msg: '全部客户列表'
        }
      }).catch((err) => {
        data = {
          status: false,
          msg: '查询失败，请稍后重试'
        }
      })
    return data
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
   */
  addGoods: async (goods) => {
    let data;
    await userModel.dictionarySql.insertGoods(goods)
      .then(() => {
        data = {
          status: true,
          msg: '增加成功'
        }
      }).catch(() => {
        data = {
          status: false,
          msg: '新增失败，请稍后重试'
        }
      })
    return data;
  },
  /**
   * 通过 id删除商品字典记录
   * id：商品字典 id
   */
  deleteGoodsById: async (id) => {
    let data;
    await userModel.dictionarySql.deleteGoodsById(id)
      .then(() => {
        data = {
          status: true,
          msg: '删除成功'
        }
      }).catch(() => {
        data = {
          status: false,
          msg: '删除失败，请稍后重试'
        }
      })
    return data;
  },
  /** 通过 id更新商品字典记录
   *
   */
  updateGoodsById: async (goods) => {
    let data;
    await userModel.dictionarySql.updateGoodsById(goods)
      .then(() => {
        data = {
          status: true,
          msg: '更新成功'
        }
      }).catch(() => {
        data = {
          status: false,
          msg: '更新失败，请稍后重试'
        }
      })
    return data;
  },
  /** 通过id查找对应商品字典记录
   * @param  id:商品id
   */
  findGoodsById: async (id) => {
    let data;
    await userModel.dictionarySql.findGoodsById(id)
      .then((result) => {
        let res = JSON.parse(JSON.stringify(result))
        console.log(res);

        data = {
          status: true,
          data: res[0],
          msg: '商品字典记录'
        }
      }).catch((err) => {
        data = {
          status: false,
          msg: '查询失败，请稍后重试'
        }
      })
    return data;
  },
  /** 查询全部商品字典列表
   * @param goodsName:商品名称
   * @param goodsBrandId:商品品牌Id
   * @param goodsCategoryId:商品分类Id
   * @param goodsUnit:商品单位
   * @param priceSort:价格排序 desc：降序，asc：升序
   */
  findGoodsLists: async (goods) => {
    let data;
    // console.log(goods);
    await userModel.dictionarySql.findGoodsLists(goods)
      .then((result) => {
        let res = JSON.parse(JSON.stringify(result))
        data = {
          status: true,
          data: res,
          msg: '全部商品字典列表'
        }
      }).catch((err) => {
        data = {
          status: false,
          msg: '查询失败，请稍后重试'
        }
      })
    return data;
  },
  /** 查询商品字典的最后一条记录的id
   *
   */
  findLastGoodsId: async () => {
    let data;
    await userModel.dictionarySql.findLastGoodsId()
      .then((result) => {
        let res = JSON.parse(JSON.stringify(result))
        console.log(res);
        if (res.length != 0) {
          data = {
            status: true,
            data: res[0].id,
            msg: '商品字典id'
          }
        } else {
          data = {
            status: true,
            data: 0,
            msg: '商品字典最新记录id'
          }
        }
      }).catch((err) => {
        data = {
          status: false
        }
      })
    return data;
  }

}