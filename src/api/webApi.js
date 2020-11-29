import request from '../utils/request'

// eslint-disable-next-line no-unused-vars
const POST = 'POST'

const GET = 'GET'

// eslint-disable-next-line no-unused-vars
const DELETE = 'DELETE'

/**
   *
  *@author ch_pxg
 * @description 获取matchFactorList
 */
export const getMatchFactorList = () => {
  return request({
    url: '/empi/config/factor/all',
    method: GET
  })
}

export  const  getPrimaryKeyList=()=>{
  return request({
    url:"/empi/config/system/info",
    method:GET,
    params:{code:"EMPI_PRIMARY_KEY"}
  })
}
/**
 * 获取所有纳排属性
 * @returns {AxiosPromise}
 */
export  const getAllSelectionProperty=()=>{
  return request({
    url:"/empi/config/match/select/all",
    method:GET
  })
}
export  const  getAllMatchPropertys=()=>{
  return request({
    url:"/empi/config/property/all",
    method:GET
  })
}
