<template>
  

      <div id="map"></div>


</template>

<script>
import $Scriptjs from 'scriptjs';
import { eventBus } from '@/event-bus.js';

export default {
  name: "Map",

  data() {
    return {
      map: null,
      marker: null,
      lastLat: null,
      lastLng: null,

      getNextPage: null,

      // center around the Upper West Side, NYC
      DEFAULT_LAT: 24.774265,
      DEFAULT_LNG: 	46.738586,

      geocoder: null,
      placesService: null,

      mapGoogleGeometryMultiPoly: null,
      mapNumGeometries: 0
    }
  },

  mounted: function() {

    // use your own key...
    $Scriptjs("https://maps.googleapis.com/maps/api/js?key=AIzaSyDy3-Dq5Ast3DYAzaTEkeuSZxP_4rKPiAA&libraries=geometry,places", () => {
      this.initMap();
    });

    eventBus.$on('newTextAddress', (payload) => {
      this.updateFromTextAddress(payload);
    });

    eventBus.$on('sendCityData', (payload) => {
      this.renderCityMap(payload.coordinates);
      this.setDataLayer(payload.multiPoly, payload.numGeometries);
    })

    eventBus.$on('launchKeywordSearch', (payload) => {
      this.doKeywordSearch(payload);
    })
  },

  methods: {
    // simple way to sleep..
    wait (timeout) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, timeout)
      })
    },

    setDataLayer(googleGeometryMultiPoly, numGeometries) {
      this.mapGoogleGeometryMultiPoly = googleGeometryMultiPoly;
      this.mapNumGeometries = numGeometries;
    },


    updateFromTextAddress(payload) {
 this.map.setCenter(payload.geometry.location);
      this.updateMarker(payload.geometry.location);
      this.lastLat = payload.geometry.location.lat();
      this.lastLng = payload.geometry.location.lng();
    },


    renderCityMap(myCityData) {
      myCityData.setMap(this.map);

      // and pass clicks on to the underlying map
      myCityData.addListener('click', (event) => {
        window.google.maps.event.trigger(this.map, 'click', event);
      });
    },


    initMap() {
      this.geocoder = new window.google.maps.Geocoder();
      this.map = new window.google.maps.Map(document.getElementById("map"), {
        center: {
          lat: this.DEFAULT_LAT,
          lng: this.DEFAULT_LNG
        },
        zoom: 15,
        gestureHandling: "greedy"
      });
      var myLatlng = {lat:this.DEFAULT_LAT , lng:this.DEFAULT_LNG }
       let marker = new window.google.maps.Marker({
      position: myLatlng,
   
    });
        
    marker.setMap(this.map);
      // now we can init other things that depend on Google being loaded
      // tell the event bus
      eventBus.$emit('googleInit', {});
    },

    updateMarker(latLng) {
      if (!this.marker) {
        this.marker = new window.google.maps.Marker({
          map: this.map
        });
      }

      this.marker.setPosition(latLng);
    },

    searchResultMarkers(results) {
      // if we have not pulled in City Boundaries, this is our default
      let filteredresults = results;

      if (this.mapNumGeometries > 0 && this.mapGoogleGeometryMultiPoly) {
        filteredresults = [];

        results.map((curPlace) => {          
          for (let i = 0; i < this.mapNumGeometries; i++) {
            if (window.google.maps.geometry.poly.containsLocation(
              curPlace.geometry.location,
              this.mapGoogleGeometryMultiPoly [i]) == true) {
                filteredresults.push(curPlace);
            }
          }
        });
      }
      //
      // filteredresults.map((place) => {
      //   let image = {
      //     url: place.icon,
      //     size: new window.google.maps.Size(71, 71),
      //     origin: new window.google.maps.Point(0, 0),
      //     anchor: new window.google.maps.Point(0, 0),
      //     scaledSize: new window.google.maps.Size(15, 15)
      //   };
      //
      //   let marker = new window.google.maps.Marker({
      //     map: this.map,
      //     icon: image,
      //     title: place.name,
      //     position: place.geometry.location
      //   });
      // })
    },


    doSearch(params) {
      // yeah, I know, using _this ...
      // I really dont like how Google sets up pagination for this (compared to Yelp and others)
      // I should write this as a var pointing to a function definition etc...
      let _this = this;

      // see https://developers.google.com/maps/documentation/javascript/examples/place-search-pagination
      this.placesService.nearbySearch(params,
        async function (results, PlacesServiceStatus, PlaceSearchPagination) {

          if (PlacesServiceStatus !== 'OK') return;

          _this.searchResultMarkers(results);

          if (PlaceSearchPagination.hasNextPage) {
            // slight pause...
            await _this.wait(100); 
            _this.getNextPage = PlaceSearchPagination.hasNextPage && function() {
              PlaceSearchPagination.nextPage();
            }
          } else {  // null this so that we dont double up on api calls
            _this.getNextPage = null;
          }

          // invoke...
          if (_this.getNextPage) {
            _this.getNextPage();
          }
        }
      );
    },

    googlePlacesSearch(keyword, radius = 1000) {

      if (!keyword.trim()) return;

      let params = {
        location: new window.google.maps.LatLng(this.lastLat, this.lastLng),
        radius: radius,
        keyword: keyword
      };

      this.doSearch(params);
      console.log(params)
    },

    doKeywordSearch(keyword) {
      // one could expand here to search other services besides Google...
      this.googlePlacesSearch(keyword, 500);
    }
  }
}
</script>

<style>
#map {
  width: 100%;
  height: 80%;
}
</style>






 
