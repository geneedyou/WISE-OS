const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 触底
    onReachBottomLoading: false,
    // 数据
    userSysMessageList: [],
    pageNo: 1,
    total: -1,
    UPLOAD_IMAGE: app.globalData.UPLOAD_IMAGE,
    ARTWORKNOWATER: app.globalData.ARTWORKNOWATER,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMainData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 每次刷新pageNo重置为1
    this.data.userSysMessageList = []
    this.setData({
      onReachBottomLoading: false,
      pageNo: 1
    })
    this.getMainData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(this.data.total, this.data.userSysMessageList.length)
    if (this.data.total != this.data.userSysMessageList.length) {
      this.setData({
        pageNo: this.data.pageNo + 1,
        onReachBottomLoading: false
      })
      this.getMainData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 加载系统消息
  getMainData() {
    var that = this
    let url = app.globalData.HOSTURL + '/bbs/bbsSysMessage/wise/mini/queryUserMessageList?pageNo=' + this.data.pageNo
    app.wxRequest('get', url, '').then(res => {
      console.log(res)
      if (res.data.code == 200) {
        if (res.data.result.records.length > 0) {
          that.setData({
            pageNo: that.data.pageNo + 1,
            userSysMessageList: res.data.result.records,
            total: res.data.result.total,
            onReachBottomLoading: true
          })
        } else {
          that.setData({
            getTopicFlag: true,
            onReachBottomLoading: true
          })
        }
      } else {
        that.setData({
          onReachBottomLoading: true
        })
      }
    })
  }
})