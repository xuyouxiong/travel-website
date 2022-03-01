/*
 * @Description: 
 * @version: 
 * @Author: SunDuncan
 * @Date: 2022-02-13 19:20:27
 * @LastEditors: SunDuncan
 * @LastEditTime: 2022-03-01 19:42:17
 */
var user = getUserInfo();

if(!user){
    window.confirm("没有登录, 不允许进来");
}

var vue = new Vue({
    el:"#app",
    data:{
        owner:{},
        visitors:[],
        datas: {}
    },
    methods:{
        cancelOrder(id) {
            ajaxGet("/order/cancelOrder",{id},function (data){
                window.location.reload()
            })
        },
        initData() {
             var param = getParams();
            ajaxGet("/order/getOrder",{uid:param.ownerId},function (data){
                let datass = data.data
                datass.forEach(element => {
                    element.orderInfo = JSON.parse(element.info)
                });
                console.log(datass)
                vue.datas = datass

            })
        }
    },
    filters:{

    },
    mounted:function () {
        this.initData()
    }
       
});

