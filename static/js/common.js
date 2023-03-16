let modalTemplate =`
<div class="modal fade" id="masterModel" tabindex="-1" aria-labelledby="masterModelLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="masterModelLabel">Login With OTP</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="mb-3">
                <label for="mobileNumber" class="col-form-label">Please Enter Mobile Number</label>
                <input class="form-control" id="mobileNumber" type="number" placeholder="Please Enter Mobile Number" maxlength="12" required>
            <p class="errorMsgMob"></p>
                </div>
                <div class="mb-3 d-none otpField">
                <label for="mobileNumber" class="col-form-label">Please Enter OTP</label>
                <input class="form-control" id="otpInput" type="number" placeholder="Please Enter OTP" maxlength="6" required>
            <p class="errorMsgOTP"></p>
                </div>
        </div>
        <div class="modal-footer">
          <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
          <button type="button" onclick="sendOTP()" class="btn btn-primary">Submit</button>
          <button type="button" onclick="verifyOTP()" class="btn btn-primary d-none verifyBtn">Verify OTP</button>
        </div>
      </div>
    </div>
  </div>  
`

function sendOTP(){
    const mobile =$("#mobileNumber").val();
    let apiName="otp/send";
    let postData={mobile}
    console.log("postData",postData);
    $.ajax({
        url:apiVersion+`${apiName}`,
        type:"post",
        dataType:'json',
        contentType: 'application/json',
        data: JSON.stringify(postData),
        success:function(res){
            console.log("res",res);
            if(res.status){
                $(".errorMsgMob").html(`<span class="hospMsg" style="font-weight: 600;color:green">${res.message[0]}</span>`)
                $(".otpField").removeClass('d-none')
                $(".verifyBtn").removeClass('d-none')
            }else{
                $(".errorMsgMob").html(`<span class="hospMsg" style="font-weight: 600;color:red">${res.message[0]}</span>`)
            }
        },
        error: function (err) {
			console.log("Error",err);
            $(".errorMsgMob").html(`<span class="hospMsg" style="font-weight: 600;color:red">${err.message[0]}</span>`)
		}
    })
}

function verifyOTP(){
    const otp =$("#otpInput").val();
    let apiName="otp/verify";
    let postData={mobile:$("#mobileNumber").val(),otp,ip:'1.2'}
    console.log("postData",postData);
    $.ajax({
        url:apiVersion+`${apiName}`,
        type:"post",
        dataType:'json',
        contentType: 'application/json',
        data: JSON.stringify(postData),
        success:function(res){
            console.log("res",res);
            if(res.status){
                $(".errorMsgOTP").html(`<span class="hospMsg" style="font-weight: 600;color:green">${res.message[0]}</span>`)
                setTimeout(() => {
                    window.location.replace(serverPath+'profile.html')
                }, 3000);
            }else{
                $(".errorMsgOTP").html(`<span class="hospMsg" style="font-weight: 600;color:red">${res.message[0]}</span>`)
            }
        },
        error: function (err) {
			console.log("Error",err);
            $(".errorMsgOTP").html(`<span class="hospMsg" style="font-weight: 600;color:red">${err.message[0]}</span>`)
		}
    })
}

function bookHospital(){
    $('#masterModel').modal('show');
}

$(document).ready(function(){
    document.body.innerHTML+=modalTemplate

    let apiName="hospital/get";
    // console.log("postData",postData);
    $.ajax({
        url:apiVersion+`${apiName}`,
        type:"post",
        dataType:'json',
        contentType: 'application/json',
        success:function(res){
            console.log("res",res);
            if(res.status){
                let specisTag=""
                res.data.forEach(itm => {
                    specisTag+=`<div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="team-item position-relative">
                        <div class="position-relative">
                            <img class="img-fluid" src="images/applolo.jpg" alt="">
                        </div>
                        <div class="bg-light text-center p-4">
                            <div class="row">
                                <div class="col-lg-12">
                                    <h5>${itm.name}</h5>
                                    <table>
                                        <tr>
                                            <td>Located</td>
                                            <td>${itm.city}</td>
                                        </tr>
                                        <tr>
                                            <td>Opening Hours</td>
                                            <td>24x7</td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="col-md-6 btn">
                                    <a href="view.html">
                                        <button class="btnred" >Visit</button>
                                    </a>
                                </div>
                                <div class="col-md-6 btn">
                                    <a href="tel:8003051520">
                                        <button class="btnblue" onclick="bookHospital()">Book Now</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
                });
                $(".specialistDiv").html(specisTag)
            }
        },
        error: function (err) {
			console.log("Error",err);
		}
    })

    
})

