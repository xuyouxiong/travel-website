/*
 * @Description: 
 * @version: 
 * @Author: SunDuncan
 * @Date: 2022-02-18 16:08:57
 * @LastEditors: SunDuncan
 * @LastEditTime: 2022-02-28 21:19:32
 */
var user = getUserInfo();
var vue = new Vue({
    el:"#app",
    data:{
        page:{},
        user:{},
        rooms: {}


    },
    methods:{
        confirmOrder(id) {
            var param = getParams();
            location.href = "./order.html?id=" + id + "&startDate=" + param['startDate'] + "&endDate=" + param['endDate'];
        },
        orderChange:function (orderType) {
            var el = event.currentTarget;
            $(".orderBy").closest("div").removeClass("on");
            $(el).closest("div").addClass("on");

            $("#orderType").val(orderType);

            this.commPage(1);

        },
        commPage:function (page) {
            var param = getParams();
            var p = $("#travelForm").serialize() + "&currentPage=" + page;
            //游记分页
            ajaxGet("/travels/query?"+p,{}, function (data) {
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
        getRooms() {
            var param = getParams();
            console.log(param)
            ajaxGet('/room/query', {hotelId: param.id}, function(data) {
                let datas = data.data
                datas.forEach(element => {
                    element.image = "http://localhost:8082" + element.image
                });
                vue.rooms = datas
            })
        }
    },
    mounted:function () {
        //游记分页
        this.getRooms()
    }
});

