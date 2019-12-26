import fetch from '@/config/fetch'

/* ============= /customer ============= */
/**
 * 获取邮件验证码
 */
export const getCode = data => fetch('/customer/check-code', data)

/**
 * 注册
 */
export const register = data => fetch('/customer/register', data, 'POST')

/**
 * 登录
 */

export const login = data => fetch('/customer/login', data, 'POST')

/**
 * 保存用户信息
 */
export const saveUserInfo = data =>
  fetch('/customer/save-user-info', data, 'POST')

/**
 * 修改密码
 */
export const changePassword = data =>
  fetch('/customer/change-password', data, 'POST')

/* ============= /stadium ============= */

/**
 * 获取场馆个数
 */
export const getStadiumCount = data => fetch('/stadium/get-stadium-count', data)

/**
 * 为管理员获取场馆列表
 */
export const getStadiumListForAdmin = data =>
  fetch('/stadium/items-for-admin', data)

/**
 * 删除指定ID的场馆
 */
export const deleteStadium = data => fetch('/stadium/delete', data, 'POST')

/**
 * 新增场馆
 */
export const postStadium = data => fetch('/stadium/post', data, 'POST')

/**
 * 更新场馆
 */
export const updateStadium = data => fetch('/stadium/update', data, 'POST')

/**
 * 获取所有场馆信息列表
 */
export const getStadiumList = data => fetch('/stadium/items', data)

/**
 * 获取场馆的类型（名字与 type(int)）
 */
export const getStadiumTypes = data => fetch('/stadium/types', data)

/**
 * 使用id获取场馆信息
 */

export const getStadiumById = data => fetch('/stadium/message', data)

/**
 * 使用场馆id获取对应场馆的评论
 */
export const getCommentsByStadiumId = data =>
  fetch('/comment/get-by-user', data)

/**
 * 删除该场馆下该评论
 */
export const deleteComment = data =>
  fetch('/comment/delete-by-user', data, 'POST')

/**
 * 评论当前场馆
 */
export const postComment = data => fetch('/comment/add', data, 'POST')

/* ============= /admin ============= */

/**
 * 管理员登录
 */

export const adminLogin = data => fetch('/admin/login', data, 'POST')

/**
 * 获取注册的用户个数
 */
export const getUserCount = data => fetch('/admin/get-user-count', data)

/**
 * 获取用户列表
 */
export const getUserList = data => fetch('/admin/get-user-list', data)

/**
 * 删除指定 customerId 的用户
 */
export const deleteUser = data => fetch('/admin/delete-user', data, 'POST')

/* ============= /booking ============= */

/**
 * 得到选定日期，选定场馆的空闲时间情况
 */
export const getEmptyTimesByStadiumIdAndDate = data =>
  fetch('/booking/get-empty-time', data)

/**
 * 新建订单
 */
export const addNewBooking = data =>
  fetch('/booking/add-new-booking', data, 'POST')

/**
 * 获取订单总数
 */
export const getBookingCount = data => fetch('/admin/get-booking-count', data)

/**
 * 获取订单列表
 */
export const getBookingList = data => fetch('/admin/get-booking-list', data)

/*
 * 删除指定 bookingId 的订单
 */
export const deleteBooking = data =>
  fetch('/admin/delete-booking', data, 'POST')

export const getTotalBookingCountForDay = data =>
  fetch('/admin/booking-count-by-date', data)

export const getToalBookingCountForStadiums = data =>
  fetch('/admin/booking-count-by-stadium', data)

/* ============= /comment ============= */

/**
 * 获取评论个数
 */
export const getCommentCount = data => fetch('/comment/get-comment-count', data)

/**
 * 获取评论列表
 */
export const getCommentList = data => fetch('/comment/get-comment-list', data)

/**
 * 删除评论
 */
export const deleteCommentByAdmin = data =>
  fetch('/comment/delete-by-admin', data, 'POST')

/**
 * 添加点赞
 */
export const updateLikes = data => fetch('/comment/update-likes', data, 'POST')

/* ============= /news ============= */

/**
 * 获取新闻个数
 */
export const getNewsCount = data => fetch('/news/get-news-count', data)

/**
 * 获取新闻列表
 */
export const getNewsList = data => fetch('/news/get-news-list', data)

/**
 * 删除指定 newsId 的新闻
 */
export const deleteNews = data => fetch('/news/delete', data, 'POST')

/**
 * 修改指定 newsId 的新闻
 */
export const updateNews = data => fetch('/news/update', data, 'POST')

/**
 * 发布新闻
 */
export const postNews = data => fetch('/news/post', data, 'POST')

/* ============= OLD API ============= */
/**
 * 退出
 */

export const signout = () => fetch('/admin/signout')

/**
 * 获取用户信息
 */

export const getAdminInfo = () => fetch('/admin/info')

/**
 * api请求量
 */

export const apiCount = date => fetch('/statis/api/' + date + '/count')

/**
 * 所有api请求量
 */

export const apiAllCount = () => fetch('/statis/api/count')

/**
 * 所有api请求信息
 */

export const apiAllRecord = () => fetch('/statis/api/all')

/**
 * 用户注册量
 */

export const userCount = date => fetch('/statis/user/' + date + '/count')

/**
 * 某一天订单数量
 */

export const orderCount = date => fetch('/statis/order/' + date + '/count')

/**
 * 某一天管理员注册量
 */

export const adminDayCount = date => fetch('/statis/admin/' + date + '/count')

/**
 * 管理员数量
 */

export const adminCount = () => fetch('/admin/count')

/**
 * 获取定位城市
 */

export const cityGuess = () =>
  fetch('/v1/cities', {
    type: 'guess'
  })

/**
 * 添加商铺
 */

export const addShop = data => fetch('/shopping/addShop', data, 'POST')

/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) =>
  fetch('/v1/pois', {
    type: 'search',
    city_id: cityid,
    keyword: value
  })

/**
 * 获取当前店铺食品种类
 */

export const getCategory = restaurant_id =>
  fetch('/shopping/getcategory/' + restaurant_id)

/**
 * 添加食品种类
 */

export const addCategory = data => fetch('/shopping/addcategory', data, 'POST')

/**
 * 添加食品
 */

export const addFood = data => fetch('/shopping/addfood', data, 'POST')

/**
 * category 种类列表
 */

export const foodCategory = (latitude, longitude) =>
  fetch('/shopping/v2/restaurant/category')

/**
 * 获取餐馆列表
 */

export const getResturants = data => fetch('/shopping/restaurants', data)

/**
 * 获取餐馆详细信息
 */

export const getResturantDetail = restaurant_id =>
  fetch('/shopping/restaurant/' + restaurant_id)

/**
 * 获取餐馆数量
 */

export const getResturantsCount = () => fetch('/shopping/restaurants/count')

/**
 * 更新餐馆信息
 */

export const updateResturant = data =>
  fetch('/shopping/updateshop', data, 'POST')

/**
 * 删除餐馆
 */

export const deleteResturant = restaurant_id =>
  fetch('/shopping/restaurant/' + restaurant_id, {}, 'DELETE')

/**
 * 获取食品列表
 */

export const getFoods = data => fetch('/shopping/v2/foods', data)

/**
 * 获取食品数量
 */

export const getFoodsCount = data => fetch('/shopping/v2/foods/count', data)

/**
 * 获取menu列表
 */

export const getMenu = data => fetch('/shopping/v2/menu', data)

/**
 * 获取menu详情
 */

export const getMenuById = category_id =>
  fetch('/shopping/v2/menu/' + category_id)

/**
 * 更新食品信息
 */

export const updateFood = data => fetch('/shopping/v2/updatefood', data, 'POST')

/**
 * 删除食品
 */

export const deleteFood = food_id =>
  fetch('/shopping/v2/food/' + food_id, {}, 'DELETE')

/**
 * 获取订单列表
 */

export const getOrderList = data => fetch('/bos/orders', data)

/**
 * 获取订单数量
 */

export const getOrderCount = data => fetch('/bos/orders/count', data)

/**
 * 获取用户信息
 */

export const getUserInfo = user_id => fetch('/v1/user/' + user_id)

/**
 * 获取地址信息
 */

export const getAddressById = address_id => fetch('/v1/addresse/' + address_id)

/**
 * 获取用户分布信息
 */

export const getUserCity = () => fetch('/v1/user/city/count')
