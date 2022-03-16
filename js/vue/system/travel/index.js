/*
 * @Description: 
 * @version: 
 * @Author: SunDuncan
 * @Date: 2022-02-13 19:20:27
 * @LastEditors: SunDuncan
 * @LastEditTime: 2022-03-16 15:45:17
 */
var user = getUserInfo();
var vue = new Vue({
    el:"#app",
    data:{
        page:{},
        user:{}



    },
    methods:{
        orderChange:function (orderType) {
            var el = event.currentTarget;
            $(".orderBy").closest("div").removeClass("on");
            $(el).closest("div").addClass("on");
            $("#orderType").val(orderType);

            this.commPage(1);

        },
        commPage:function (page) {
            var param = getParams();
            let query = {}
            if (param) {
                query.keyword = decodeURIComponent(param.keyword)
                
            }
            var p = $("#travelForm").serialize() + "&currentPage=" + page;
            //游记分页
            ajaxGet("/travels/query?"+p,query, function (data) {
                vue.page = data.data;
                buildPage(vue.page.current, vue.page.pages,vue.doPage);
            })
        },
        doPage:function(page){
            this.commPage(page);
        },
        conditionChange:function(){
            this.commPage(1);
        },
        initData() {
            var param = getParams()
            console.log(param)
            let query = {}
            if(param.keyword) {
                query = {
                    keyword: decodeURIComponent(param.keyword)
                }
            }
            ajaxGet("/travels/query",query, function (data) {
                vue.page = data.data;
                buildPage(vue.page.current, vue.page.pages,vue.doPage);
            })
        }
    },
    mounted:function () {
        this.initData()
        //游记分页
       
    }
});

