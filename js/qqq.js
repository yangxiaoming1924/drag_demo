var BASE_URL = "/tl/goddess2018/";
(function(){
    $goddess2016m = $;

    /** 鍒ゆ柇娲诲姩寮€鍏� */
    $goddess2016m.checkSwitch = function(switchStatus) {
        var flag = true;
        if (switchStatus == 1) {
            return flag;
        } else if (switchStatus == 2) {// activity is already end
            popInfo("","浜茬埍鐨勬潵鏅氫簡鍝燂紝娲诲姩宸茬粡缁撴潫鍟︼紒");
        } else if (switchStatus == 3) {// activity is close
            popInfo("","娲诲姩宸插叧闂紝鎰熻阿鎮ㄥ娓告垙鐨勫叧娉�");
        } else if (switchStatus == 0) {// activity is not begin
            popInfo("","娲诲姩杩樻湭寮€濮嬶紝鏁鏈熷緟");
        } else if (switchStatus == 99 || switchStatus == -1) {// server is busy
            popInfo("","浜蹭滑澶儹鎯呬簡锛屾湇鍔″櫒濡圭焊鏈夌偣鎵垮彈涓嶄綇锛屽伔鍋疯窇鍒拌钀芥劅鍔ㄧ殑鎺夌溂娉幓鍟︼紝鎵€浠ユ殏鏃舵病娉曟帴寰呬綘锛岃绋嶅€欏啀鏉ュソ涔堬紵");
        }
        flag = false;
        return flag;
    },

        /** 鍒ゆ柇鏄惁鐧婚檰 */
        $goddess2016m.checkLogin = function(loginStatus){
            var flag = false;
            if(loginStatus == "1") {
                flag = true;
            } else if(loginStatus == "0"){
                isLogin(1);
            }
            return flag;
        },

        /** 涓汉涓績 */
        $goddess2016m.personCenter = function(){
            var url = BASE_URL + "personCenter.ncdo";
            $.ajax({
                type:"post",
                url:url,
                async:false,
                data:{},
                dataType: "json",
                success:function (data, textStatus) {
                    if($goddess2016m.checkSwitch(data.switchStatus) && $goddess2016m.checkLogin(data.loginStatus)){
                        if(data.JOIN_TYPE=="L"){
                            if(data.STATUS=="1"){
                                //popup($(".person5"));
                                fillPerInfo(data);
                                popup($("#pop-per"));
                            }else if(data.STATUS=="9"){
                                popup($(".person2"));
                            }else if(data.STATUS=="0"){
                                popup($(".person3"));
                            }
                        }else if(data.JOIN_TYPE=="H"){
                            if(data.STATUS=="1"){
                                //popup($(".person6"));
                                fillPerInfo(data);
                                popup($("#pop-per"));
                            }else if(data.STATUS=="9"){
                                popup($(".person4"));
                            }else if(data.STATUS=="0"){
                                popup($(".person3"));
                            }
                        }else if(data.JOIN_TYPE=="C"){
                            if(data.STATUS=="1"){
                                //popup($(".person7"));
                                fillPerInfo(data);
                                popup($("#pop-per"));
                            }else if(data.STATUS=="9"){
                                popup($(".person4"));
                            }else if(data.STATUS=="0"){
                                popup($(".person3"));
                            }
                        }else{
                            popup($(".person1"));
                        }
                    }
                },
                complete:function(){

                }
            });
        };

    /** 娲诲姩淇℃伅 */
    $goddess2016m.actvInfo = function(){
        var url = BASE_URL + "actvInfo.ncdo";
        $.ajax({
            type:"post",
            url:url,
            async:false,
            data:{},
            dataType: "json",
            success:function (data, textStatus) {
                // 娲诲姩鏃ユ湡鍒ゆ柇
                if(data==null){
                    $(".signup").attr("href","javascrip:;").on("click",function(){
                        popInfo("","鎶ュ悕宸茬粨鏉�");
                        //alert("鎶ュ悕宸茬粨鏉�");
                    });
                    return;
                }
                var dateS = data.TIME_S.time; // 鎶ュ悕寮€濮�
                var dateE = data.TIME_E.time; // 鎶ュ悕缁撴潫
                var dateC = new Date();
                if(dateC < dateS){
                    $(".signup").attr("href","javascrip:;").on("click",function(){
                        popInfo("","鎶ュ悕鏈紑濮�");
                        //alert("鎶ュ悕鏈紑濮�");
                    });
                    return ;
                }
                if(dateC > dateE){
                    $(".signup").attr("href","javascrip:;").on("click",function(){
                        popInfo("","鎶ュ悕宸茬粨鏉�");
                        //alert("鎶ュ悕宸茬粨鏉�");
                    });
                    return ;
                }
            }
        });
    };

})();

function fillPerInfo(data){
    $("#perNo").html("缂栧彿<br>"+data.ID);
    $("#perRank").text("鎺掑悕"+data.RANKING);
    $("#perVotes").text(data.VOTE_NUM_F+"绁�");
    $("#perZone").text(data.ZONE);
    $("#perGroup").text(data.SERVER);
    $("#perRole").text(data.ROLE_NAME);
    $("#perAge").text(data.AGE);
    $("#perHigh").text(data.HEIGHT+"cm");
    $("#perWeight").text(data.WEIGHT+"kg");
    $("#perPhone").text(data.PHONE);
    $("#perQQ").text(data.QQ);
    $("#perYY").text(data.YY);
    $("#perDeclaration").text(data.DECLARATION);
    var imgString = "";
    imgString += "<img src=\""+data.IMAGE1+"\" alt=\"\" width=\"220\" height=\"220\">";
    imgString += "<img src=\""+data.IMAGE2+"\" alt=\"\" width=\"220\" height=\"220\">";
    imgString += "<img src=\""+data.IMAGE3+"\" alt=\"\" width=\"220\" height=\"220\">";
    $("#pop-per #focus2").html(imgString);
    // 杩欐槸涓汉涓績鐨勮疆鎾�
    changImg($("#focus2"),"cycle-num2");
    if(data.VIDEO){
        $("#perVideoUrl").attr("href",data.VIDEO);
        $("#perVideoUrlBG").attr("src","/act/xtl/201804/Goddess/pc/img/play_n.png");
    }
}

$(function(){
    $(".personCenter").click(function(){
        $goddess2016m.personCenter();
    });
    $(".popMsg .pop-nr-up6").on("click",function(){
        hideMask($(this).parents(".pop"));
    });
    $goddess2016m.actvInfo();
});

function popInfo(title,content,href){
    $(".popMsg h2").html(title);
    $(".popMsg .bold").html(content);
    //$(".popMsg .pop-cont a").html(href);
    popup($('.popMsg'));
}
if(window.navigator.userAgent.indexOf('Chrome') != -1){
    setInterval(function(){
        if($("#loginPop").is(":visible")){
            setTimeout(function(){
                $("#loginIframe").width(190);
            },500)
            //popup($("#loginPop"));
        }else{
            $("#loginIframe").width(490);
        }
    },500)
}