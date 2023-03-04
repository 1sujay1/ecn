$(document).ready(function(){
    let apiName='/hospital/get'
    $.ajax({
        url:apiVersion+`${apiName}`,
        type:"post",
        success:function(res){
            console.log("res",res);
            let temp= ""
            if(res.data.length){
                res.data.forEach((itm,index)=>{
                    temp+=`
                    <tr>
                    <td>${index+1}</td>
                    <td>${itm.name} Hospitals</td>
                    <td>${itm.city}</td>
                    <td>
                        <div class="dropdown no-arrow">
                            <button class="btn btn-plane" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"  aria-expanded="false">
                                <span class="icon text-white-50">
                                    <i class="fas fa-info-circle"></i>
                                </span> Change Plan
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">Premium</a>
                            </div>
                        </div>
                    </td>
                    <td>
                        <a href="#" class="btn  btn-plane">
                            <span class="icon text-white-50">
                                <i class="fas fa-search"></i>
                            </span> Visit
                        </a>
                    </td>
                </tr>
                    `
                })
            }
        // console.log("hospList",hospList);
            $(".hospList").html(temp)
        },
        error: function (err) {
			console.log("Error",err);
            
		}
    })
})

function addHospital(){
    console.log("apiVersion",apiVersion);
    let postData={
        name : $(".hospName").val(),
        city : $(".hospCity").val(),
        pincode : $(".hospPincode").val(),
        website : $(".hospWeb").val(),
        mapLink : $(".hospMap").val(),
        ratings : $(".hospRatings").val(),
        lat : $(".hospLat").val(),
        lon : $(".hospLon").val(),
        thumbNail : $(".hospThumb").val(),
        hospitalType : $(".hospTypeRadio:checked").val(),
        address : $(".hospAddress").val().trim(),
        contactEmail : [$(".hospNumber").val()],
        contactNumber : [$(".hospEmail").val()],
    }
    let services =[]
    $('.sericeCheckbox:checked').each(function(){        
        var values = $(this).val();
        services.push(values)
    });
let hospImage = $(".hospImage").val();
let img_url =[]
if(hospImage.length){
    let splitBycomma =hospImage.split(",");
    splitBycomma.forEach((itm)=>{
        img_url.push(itm)
    })
}
    services = services.length?services:"AMBULANCE"
    postData.services=services
    postData.img_url=img_url
    console.log("postData",postData);
// postData = {
//     "name": "fgsgsd",
//     "city": "gfsdg",
//     "pincode": "555555",
//     "website": "google.com",
//     "mapLink": "google map",
//     "ratings": "4",
//     "lat": "54",
//     "lon": "45",
//     "thumbNail": "link1",
//     "hospitalType": "PRIVATE",
//     "address": "fdsafsafs",
//     "contactEmail": [
//         "7777777777"
//     ],
//     "contactNumber": [
//         "fdsafaf@g.com"
//     ],
//     "services": [
//         "BLOOD_BANK"
//     ],
//     "img_url": [
//         "link1",
//         "link2"
//     ]
// }
    let apiName="hospital/create";
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