const objPlugins = {
  install(app, options) {
    /**
     * app : 현재 어플리케이션 인스턴스
     * options : 넘겨받는 옵션
     */
    console.log('objPlugins', app, options);
    /**
     * app.component() 전역 컴포넌트
     * app.config.globalProperties 전역 애플리케이션 인스턴스에 속성 추가
     * app.directive 커스텀 디렉티브
     * app.provide 리소스를 자식 컴포넌트에서 사용 가능하게 함
     */
  },
};
export default objPlugins;
