"use strict";

$(document).ready(function () {
    $("#get_otp_btn").on("click", function (e){     
        e.preventDefault();
        var mobile_no = $("#phone").val();
        otp_func(mobile_no );
        $(this).attr("disabled", "disabled");
    });
    //debugger
    const codes = navigator.geolocation.getCurrentPosition(
        (pos) => {
            const codes = initialize( pos.coords.latitude, pos.coords.longitude );
            codes.then(data =>
            {
                //console.log( data.results[0].formatted_address )
                $("#lat").val(pos.coords.latitude);
                $("#long").val(pos.coords.longitude);
                $("#address").val(data.results[0].formatted_address);
            });
        },
        (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );
});

function otp_func(mobile_no) {
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        type: "POST",
        data: {
            mobile_no,
            from: "js",
        },
        url: base_url + "/gen-otp",
        beforeSend: function () {
            $("#error").removeClass("d-none");
            $("#error").html(
                `<p class="alert alert-warning">Sending Otp Please Wait</p>`
            );
        },
        success: function (result) {
            if (result.success == true) {
                // for development purpose only
                $("#otp_field").removeClass("d-none");
                $("#process_btn_div").removeClass("d-none");
            } else {
                $("#error").html(
                    `<p class="alert alert-danger">${result.data}</p>`
                );
            }
        },
        complete: function (data) {
            if (data.responseJSON.success == true) {
                $("#error").html(
                    `<p class="alert alert-success">Otp Has Been Sent to Mobile Number</p>`
                );
            }
            $("#get_otp_btn").attr("disabled", false);
        },
        error: function (err) {
            $("#error").html(
                `<p class="alert alert-success">${err.responseText.message}</p>`
            );
        },
    });
}
let geocoder;
function initialize(lat,lng) {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);
    return geocoder.geocode(
        {
            latLng: latlng,
        },
        function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    return results[1]; //console.log(results[1]);
                } else {
                    //alert("No results found");
                    return "No results Found";
                }
            } else {
                //alert("Geocoder failed due to: " + status);
                return "Geocoder failed due to: " + status;
            }
        }
    );
}
