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
