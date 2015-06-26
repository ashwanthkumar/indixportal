_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

var itemsTemplateGen = _.template($("#items-template").html());
var itemsWrapperGen = _.template($("#items-wrap").html());
var groupTemplateGen = _.template($("#group-template").html());

function generateTemplate (data) {
  return _.reduce(data.groups, function(soFar, group) {
    var itemsTemplate = _.reduce(group.items, function(templateSoFar, item) {
      return templateSoFar + itemsTemplateGen(item);
    }, "");
    group["itemsTemplate"] = itemsWrapperGen({items: itemsTemplate});
    return soFar + groupTemplateGen(group);
  }, "");
}

$.get("https://script.googleusercontent.com/a/macros/indix.com/echo?user_content_key=ix14U_98nwpTjrzxBS0J4uHlsipCAlivoRgsNJ2T9OsMKpx3r5L6gRNu_fDaX8dlZcH-48f1-V57pV4NkNtrp-F7Dph9m2q1OJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKAbpcsvj79PY45xQJLnggV4uoPl21K6h8UfESZvgA3ZJDyjrsucrUfnCL8ADGT3SjlwfULdosMzN11Pq-cRGx_DHI9QQN6bQRBuqn16KOTrtjLF8LUx6d-DhYw7Yd8G4FuGy7awUCLfXIU_TrAimchKJobUidNbrslf5_csTV8Jmw&lib=MLU8DkTSmRu6kkyoC9rTirXqXYF49Zf1f")
  .done(function(data){
    $( ".body" ).append(
            generateTemplate( data )
        );
  });