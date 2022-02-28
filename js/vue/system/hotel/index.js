/*
 * @Description: 
 * @version: 
 * @Author: SunDuncan
 * @Date: 2022-02-18 16:08:57
 * @LastEditors: SunDuncan
 * @LastEditTime: 2022-02-28 21:17:20
 */
var user = getUserInfo();
var vue = new Vue({
    el:"#app",
    data:{
        page:{},
        user:{},
        hotels: {}


    },
    methods:{
        hotelDetail(id) {
            var startDate = $("#startdate").val()
            var endDate = $("#enddate").val()
            if (startDate) {
                console.log(startDate.split("/"))
                let temp_date = startDate.split("/")
                startDate = temp_date[2] + "-" + temp_date[0] + "-" + temp_date[1]
            }
            if (endDate) {
                let temp_date = endDate.split("/")
                endDate = temp_date[2] + "-" + temp_date[0] + "-" + temp_date[1]
            }
            location.href = "./detail.html?id=" + id + "&startDate=" + startDate + "&endDate=" + endDate
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
        initDate() {
            var param = getParams();
            console.log(param)
            var d = new Date()
            var year = d.getFullYear()
            var month = d.getMonth() + 1
            var day = d.getDate()
            $("#startdate").val(month + "/" + day + "/" + year)
            d.setTime(d.getTime()+24*60*60*1000);
            year = d.getFullYear()
            month = d.getMonth() + 1
            day = d.getDate()
            $("#enddate").val(month + "/" + day + "/" + year)
        },
        getHotels: function () {
            var name = $("#name").val()
            var startDate = $("#startdate").val()
            var endDate = $("#enddate").val()
            var query = {}
            if (name) {
                query.name = name
            }

            if (startDate) {
                console.log(startDate.split("/"))
                let temp_date = startDate.split("/")
                startDate = temp_date[2] + "-" + temp_date[0] + "-" + temp_date[1]
                query.startDate = startDate
            }
            if (endDate) {
                let temp_date = endDate.split("/")
                endDate = temp_date[2] + "-" + temp_date[0] + "-" + temp_date[1]
                query.endDate = endDate
            }
            console.log(query)
            ajaxGet("/hotel/query",query, function(data) {
                var datas = data.data
                datas.forEach(element => {
                    element.image = "http://localhost:8082" + element.image
                });
                console.log(datas)
                vue.hotels = datas
            })
        } 
    },
    mounted:function () {
        //游记分页
        /**
         * 默认的时间是当天
         */
        this.initDate()
        this.getHotels()
    }
});

