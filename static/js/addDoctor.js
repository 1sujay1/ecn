function addDoctor(){
    console.log("apiVersion",apiVersion);
    let pwd = $(".docPassword").val();
    console.log("pwd",pwd);
    let cPwd = $(".docConfirmPassword").val();
    if(!pwd){
        $(".hospMsg").html(`<p class="hospMsg" style="font-weight: 600;color:red">Please enter password</p>`)
    return
    }
    if(pwd != cPwd){
        $(".hospMsg").html(`<p class="hospMsg" style="font-weight: 600;color:red">Password and confirm password donot match</p>`)
    return
    }
    let postData={
        name : $(".docName").val(),
        degree : $(".docDegree").val(),
        tag : $(".docTag").val(),
        email : $(".docEmail").val(),
        password : pwd,
    }

    console.log("postData",postData);

    let apiName="/doctor/create";
    $.ajax({
        url:apiVersion+`${apiName}`,
        type:"post",
        dataType:'json',
        contentType: 'application/json',
        data: JSON.stringify(postData),
        success:function(res){
            console.log("res",res);
            if(res.status){
                $(".hospMsg").html(`<p class="hospMsg" style="font-weight: 600;color:green">${res.message[0]}</p>`)
            }else{
                $(".hospMsg").html(`<p class="hospMsg" style="font-weight: 600;color:red">${res.message[0]}</p>`)
            }
        },
        error: function (err) {
			console.log("Error",err);
            $(".hospMsg").html(`<p class="hospMsg" style="font-weight: 600;color:red">${err.message[0]}</p>`)
		}
    })
}