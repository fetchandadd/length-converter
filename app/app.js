/**
 * Copyright (C) 2015  Tim Tegeler
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 */

'use strict';

angular.module('length-converter', []).controller('calculater', function ($scope) {

    $scope.decimalPlaces = "4";
    $scope.signedIn = null;
    $scope.commaReplaced = false;

    $scope.signIn = function (id) {
        if($scope.calculator[id].$valid && $scope.calculator[id].$dirty) {
            $scope.signedIn = id;
        }
    };

    $scope.isSignedIn = function (id) {
        return id == $scope.signedIn;
    };

    function signedInAndDirty(id){
        return $scope.isSignedIn(id) && $scope.calculator[id].$dirty;
    }

    $scope.isSignedInAndValid = function(id){
       return $scope.calculator[id].$valid && signedInAndDirty(id);
    };

    $scope.isSignedInAndNotValid = function(id){
        return !$scope.calculator[id].$valid && signedInAndDirty(id);
    };

    $scope.calculate = function () {
        if ($scope.signedIn == "mm") $scope.calc($scope.replaceComma($scope.mm));
        if ($scope.signedIn == "cm") $scope.calc($scope.fromCmToMm($scope.replaceComma($scope.cm)));
        if ($scope.signedIn == "dpt") $scope.calc($scope.fromDptToMm($scope.replaceComma($scope.dpt)));
        if ($scope.signedIn == "ppt") $scope.calc($scope.fromPptToMm($scope.replaceComma($scope.ppt)));
        if ($scope.signedIn == "pt") $scope.calc($scope.fromPtToMm($scope.replaceComma($scope.pt)));
        if ($scope.signedIn == "inch") $scope.calc($scope.fromInchToMm($scope.replaceComma($scope.inch)));
        if ($scope.signedIn == "q") $scope.calc($scope.fromQToMm($scope.replaceComma($scope.q)));
    };

    $scope.clear = function () {
        $scope.mm = null;
        $scope.cm = null;
        $scope.dpt = null;
        $scope.ppt = null;
        $scope.pt = null;
        $scope.inch = null;
        $scope.q = null;
        $scope.signedIn = null;
    };
    $scope.clear();

    $scope.calc = function (mm) {

        $scope.mm = $scope.replaceDot($scope.round(mm));
        $scope.cm = $scope.replaceDot($scope.round($scope.fromMmToCm(mm)));
        $scope.dpt = $scope.replaceDot($scope.round($scope.fromMmToDpt(mm)));
        $scope.ppt = $scope.replaceDot($scope.round($scope.fromMmToPpt(mm)));
        $scope.pt = $scope.replaceDot($scope.round($scope.fromMmToPt(mm)));
        $scope.inch = $scope.replaceDot($scope.round($scope.fromMmToInch(mm)));
        $scope.q = $scope.replaceDot($scope.round($scope.fromMmToQ(mm)));
    };

    $scope.replaceComma = function(value){
        if(value.indexOf(",") !== -1){
            $scope.commaReplaced = true;
            value = value.replace(",", ".");
        }else{
            $scope.commaReplaced = false;
        }
        return value;
    };

    $scope.replaceDot = function(value){
        value = value.toString();
        if($scope.commaReplaced){
            value = value.replace(".", ",");
        }
        return value
    };

    $scope.round = function (number) {
        var factor = $scope.factorForRound($scope.decimalPlaces);
        return Math.round(number * factor) / factor;
    };

    $scope.factorForRound = function (decimalPlaces) {
        var factor = 1;
        for (var i = 0; i < decimalPlaces; i++) {
            factor *= 10;
        }
        return factor;
    };

    $scope.isFormEmpty = function () {
        return !($scope.mm != null|| $scope.cm != null || $scope.dpt != null || $scope.pt != null || $scope.inch != null || $scope.q != null);
    };

    $scope.fromMmToCm = function (mm) {
        return mm / 10;
    };

    $scope.fromMmToDpt = function (mm) {
        return mm / 0.376;
    };

    $scope.fromMmToPpt = function (mm) {
        return mm / 0.351;
    };

    $scope.fromMmToPt = function (mm) {
        return mm / 0.3527;
    };

    $scope.fromMmToInch = function (mm) {
        return mm / 25.4;
    };

    $scope.fromMmToQ = function (mm) {
        return mm / 0.25;
    };

    $scope.fromCmToMm = function (cm) {
        return cm * 10;
    };

    $scope.fromDptToMm = function (dpt) {
        return dpt * 0.376;
    };

    $scope.fromPptToMm = function (ppt) {
        return ppt * 0.351;
    };

    $scope.fromPtToMm = function (pt) {
        return pt * 0.3527;
    };

    $scope.fromInchToMm = function (inch) {
        return inch * 25.4;
    };

    $scope.fromQToMm = function (q) {
        return q * 0.25;
    };

}).directive('selectOnClick', ['$window', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                if (!$window.getSelection().toString()) {
                    // Required for mobile Safari
                    this.setSelectionRange(0, this.value.length)
                }
            });
        }
    };
}]);