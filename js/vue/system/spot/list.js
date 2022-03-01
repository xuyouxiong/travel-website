/*
 * @Description: 
 * @version: 
 * @Author: SunDuncan
 * @Date: 2022-02-13 19:20:27
 * @LastEditors: SunDuncan
 * @LastEditTime: 2022-03-02 02:56:14
 */
var vue = new Vue({
    el:"#app",
    data:{
        spots:[],
        introduction: {},
        modal: false
    },
    methods:{
        viewSpot(id, introduction) {
            vue.modal = true
            vue.introduction = introduction
        },
        closeSpot() {
            vue.modal = false
        },
        confirmOrder(id) {
            location.href = "./order.html?id=" + id
        }
    },
    mounted:function () {
        ajaxGet("/spot/getSpots",{},function (result){
            console.log(result)
            let spots = result.data
            spots.forEach(element => {
                element.image = "http://localhost:8082" + element.image
            });
            vue.spots = spots;

            console.log(vue.spots);
        })
    }
});

