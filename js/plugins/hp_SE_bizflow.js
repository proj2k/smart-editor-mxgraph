
nhn.husky.SE_bizflow = jindo.$Class({
    name: "SE_bizflow",
    $init: function(elAppContainer) {
        this._assignHTMLObjects(elAppContainer);
    },
    _assignHTMLObjects: function(elAppContainer) {
        this.oDropdownLayer =
            cssquery.getSingle("DIV.husky_seditor_bizflow_layer", elAppContainer);
        //div 레이어안에 있는 input button을 cssquery로 찾는 부분.
        this.oInputButtonBizflowNew = cssquery.getSingle(".se_button_bizflow_new", elAppContainer);
        this.oInputButtonBizflowMod = cssquery.getSingle(".se_button_bizflow_mod", elAppContainer);
    },
    $ON_MSG_APP_READY: function() {
        this.oApp.exec("REGISTER_UI_EVENT", ["bizflow", "click", "SE_TOGGLE_BIZFLOW_LAYER"]);
        //input button에 click 이벤트를 할당.
        this.oApp.registerBrowserEvent(this.oInputButtonBizflowNew, "click", "BIZFLOW_NEW");
        this.oApp.registerBrowserEvent(this.oInputButtonBizflowMod, "click", "BIZFLOW_MOD");
    },
    $ON_SE_TOGGLE_BIZFLOW_LAYER: function() {
        this.oApp.exec("TOGGLE_TOOLBAR_ACTIVE_LAYER", [this.oDropdownLayer]);
    },
    $ON_BIZFLOW_NEW: function() {
      var bizflowImg = this.oApp.getWYSIWYGDocument().getElementById('bizflowImg');
      if(bizflowImg) {
        bizflowImg.remove();
      }
      window.open('mxgraph/main/editors/diagrameditor.html','bizflowNew');
    },
    $AFTER_BIZFLOW_NEW: function(a, b, c) {
        // console.log(this.oApp.getWYSIWYGDocument().querySelector('#canvas'));
    },
    $ON_BIZFLOW_MOD: function() {
        window.open('mxgraph/main/editors/diagrameditor.html','bizflowMod');
    }
});
