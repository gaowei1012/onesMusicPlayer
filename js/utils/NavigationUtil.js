

export default class NavigationUtil {
  /**
   * 回退上一级页面
   * @param {any} params params
   * @param {elm} page page
   */
  static goPage(params, page) {
    let navigation = NavigationUtil.navigation;
    if (!navigation) {
      return;
    }
    navigation.navigate(page, {...params});
  }
  /**
   * 重置到首页
   * @param {params} params params
   */
  static restToHomePage(params) {
    const {navigation} = params;
    navigation.navigate('Main');
  }

  /**
   * 返回到上一级
   * @param {props} navigation 导航
   */
  static goBack(navigation) {
    if (!navigation) {
      console.log('navigation not final');
      return null;
    }
    navigation.goBack();
  }
}
