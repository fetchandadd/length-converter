"use strict";angular.module("length-converter",[]).controller("calculater",["$scope",function(n){function o(o){return n.isSignedIn(o)&&n.calculator[o].$dirty}n.decimalPlaces="4",n.signedIn=null,n.commaReplaced=!1,n.signIn=function(o){n.calculator[o].$valid&&n.calculator[o].$dirty&&(n.signedIn=o)},n.isSignedIn=function(o){return o==n.signedIn},n.isSignedInAndValid=function(r){return n.calculator[r].$valid&&o(r)},n.isSignedInAndNotValid=function(r){return!n.calculator[r].$valid&&o(r)},n.calculate=function(){"mm"==n.signedIn&&n.calc(n.replaceComma(n.mm)),"cm"==n.signedIn&&n.calc(n.fromCmToMm(n.replaceComma(n.cm))),"dpt"==n.signedIn&&n.calc(n.fromDptToMm(n.replaceComma(n.dpt))),"ppt"==n.signedIn&&n.calc(n.fromPptToMm(n.replaceComma(n.ppt))),"pt"==n.signedIn&&n.calc(n.fromPtToMm(n.replaceComma(n.pt))),"inch"==n.signedIn&&n.calc(n.fromInchToMm(n.replaceComma(n.inch))),"q"==n.signedIn&&n.calc(n.fromQToMm(n.replaceComma(n.q)))},n.clear=function(){n.mm=null,n.cm=null,n.dpt=null,n.ppt=null,n.pt=null,n.inch=null,n.q=null,n.signedIn=null},n.clear(),n.calc=function(o){n.mm=n.replaceDot(n.round(o)),n.cm=n.replaceDot(n.round(n.fromMmToCm(o))),n.dpt=n.replaceDot(n.round(n.fromMmToDpt(o))),n.ppt=n.replaceDot(n.round(n.fromMmToPpt(o))),n.pt=n.replaceDot(n.round(n.fromMmToPt(o))),n.inch=n.replaceDot(n.round(n.fromMmToInch(o))),n.q=n.replaceDot(n.round(n.fromMmToQ(o)))},n.replaceComma=function(o){return-1!==o.indexOf(",")?(n.commaReplaced=!0,o=o.replace(",",".")):n.commaReplaced=!1,o},n.replaceDot=function(o){return o=o.toString(),n.commaReplaced&&(o=o.replace(".",",")),o},n.round=function(o){var r=n.factorForRound(n.decimalPlaces);return Math.round(o*r)/r},n.factorForRound=function(n){for(var o=1,r=0;n>r;r++)o*=10;return o},n.isFormEmpty=function(){return!(null!=n.mm||null!=n.cm||null!=n.dpt||null!=n.pt||null!=n.inch||null!=n.q)},n.fromMmToCm=function(n){return n/10},n.fromMmToDpt=function(n){return n/.376},n.fromMmToPpt=function(n){return n/.351},n.fromMmToPt=function(n){return n/.3527},n.fromMmToInch=function(n){return n/25.4},n.fromMmToQ=function(n){return n/.25},n.fromCmToMm=function(n){return 10*n},n.fromDptToMm=function(n){return.376*n},n.fromPptToMm=function(n){return.351*n},n.fromPtToMm=function(n){return.3527*n},n.fromInchToMm=function(n){return 25.4*n},n.fromQToMm=function(n){return.25*n}}]).directive("selectOnClick",["$window",function(n){return{restrict:"A",link:function(o,r,c){r.on("click",function(){n.getSelection().toString()||this.setSelectionRange(0,this.value.length)})}}}]);