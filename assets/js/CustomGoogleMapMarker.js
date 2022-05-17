'use strict';

/*
 * ===========================================================
 * GOOGLE MAPS - FRAMEWORK Y
 * ===========================================================
 * Google Maps script for show Google maps in different ways
 * The script require maps.googleapis.com/maps/api/js script
 * Documentation: www.framework-y.com/components/components.html#google-maps
 *
 * Pixor - Copyright (c) Federico Schiocchet - Pixor - Framework Y
 */

! function(e) {
    function t(t) {
        var r = {};
        return r.coords = e(t).attr("data-coords"), r.address = e(t).attr("data-address"), r.marker = e(t).attr("data-marker"), r["marker-pos"] = e(t).attr("data-marker-pos"), r["marker-pos-top"] = e(t).attr("data-marker-pos-top"), r["marker-pos-left"] = e(t).attr("data-marker-pos-left"), r.skin = e(t).attr("data-skin"), r.zoom = e(t).attr("data-zoom"), isEmpty(r.zoom) && (r.zoom = 12), isEmpty(r["marker-pos-top"]) && (r["marker-pos-top"] = 0), isEmpty(r["marker-pos-left"]) && (r["marker-pos-left"] = 0), r
    }

    function r(r) {
        var l, s, a = t(r),
            i = parseFloat(a.coords.split(",")[0]),
            y = parseFloat(a.coords.split(",")[1]);
        l = new google.maps.Geocoder;
        var p = new google.maps.LatLng(i, y),
            n = {
                zoom: parseInt(a.zoom, 10),
                scrollwheel: !1,
                center: p
            };
        s = new google.maps.Map(r.get(0), n), isEmpty(a.skin) || s.setOptions({
            styles: o[a.skin]
        });
        var f = {
            position: p,
            map: s
        };
        isEmpty(a.marker) || (f = {
            position: p,
            map: s,
            icon: a.marker
        });
        var m = (new google.maps.Marker(f), 0 - a["marker-pos-left"]),
            g = 0 - a["marker-pos-top"];
        if (!isEmpty(a["marker-pos"]) && e(window).width() > 993) {
            var T = a["marker-pos"];
            "col-md-6-right" == T ? m -= 1 * e(".col-md-6").outerWidth() / 2 : "col-md-6-left" == T ? m += e(".col-md-6").outerWidth() / 2 : "center-bottom" == T ? g = g - 1 * e(r).outerHeight() / 4 - 30 : "center-top" == T && (g = g + e(r).outerHeight() / 2 - 60)
        }(e(window).width() > 993 || isEmpty(T)) && s.panBy(m, g)
    }

    function l(l) {
        var o, s = t(l);
        o = new google.maps.Geocoder, o.geocode({
            address: s.address
        }, function(t, o) {
            o == google.maps.GeocoderStatus.OK && (e(l).attr("data-coords", t[0].geometry.location.lat() + "," + t[0].geometry.location.lng()), r(l))
        })
    }
    e.fn.googleMap = function(o) {
        if ("initialized" != e(this).attr("data-trigger")) {
            var s = t(this);
            isEmpty(s.coords) ? l(this) : r(this), e(this).attr("data-trigger", "initialized")
        }
    }, e(document).ready(function() {
        e(".google-map").each(function(t) {
            "manual" != e(this).attr("data-trigger") && e(this).googleMap()
        })
    });
    var o = {
        gray: [{
            featureType: "water",
            elementType: "geometry",
            stylers: [{
                color: "#e9e9e9"
            }, {
                lightness: 17
            }]
        }, {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{
                color: "#f5f5f5"
            }, {
                lightness: 20
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                color: "#ffffff"
            }, {
                lightness: 17
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#ffffff"
            }, {
                lightness: 29
            }, {
                weight: .2
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [{
                color: "#ffffff"
            }, {
                lightness: 18
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [{
                color: "#ffffff"
            }, {
                lightness: 16
            }]
        }, {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{
                color: "#f5f5f5"
            }, {
                lightness: 21
            }]
        }, {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{
                color: "#dedede"
            }, {
                lightness: 21
            }]
        }, {
            elementType: "labels.text.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#ffffff"
            }, {
                lightness: 16
            }]
        }, {
            elementType: "labels.text.fill",
            stylers: [{
                saturation: 36
            }, {
                color: "#333333"
            }, {
                lightness: 40
            }]
        }, {
            elementType: "labels.icon",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{
                color: "#f2f2f2"
            }, {
                lightness: 19
            }]
        }, {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers: [{
                color: "#fefefe"
            }, {
                lightness: 20
            }]
        }, {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#fefefe"
            }, {
                lightness: 17
            }, {
                weight: 1.2
            }]
        }],
        black: [{
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{
                saturation: 36
            }, {
                color: "#000000"
            }, {
                lightness: 40
            }]
        }, {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#000000"
            }, {
                lightness: 16
            }]
        }, {
            featureType: "all",
            elementType: "labels.icon",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers: [{
                color: "#000000"
            }, {
                lightness: 20
            }]
        }, {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#000000"
            }, {
                lightness: 17
            }, {
                weight: 1.2
            }]
        }, {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{
                color: "#000000"
            }, {
                lightness: 20
            }]
        }, {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{
                color: "#000000"
            }, {
                lightness: 21
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                color: "#000000"
            }, {
                lightness: 17
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#000000"
            }, {
                lightness: 29
            }, {
                weight: .2
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [{
                color: "#000000"
            }, {
                lightness: 18
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [{
                color: "#000000"
            }, {
                lightness: 16
            }]
        }, {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{
                color: "#000000"
            }, {
                lightness: 19
            }]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [{
                color: "#000000"
            }, {
                lightness: 17
            }]
        }],
        green: [{
            featureType: "water",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                color: "#aee2e0"
            }]
        }, {
            featureType: "landscape",
            elementType: "geometry.fill",
            stylers: [{
                color: "#abce83"
            }]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{
                color: "#769E72"
            }]
        }, {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#7B8758"
            }]
        }, {
            featureType: "poi",
            elementType: "labels.text.stroke",
            stylers: [{
                color: "#EBF4A4"
            }]
        }, {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{
                visibility: "simplified"
            }, {
                color: "#8dab68"
            }]
        }, {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "simplified"
            }]
        }, {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#5B5B3F"
            }]
        }, {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{
                color: "#ABCE83"
            }]
        }, {
            featureType: "road",
            elementType: "labels.icon",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [{
                color: "#A4C67D"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [{
                color: "#9BBF72"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{
                color: "#EBF4A4"
            }]
        }, {
            featureType: "transit",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#87ae79"
            }]
        }, {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers: [{
                color: "#7f2200"
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "administrative",
            elementType: "labels.text.stroke",
            stylers: [{
                color: "#ffffff"
            }, {
                visibility: "on"
            }, {
                weight: 4.1
            }]
        }, {
            featureType: "administrative",
            elementType: "labels.text.fill",
            stylers: [{
                color: "#495421"
            }]
        }, {
            featureType: "administrative.neighborhood",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }]
    }
}(jQuery);