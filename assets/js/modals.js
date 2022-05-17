var cityPickerCity;
var cityPickerWay;
var cityPickerForm;
var datePickerElement;
var datePickerWay;
var pickerDate = new Date();
var pickerTempDate;
var pickerInitDate;
var initForm;
var passengerPickerElement;
var passengerForm;
var monthPickerForm;
var preloadingGif;
var preloadingLabel;
var hotelInitForm;
var timePickerForm;
var timePickerElement;
var activeForm;
const weekdays = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

// Tarih seç
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth();
var yyyy = today.getFullYear();

if (dd < 10) {
  dd = '0' + dd
}

if (mm < 10) {
  mm = '0' + mm
}

var picker = new Pikaday({
  firstday: 1,
  field: document.getElementById('datepicker'),
  defaultDate: pickerInitDate,
  startDate: pickerInitDate,
  minDate: pickerInitDate,
  format: 'DD/MM/YYYY',
  bound: false,
  i18n: {
    previousMonth: 'Önceki ay',
    nextMonth: 'Sonraki Ay',
    months: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    weekdays: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
    weekdaysShort: ['Paz', 'Pts', 'Sal', 'Çar', 'Per', 'Cum', 'Cts']
  },
  container: document.getElementById('container'),
  onSelect: function (date) {
    pickerDate = date;
    if (datePickerWay === 1) {
      datePickerElement.parents().eq(2).find(".going-day").text(date.getDate());
      datePickerElement.parents().eq(2).find(".going-month").text(monthNames[date.getMonth()]);
      datePickerElement.parents().eq(2).find(".going-day-name").text(weekdays[date.getDay()]);

      // Dönüş tarihi
      datePickerElement.parents().eq(2).find(".return-day").text(date.getDate());
      datePickerElement.parents().eq(2).find(".return-month").text(monthNames[date.getMonth()]);
      datePickerElement.parents().eq(2).find(".return-day-name").text(weekdays[date.getDay()]);

      var curDate = date.getMonth() + 1;
      initForm.find("#goingDate").val(date.getDate() + "." + curDate + "." + date.getUTCFullYear());
      initForm.find("#returnDate").val(date.getDate() + "." + curDate + "." + date.getUTCFullYear());
      pickerTempDate = date // sadece gidiş için
    } else if (datePickerWay === 2) {
      datePickerElement.parents().eq(2).find(".return-day").text(date.getDate());
      datePickerElement.parents().eq(2).find(".return-month").text(monthNames[date.getMonth()]);
      datePickerElement.parents().eq(2).find(".return-day-name").text(weekdays[date.getDay()]);
      var curDate = date.getMonth() + 1;
      initForm.find("#returnDate").val(date.getDate() + "." + curDate + "." + date.getUTCFullYear());
    }

    $(".picker-overlay").fadeOut();
    $(".mobile-date-picker").css({
      'opacity': "0",
      'visibility': 'hidden',
      'bottom': "-100%"
    });

  }
});


today = new Date();
var gun = today.getDate();
var ay = today.getMonth()+1;
var yil = today.getFullYear();
document.getElementById('goingDate').value = gun + '.' + ay + '.' + yil;
document.getElementById('returnDate').value = gun + '.' + ay + '.' + yil;

document.getElementById("returnDate").disabled = true;

// Modal aç
function openModal(modal, preloadingImage, preloadingText, form) {
  preloadingGif = preloadingImage;
  preloadingLabel = preloadingText;
  activeForm = form;


  $("*[data-modal-form]").css({
    visibility: 'hidden',
    right: "-100%",
  });
  $("[data-modal-form=" + modal + "]").css({
    visibility: 'visible',
    right: "0",
  });
}


function showPreloader() {
  $(".loading-preloader").find(".preloader-gif").attr("src", "img/new-mobile/loading-gifs/" + preloadingGif + ".gif")
  $(".loading-preloader").find(".text").text(preloadingLabel);
  $(".loading-preloader").css("display", "flex")
}

// Şehir seçici
function showCityPicker(element, title, form, way) {
  cityPickerCity = element;
  cityPickerForm = form;
  cityPickerWay = way;

  var pickerElement = $(".mobile-city-picker");

  pickerElement.find("header .picker-title").text(title);
  pickerElement.find(".content").scrollTop();
  pickerElement.css({
    'opacity': "100",
    'visibility': 'visible',
    'right': "0"
  });
}

function showDatePicker(element, title, type, form) {
 initForm = form;

 if (type === 1 ){
  	picker.setMinDate(today)
  } else if (type == 2 && pickerTempDate){
  	console.info(pickerTempDate)
  	picker.setMinDate(pickerTempDate)
  } else {
  	console.info(pickerTempDate)
  	picker.setMinDate(today)
}

  datePickerElement = element;
  datePickerWay = type;

  var pickerElement = $(".mobile-date-picker");

  pickerElement.find("header .picker-title").text(title);
  $(".picker-overlay").fadeIn();
  pickerElement.css({
    'opacity': "100",
    'visibility': 'visible',
    'bottom': "0"
  });
}

function showMonthPicker(element, title, form) {
  monthPickerForm = form;
  datePickerElement = element;

  var pickerElement = $(".mobile-month-picker");

  pickerElement.find("header .picker-title").text(title);
  $(".picker-overlay").fadeIn();
  pickerElement.css({
    'opacity': "100",
    'visibility': 'visible',
    'bottom': "0"
  });
}

function showTimePicker(element, title, form) {
  timePickerForm = form;
  timePickerElement = element;

  var pickerElement = $(".mobile-time-picker");

  pickerElement.find("header .picker-title").text(title);
  $(".picker-overlay").fadeIn();
  pickerElement.css({
    'opacity': "100",
    'visibility': 'visible',
    'bottom': "0"
  });
}

function showPassengerPicker(element, form) {
  passengerPickerElement = element;
  passengerForm = form;
  pickerElement = $(".mobile-passenger-select");

  $(".picker-overlay").fadeIn();
  pickerElement.css({
    'opacity': "100",
    'visibility': 'visible',
    'bottom': "0"
  });
}

function showHotelRoomPicker(element, title, form) {
  hotelInitForm = form;

  var pickerElement = $(".mobile-hotel-room-select");

  pickerElement.find("header .picker-title").text(title);

  pickerElement.css({
    'opacity': "100",
    'visibility': 'visible',
    'right': "0"
  });
}

$(document).ready(function () {
  $(".dynamic-modal-content").trigger("reset");

  $(".password-toggle i").click(function (e) {
    e.preventDefault();

    let input = $(this).parent().find(".form-control");

    $(this).toggleClass("fa-eye fa-eye-slash");
    if (input.attr("type") === "password") {
      input.attr("type", "text");
    } else if (input.attr("type") === "text") {
      input.attr("type", "password");
    }
  });

  $(".app-mobile-menu .menu-header .login, .forgot-password-modal .register-now, .mobile-bottom-fixed-menu .profile a, .register-modal .register-now").click(function (e) {
    e.preventDefault();
    $(".forgot-password-modal").css({
      'visibility': 'hidden',
      'right': "-100%"
    });

    $(".register-modal").css({
      'visibility': 'hidden',
      'right': "-100%"
    });

    $(".login-modal").css({
      'visibility': 'visible',
      'right': "0"
    })
  });

  $("#selectedTime").change(function () {
    var thisSelected = $("option:selected", this).text();
    timePickerElement.text(thisSelected);
    timePickerElement.parent().find("[data-time-element]").val(thisSelected)
  });

  // Modallar
  $(".search-field-carousel a").click(function (e) {
    e.preventDefault();
  });

  $(".close-common-modal").click(function (e) {
    e.preventDefault();

    $(this).parent().parent().css({
      visibility: 'hidden',
      right: "-100%",
    })
  });

  $(".app-mobile-menu .menu-header .register, .login-modal .register-now").click(function (e) {
    e.preventDefault();

    $(".login-modal").css({
      'visibility': 'hidden',
      'right': "-100%"
    });

    $(".register-modal").css({
      'visibility': 'visible',
      'right': "0"
    })
  });

  $(".login-modal .forgot-password-link").click(function (e) {
    e.preventDefault();
    $(".forgot-password-modal").css({
      'visibility': 'visible',
      'right': "0"
    })
  });

  $(".close-modal").click(function (e) {
    e.preventDefault();

    $(this).parent().parent().css({
      'visibility': 'hidden',
      'right': "-100%"
    });
  });

  // Seçicileri kapat
  $(".close-city-picker").click(function (e) {
    e.preventDefault();

    $(this).parent().parent().css({
      'visibility': 'hidden',
      'right': "-100%",
      'opacity': "0"
    });
  });

  $(".close-time-select").click(function (e) {
    e.preventDefault();

    $(".picker-overlay").fadeOut();


    $(this).parents().eq(3).css({
      'visibility': 'hidden',
      'bottom': "-100%",
      'opacity': "0"
    });
  });

  $(".close-date-picker").click(function (e) {
    e.preventDefault();
    var d = $(this);

    $(".picker-overlay").fadeOut();

    if ($(this).parents().eq(1).hasClass("mobile-hotel-room-select"))
      d.parent().parent().css({
        'visibility': 'hidden',
        'right': "-100%",
        'opacity': "0"
      });
    else {
      d.parent().parent().css({
        'visibility': 'hidden',
        'bottom': "-100%",
        'opacity': "0"
      });
    }
  });

  $(".close-date-picker-link").click(function (e) {
    e.preventDefault();

    $(".picker-overlay").fadeOut();

    $(this).parent().css({
      'visibility': 'hidden',
      'bottom': "-100%",
      'opacity': "0"
    });
  });

  function populate(selector) {
    var select = $(selector);
    var hours, minutes;
    for (var i = 420; i <= 1320; i += 15) {
      hours = Math.floor(i / 60);
      minutes = i % 60;
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      select.append($('<option></option>')
          .attr('value', i)
          .text(hours + ':' + minutes));
    }
  }

  populate('#selectedTime');

  // Seçicileri kapat
  $(".picker-overlay").click(function (e) {
    e.preventDefault();

    $(".mobile-date-picker, .mobile-passenger-select, .mobile-month-picker, .mobile-time-picker").css({
      'opacity': "0",
      'visibility': 'hidden',
      'bottom': "-100%"
    });

    $(this).fadeOut(100);
  });

  // Şehiri ata
  $(".mobile-city-picker ul li a").click(function () {
    var selectedCity = $(this).text();
    var pickerElement = $(".mobile-city-picker");

    cityPickerCity.text(selectedCity);

    if (cityPickerWay === 1) {
      cityPickerForm.find("#routeFrom").val(selectedCity)
    } else {
      cityPickerForm.find("#routeTo").val(selectedCity)
    }
    pickerElement.css({
      'opacity': "0",
      'visibility': 'hidden',
      'right': "-100%"
    });

    cityPickerCity = ""
  });

  var getDate = new Date();

  $(".date-holder-left").find(".going-day").text(getDate.getDate());
  $(".date-holder-left").find(".going-month").text(monthNames[getDate.getMonth()]);
  $(".date-holder-left").find(".going-day-name").text(weekdays[getDate.getDay()]);

  $(".date-holder-right").find(".return-day").text(getDate.getDate());
  $(".date-holder-right").find(".return-month").text(monthNames[getDate.getMonth()]);
  $(".date-holder-right").find(".return-day-name").text(weekdays[getDate.getDay()]);

  // Gidiş ve dönüş
  $("#oneWay, #twoWay").change(function () {
    var e = $(this);
    if (document.getElementById('oneWay').checked) {
      $(this).parents().eq("1").find("form").find(".inactive-date-holder-content").css({
        display: 'block'
      });
      $(".date-holder-right").hide();
      $(".open-ended-holder").hide();
      $(".open-ended").addClass("set-disabled");
      document.getElementById("returnDate").disabled = true;
    } else if (document.getElementById('twoWay').checked) {
      if ($("#openEnded").is(':checked')) {
        $(".open-ended-holder").show();
        e.parents().eq("1").find("form .inactive-date-holder-content").hide();
        e.parents().eq("1").find("form .date-holder-right").css({
          display: 'none'
        });
      } else {
        e.parents().eq("1").find("form .inactive-date-holder-content").hide();
        e.parents().eq("1").find("form .date-holder-right").css({display: 'flex'});
        $(".open-ended-holder").hide();
      }
      $(".open-ended").removeClass("set-disabled");
      document.getElementById("returnDate").disabled = false;
      var nameee = document.getElementById('goingDate').value;
      document.getElementById('returnDate').value = nameee;
    }
  });


  $(".count-up").click(function (e) {
    e.preventDefault();

    var thisCount = $(this).parent().find(".count");
    var thisCountTemp = thisCount.text();

    if (thisCountTemp > 9) {
    } else {
      thisCountTemp++;
      thisCount.text(thisCountTemp);
      thisCount.attr("data-count", thisCountTemp);
      reCalculatePassengers()
    }
  });


  $(".count-down").click(function (e) {
    e.preventDefault();

    var thisCount = $(this).parent().find(".count");
    var thisCountTemp = thisCount.text();

    if (thisCount.attr("data-user-type") === "Yetişkin") {
      if (thisCountTemp > 1) {
        thisCountTemp--;
        thisCount.text(thisCountTemp);
        thisCount.attr("data-count", thisCountTemp);
        reCalculatePassengers()
      } else {

      }
    } else {
      if (thisCountTemp < 1) {
        //
      } else {
        thisCountTemp--;
        thisCount.text(thisCountTemp);
        thisCount.attr("data-count", thisCountTemp);
        reCalculatePassengers()
      }
    }
  });

  $(".car-count-up").click(function (e) {
    e.preventDefault();

    var thisCount = $(this).parent().find(".car-count");
    var thisCountTemp = thisCount.text();

    if (thisCountTemp > 9) {
    } else {
      thisCountTemp++;
      thisCount.text(thisCountTemp);
      thisCount.attr("data-car-count", thisCountTemp);
      reCalculatePassengers()
    }
  });

  $(".car-count-down").click(function (e) {
    e.preventDefault();

    var thisCount = $(this).parent().find(".car-count");
    var thisCountTemp = thisCount.text();

    if (thisCountTemp < 1) {
    } else {
      thisCountTemp--;
      thisCount.text(thisCountTemp);
      thisCount.attr("data-car-count", thisCountTemp);
      reCalculatePassengers()
    }
  });

  $(".car-type").change(function () {
    reCalculatePassengers();
  });

  function reCalculatePassengers() {
    var personCount = 0;
    var vehicleCount = 0;

    $(".mobile-passenger-select").find(".user-count").each(function () {
      personCount += Number($(this).attr("data-count"));
    });

    vehicleCount += Number($(".car-count").attr("data-car-count"));

    if (vehicleCount === 0) {
      passengerPickerElement.text(personCount + " yolcu, araçsız");
    } else if ($("#car_Type option:selected").text === "Araçsız") {
      passengerPickerElement.text(personCount + " yolcu, araçsız");
    } else {
      passengerPickerElement.text(personCount + " yolcu, " + vehicleCount + " araç");
    }

    var adultCount = $(".mobile-passenger-select [data-user-type='Yetişkin']").text();
    var childCount = $(".mobile-passenger-select [data-user-type='Çocuk']").text();
    var babyCount = $(".mobile-passenger-select [data-user-type='Bebek']").text();
    var carType = $(".mobile-passenger-select #car_Type option:selected").text();
    var carCount = $(".mobile-passenger-select [data-car-count]").text();

    passengerForm.find("#adultCount").val(adultCount);
    passengerForm.find("#childCount").val(childCount);
    passengerForm.find("#babyCount").val(babyCount);
    passengerForm.find("#carType").val(carType);
    passengerForm.find("#carCount").val(carCount);
  }

  $("#ferryForm .inactive-date-holder-content").click(function (e) {
    e.preventDefault();
    $("#twoWay").prop("checked", true);
    document.getElementById("returnDate").disabled = false;
    if ($("#openEnded").is(':checked')) {
      $(".open-ended-holder").show();
      $("#ferryForm .inactive-date-holder-content").hide();
      $("#ferryForm .date-holder-right").css({
        display: 'none'
      });
    } else {
      $("#ferryForm .inactive-date-holder-content").hide();
      $("#ferryForm .date-holder-right").css({display: 'flex'});
      $("#ferryForm .open-ended-holder").hide();
    }
    $("#ferryForm .open-ended").removeClass("set-disabled");
    $("#ferryForm .date-holder-right").click();
  });

  $(".close-month-select").click(function (e) {
    e.preventDefault();

    var selectedMonth = $(".mobile-month-picker #selectedMonth option:selected").text();
    var selectedYear = $(".mobile-month-picker #selectedYear option:selected").text();

    monthPickerForm.find(".month").text(selectedMonth + " " + selectedYear);
    monthPickerForm.find("#selectedMonth").val(selectedMonth);
    monthPickerForm.find("#selectedYear").val(selectedYear);

    $(".picker-overlay").fadeOut();

    $(".mobile-month-picker").css({
      'visibility': 'hidden',
      'bottom': "-100%",
      'opacity': "0"
    });
  });

  $("#greeceIslandsNoVisa").change(function () {
    if ($(this).is(":checked")) {
      $(this).next("#greeceIslandsNoVisaStatus").val("1");
    } else {
      $(this).next("#greeceIslandsNoVisaStatus").val("0");
    }
  });

  $("#openEnded").change(function () {
    if ($(this).is(':checked')) {
      $(".inactive-date-holder-content, .inactive-date-holder").hide();
      $(".open-ended-holder").show()
    } else {
      $(".open-ended-holder").hide();
      $(".inactive-date-holder").hide();
      $(".date-holder-right").css({display: 'flex'})
    }
  });

  $(".change-directions").click(function (e) {
    e.preventDefault();
    var thisForm = $(this).parents().eq(1);
    var fromText = $(thisForm).find(".routes .from .route");
    var toText = $(thisForm).find(".routes .to .route");

    var fromTemp = fromText.text();
    var toTemp = toText.text();

    if (fromText.text() === "Nereden") {
      //
    } else {
      fromText.text(toTemp);
      toText.text(fromTemp);
    }
  });

  var d = new Date();
  var n = monthNames[d.getMonth()];
  $("*[data-month-select]").text(n + " " + d.getUTCFullYear());

  /// Varsayılan değerler
  var fromText = "Nereden";
  var toText = "Nereye";
  var locationAlert = "Lokasyon Seçiniz"

  $(".dynamic-form-form-submit").click(function (e) {
    e.preventDefault();

    // Feribot formu
    if (activeForm === "ferry") {
      var fromRoute = $("#ferryForm .routes .from .route");
      var toRoute = $("#ferryForm .routes .to .route");

      if (fromRoute.text() === fromText) {
        swal({
          title: "Rota seçiniz!",
          text: "Lütfen Gidiş rotası seçiniz.",
          icon: "warning",
          button: "Tamam",
        });
        return false
      } else if (toRoute.text() === toText) {
        swal({
          title: "Rota seçiniz!",
          text: "Lütfen Dönüş rotası seçiniz.",
          icon: "warning",
          button: "Tamam",
        });
        return false;
      } else {
        showPreloader();
        $(this).parent().submit();
      }
    }

    // Tur formu
    if (activeForm === "tour") {
      if ($("#tourForm .routes .route").text() === "Lokasyon Seçiniz") {
        swal({
          title: "Lokasyon seçiniz!",
          text: "Lütfen Gidiş lokasyonu seçiniz.",
          icon: "warning",
          button: "Tamam",
        });
        return false;
      } else {
        showPreloader();
        $(this).parent().submit();
      }
    }

    // Otel formu
    if (activeForm === "hotel") {
      if ($("#hotelForm .routes .route").text() === "Lokasyon Seçiniz") {
        swal({
          title: "Lokasyon seçiniz!",
          text: "Lütfen konaklamak istediğiniz adayı seçiniz.",
          icon: "warning",
          button: "Tamam",
        });
        return false;
      } else {
        showPreloader();
        $(this).parent().submit();
      }
    }

    // Otel formu
    if (activeForm === "cruise") {
      if ($("#cruiseForm .routes .route").text() === "Lokasyon Seçiniz") {
        swal({
          title: "Lokasyon seçiniz!",
          text: "Lütfen seyahat etmek istediğiniz adayı seçiniz.",
          icon: "warning",
          button: "Tamam",
        });
        return false;
      } else {
        showPreloader();
        $(this).parent().submit();
      }
    }

    // Araç formu
    if (activeForm === "car") {
      if ($("#carForm .routes .route").text() === "Lokasyon Seçiniz") {
        swal({
          title: "Lokasyon seçiniz!",
          text: "Lütfen aracı almak istediğiniz adayı seçiniz.",
          icon: "warning",
          button: "Tamam",
        });
        return false;
      } else {
        showPreloader();
        $(this).parent().submit();
      }
    }

    // Tur Detay formu
    if (activeForm === "tour-detail") {
      if ($("#tourDetailForm .date-period").text() === "Lütfen seçiniz") {
        swal({
          title: "Periyot seçiniz!",
          text: "Lütfen gitmek istediğiniz periyodu seçiniz.",
          icon: "warning",
          button: "Tamam",
        });
        return false;
      } else if ($("#tourDetailForm .hotel-select option:selected").text() === "Lütfen seçiniz") {
        swal({
          title: "Hotel tipi seçiniz!",
          text: "Lütfen talep ettiğiniz hotel tipini seçiniz.",
          icon: "warning",
          button: "Tamam",
        });
        return false;
      } else {
        $(this).parents().eq(1).submit();
      }
    }
  });

  var roomCount = $('#roomCount');
  roomCount.change(function () {
    switch (roomCount.val()) {
      case "1":
        $('.h-room-1, .h-room-2, .h-room-3, .h-room-4, .h-room-5, .h-room-6, .h-room-7, .h-room-8').hide();
        $('.h-room-1').show();
        break;
      case "2":
        $('.h-room-3, .h-room-4, .h-room-5, .h-room-6, .h-room-7, .h-room-8').hide();
        $('.h-room-1, .h-room-2').show();
        break;
      case "3":
        $('.h-room-4, .h-room-5, .h-room-6, .h-room-7, .h-room-8').hide();
        $('.h-room-1, .h-room-2, .h-room-3').show();
        break;
      case "4":
        $(' .h-room-5, .h-room-5, .h-room-6, .h-room-7, .h-room-8').hide();
        $('.h-room-1, .h-room-2, .h-room-3, .h-room-4').show();
        break;
      case "5":
        $('.h-room-6, .h-room-7, .h-room-8').hide();
        $('.h-room-1, .h-room-2, .h-room-3, .h-room-4, .h-room-5').show();
        break;
      case "6":
        $('.h-room-7, .h-room-8').hide();
        $('.h-room-1, .h-room-2, .h-room-3, .h-room-4, .h-room-5, .h-room-6').show();
        break;
      case "7":
        $('.h-room-8').hide();
        $('.h-room-1, .h-room-2, .h-room-3, .h-room-4, .h-room-5, .h-room-6, .h-room-7').show();
        break;
      case "8":
        $('.h-room-1, .h-room-2, .h-room-3, .h-room-4, .h-room-5, .h-room-6, .h-room-7, .h-room-8').show();
        break;
    }
    checkPersonCount(roomCount.val())
  });
  $('.room-list select').change(function () {
    checkPersonCount(roomCount.val())
  });

  $('.passenger-count .dropdown-menu :input, .passenger-count .dropdown-menu').on('focus click blur', function (e) {
    e.stopPropagation();
  });
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  function checkPersonCount(roomCount) {
    var totalPersons = 0; // Toplam yetişkin
    var totalChilds = 0; // Toplam çocuk
    var totalBabies = 0; // Toplam bebek
    var tax = 1.18; // KDV (%18)
    var userPerPrice = parseInt($('.price').data('value')); // Kişi başı fiyat (kursuz)

    $("#hroom1:visible option:selected, #hroom2:visible option:selected, #hroom3:visible option:selected, #hroom4:visible option:selected, #hroom5:visible option:selected, #hroom6:visible option:selected, #hroom7:visible option:selected, #hroom8:visible option:selected").each(function () {
      totalPersons += Number($(this).val());
    });
    $("#croom1:visible option:selected, #croom2:visible option:selected, #croom3:visible option:selected, #croom4:visible option:selected, #croom5:visible option:selected, #croom6:visible option:selected, #croom7:visible option:selected, #croom8:visible option:selected").each(function () {
      totalChilds += Number($(this).val());
    });
    $("#broom1:visible option:selected, #broom2:visible option:selected, #broom3:visible option:selected, #broom4:visible option:selected, #broom5:visible option:selected, #broom6:visible option:selected, #broom7:visible option:selected, #broom8:visible option:selected").each(function () {
      totalBabies += Number($(this).val());
    });
    $('.hotel-room-count').text(roomCount + " oda, " + totalPersons + " yetişkin " + totalChilds + " çocuk " + totalBabies + " bebek");
    $('.summary-total-price').text(numberWithCommas(userPerPrice * tax * totalPersons)); // Kişi başı fiyatla (kdv dahil) toplam kişiyi çarptık

    $("#hotelRoomCount").val(roomCount);
    $("#hotelAdultCount").val(totalPersons);
    $("#hotelChildCount").val(totalChilds);
    $("#hotelBabyCount").val(totalBabies);
  }
});