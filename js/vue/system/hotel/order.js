/*
 * @Description: 
 * @version: 
 * @Author: SunDuncan
 * @Date: 2022-02-18 16:08:57
 * @LastEditors: SunDuncan
 * @LastEditTime: 2022-03-03 17:56:21
 */
var user = getUserInfo();
var vue = new Vue({
    el:"#app",
    data:{
        page:{},
        user:{},
        info: {},
        start_date: {},
        end_date: {}
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
        initData() {
            var param = getParams();
            console.log('ss', param)
            ajaxGet("/room/getDetail",{id: param.id}, function (data) {
                console.log(data)
                let datas = data.data
                datas.image = "http://localhost:8082" + datas.image
                vue.info = datas
                // vue.page = data.data;
                vue.start_date = param.startDate
                vue.end_date = param.endDate
            })
        },
        goPay() {
            $("#modal").show()
            this.createOrder()
            setTimeout(function() {
                popup("支付成功了");
            }, 5000);

            setTimeout(function() {
                location.href = "/views/hotel/index.html"
            }, 6000);

        },
        closePay() {
            $("#modal").hide()
        },
        createOrder() {
            let datas = vue.info
            let start_date = vue.start_date
            let end_date = vue.end_date
            datas.startDate = start_date
            datas.endDate = end_date
            let name = $("#name").val()
            let phone = $("#phone").val()
            let idCard = $("#id_card").val()
            console.log(name, phone, id_card)

            ajaxPost("/order/setOrder",{
                info: JSON.stringify(datas),
                name,
                phone,
                idCard,
                hotelId: datas.hotelId,
                hotelName: datas.hotelName,
                roomId: datas.id,
                price: datas.price,
                type: '酒店',
                roomName: datas.name
            }, function (data) {
               console.log(data)
            })

        }
    },
    mounted:function () {
        //游记分页
        this.initData()
    }
});

