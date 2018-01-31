
require("styles/style.less");
require("bootstrap");
require("modules/jqcloud2/dist/jqcloud.js");

import skills from "../json/skills.json";

import $  from 'jquery';
import _ from 'lodash';



$(document).ready(function() {

    let mapOfSkills = {} ;
    mapOfSkills["all"] = []
    _.each(skills.data,function (skill) {
        mapOfSkills[skill.title] = []
        _.each(skill.data,function (data) {
            let sk = {
                text : data[1]
                , weight : data[0]
            };
            mapOfSkills["all"].push(sk);
            mapOfSkills[skill.title].push(sk);

        });
    });
    const $modal = $("#myModal");

    initModal($modal,mapOfSkills)

});


function initModal($modal, mapOfSkills) {
    const $cloude = $("[data-cloud]") ;

    let cloudejQCloud;

    $modal.on('shown.bs.modal', function (event) {

        let button = $(event.relatedTarget)
            , data =  button.data('skills');
        cloudejQCloud = $cloude.jQCloud(mapOfSkills[data],{
            width: 720 ,
            height: 400
        });

    });


    $modal.on('hide.bs.modal', function (event) {
        if (typeof cloudejQCloud === "object"){
            cloudejQCloud.jQCloud("destroy");
        }
    });
}
