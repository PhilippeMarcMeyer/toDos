
(function () {
    'use strict'
    moment.tz.add([
		"Europe/Paris|PMT WET WEST CEST CET WEMT|-9.l 0 -10 -20 -10 -20|0121212121212121212121212121212121212121212121212123434352543434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434|-2nco8.l cNb8.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 1u00 10o0 1io0 1wo0 Rc0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Df0 Ik0 5M30 WM0 1fA0 1cM0 Vx0 hB0 1aq0 16M0 1ekn0 1cL0 1fC0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e6"
    ]);

    //glyphicon glyphicon-pause,play,stop
    // Setting the 
    window.workManager = function () {
        var who = "Philippe";
        var app = "#app";
        var tableInner = "#mainTable";
        var errorMessage = "";
        var model = {};
        var showDone = false;
        var ajax_default_settings = {
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
        };
        return {
            do: function (whatToDo, param1) {
                var self = this;
                if (whatToDo == 'search') {
                    var what = "";
                    if (param1) {
                        what = param1;
                    }
                    if (what != "") {

                        self.do('getSearch', what);
                    } else {
                        self.do('getData');
                    }
                }
                if (whatToDo == 'init') {
                    self.do('getData');
                }
                if (whatToDo == 'getShowDone') {
                    return showDone;
                }
                if (whatToDo == 'setShowDone') {
                    showDone = param1;
                    $("#search").trigger('change');
                }
                else if (whatToDo == 'drawTable') {
                    $(tableInner).html("");
             
                    var caption = model.caption;
                    var headers = model.headers;
                    var types = model.types;
                    var data = model.data;
                    var props = model.props;

                    var captionHtml = caption + "<span style='float:right;font-size:12px;font-weight:normal'><input  type='checkbox' id='toggleDoneView'> Montrer les tâches archivées <span>";
                    $(app).find("#caption").html(captionHtml);
                    $("#toggleDoneView").attr("checked", showDone)
                    $("#toggleDoneView").on("click", function () {
                        self.do('setShowDone', this.checked);
                    });
                 

                    // Drawing headers
                    var html = " <thead class='thead-dark'><tr>"
                    for (var i = 0; i < headers.length; i++) {
                        html += "<th scope='col'>" + headers[i] + "</th>";
                    }
                    html += "</tr> </thead> <tbody id='callModal'>"
                    // Drawing rows and cells
                    for (var i = 0; i < data.length; i++) {
                        var rowIsDone = false;
                        var rowIsPause = (data[i].Status == "En pause");
                        var line = "<tr #tag#>"
                        var keys = Object.keys(data[i]);
                        var nrProp = keys.length;
                        if (nrProp > 0) {
                            var id = data[i].Id;
                            for (var j = 0; j < props.length; j++) {
                                var item = data[i][props[j]];
                                var type = types[j];
                                //  job.Duration = (span.Days * 480) + (span.Hours * 60) + span.Minutes;
                                if (props[j] == "Duration" || props[j] == "Planned") {
                                    if (item == null) item = "0";
                                    var minutes = parseInt(item);
                                    if (minutes != 0) {
                                        var response = SplitTime(minutes);
                                       // item = response.d != 0 ? response.d + "d" : "";
                                        item = response.h != 0 ? response.h + "h " : "";
                                        item += response.m != 0 ? response.m + "m" : "";
                                        type = "string";
                                    }
                                }
                                if (item == null) {
                                    if (type == "boolean") {
                                        item = false;

                                    } else {

                                        item = "";
                                        type = "string";
                                    }

                                }
                                if (type == "datetime") {
                                    item = new Date(parseInt(item.substring(6, 19))).toLocaleString();

                                }
                                else if (type == "boolean") {

                                    var checked = "";
                                    if (item) {
                                        checked = "checked";
                                        if (props[j] == "Done") {
                                            rowIsDone = true;
                                        } 
                                    }
                                    item = "<input class='done' type='checkbox' " + checked + " id='_" + id + "'>";
                                }
                              //  if (rowIsDone) Appraisal_Str
                                        line += "<td>" + item + "</td>";
                            }

                            line += "</tr>";

                            if (rowIsDone) 
                                line = line.replace("#tag#", "class='done'");
                            else if (rowIsPause)
                                line = line.replace("#tag#", "class='pause'");
                            else
                                line = line.replace("#tag#", "");

                            if (!showDone && rowIsDone) {
                                line = "";
                            }
                             html += line;

                        } 
                            
                    }

                    html += " </tbody></table>";
                    $(tableInner).html(html);
                    self.do('forecastInfo');


                    $("#callModal").on('dblclick', 'tr', function (event) {
                        var target = event.currentTarget;
                        var id = parseInt(target.cells[0].innerHTML);
                        self.do('showModal', id);
                    });

                    $("#new").on('click', function () {
                        self.do('showModal');
                    });
             
                    $(".done").on('click', function (event) {
                        var id = this.id.replace("_", "");
                        if(id!=""){
                            var id = parseInt(id);
                            var done = this.checked;
                            var obj = {};
                            obj.Id = id;
                            obj.Done = done;
                            var json = JSON.stringify({ "info": obj });
                            var params = ajax_default_settings;
                            params.data = json;
                            var xhr = $.ajax("Main.aspx/ToggleDone", params)
                              .done(function (response) {
                                  var minutes = Math.abs(response.d);
                                  $("#Duration").val(minutes);
                                  var message = "temps cumulé : " + minutes + " m";
                                  $("#tempDuration").html(message);
                                 self.do('init');
                                 // self.do('drawTable');
                              })
                              .fail(function () {
                                  $("#alert-message").html("Echec");
                                  $('#alert').modal('show');
                              });
                            event.stopPropagation();
                        }
                    });

                }
                else if (whatToDo == 'forecastInfo') {
                    $("#forecastInfo").html("")
                    var info = "";
                    var data = model.data;
                    var toDoMinutes = 0;
                    var doneMinutes = 0;
                    for (var i = 0; i < data.length; i++) {
                        if (!data[i].Done) {
                            toDoMinutes += data[i].Planned != null ? data[i].Planned : 0;
                            doneMinutes += data[i].Duration != null ? data[i].Duration : 0;
                        }
                    }
                    var time = SplitTime(toDoMinutes - doneMinutes);
                    info = time.d > 0 ? time.d + " j. " : "";
                    info += time.h > 0 ? time.h + " h. " : "";
                    info += time.m > 0 ? time.m + " m." : "";
                    if (info != "") info = "Reste à faire : " + info;
                    $("#forecastInfo").html(info);
                }
                else if (whatToDo == 'showModal') {
                    var id = -1;
                    if (param1) {
                        id = param1;
                    }
                    $("#pause").hide();
                    $("#reprise").hide();

                    $("#Id").val(id);
                    var now = new Date();
                    var differenceFuseauxEnMinutes = now.getTimezoneOffset();
                    now.setTime(now.getTime() - (differenceFuseauxEnMinutes * 60000));
                    var now = now.toISOString().split(".")[0];
                    $("#tempDuration").html("");
                    $("#Begin").val(now);
                    $("#Description").val("");
                    $("#End").val("");
                    $("#Reference").val("");
                    $("#Notes").val("");
                    $("#Duration").val(0);
                    $("#Planned").val(0);
                    $("#Done").val(false);
                    $("#Branch").val("");
                    $("#Appraisal").html = "";
                    var html = "";
                    for (var i = 0; i < model.appraisal.length; i++) {
                        html += "<option value='" + model.appraisal[i].EnumValue + "'>" + model.appraisal[i].EnumDisplayName + "</option>";
                    }
                    $("#Appraisal").html(html);
                    $("#AppraisalNote").val("");
                    $("#showFiles").html("");
                    $("#fileDescription").val("");
                    if (id != -1) {
                        var aRow = model.data;
                        for (var i = 0; i < aRow.length; i++) {
                            if (aRow[i].Id == id) {
                                $("#Id").val(id);
                                if (aRow[i].Begin) {
                                    var begin = new Date(parseInt(aRow[i].Begin.substring(6, 19))).toISOString();
                                    begin = isoToLocalTime(begin);
                                    $("#Begin").val(begin);
                                }
                                if (aRow[i].End) {
                                    var end = new Date(parseInt(aRow[i].End.substring(6, 19))).toISOString();
                                    end = isoToLocalTime(end);
                                    $("#End").val(end);
                                }
                                $("#Description").val(aRow[i].Description.trim());
                                $("#Reference").val(aRow[i].Reference.trim());
                                $("#Duration").val(aRow[i].Duration);
                                $("#Planned").val(aRow[i].Planned);
                                $("#Done").val(aRow[i].Done);
                                $("#Notes").val(ReplaceNewline(aRow[i].Notes.trim()));
                                $("#Branch").val(aRow[i].Branch.trim());
                                $("#AppraisalNote").val(aRow[i].AppraisalNote.trim());
                               
                                var html = "";

                                if (aRow[i].Files.length != 0) {
                                    for (var j = 0; j < aRow[i].Files.length; j++) {
                                        if (aRow[i].Files[j].Description)
                                            html += "<h5>" + aRow[i].Files[j].Description + "</h5>";
                                        html += "<img onmousedown='imgClickHandler(event,this);'' class='uploadedPicture' id='img_" + aRow[i].Files[j].Id + "' src='" + aRow[i].Files[j].Filename + "'/><br />";
                                    }

                                    $("#showFiles").html(html);
                                }

                                var appraisal = aRow[i].Appraisal == null ? 0 : aRow[i].Appraisal;
                                $("#Appraisal").val(appraisal);

                                if (aRow[i].Status == "En cours") {
                                    $("#pause").show();
                                    $("#reprise").hide();
                                }
                                if (aRow[i].Status == "En pause") {
                                    $("#pause").hide();
                                    $("#reprise").show();
                                }
                            }
                        }
                    }
                    if (id == -1) {
                        $("#delete").hide();
                        $("#saveAndStay").hide();
                    } else {
                        $("#delete").show();
                        $("#saveAndStay").show();

                    }

                    $("#save").attr('disabled', false);


                    $("#pause, #reprise").on('click', function (event) {
                        var caller = this.id;
                        var id = $("#Id").val();
                        if (id != "") {
                            var id = parseInt(id);
                            var obj = {};
                            obj.Id = id;
                            var json = JSON.stringify({ "info": obj });
                            var params = ajax_default_settings;
                            params.data = json;
                            var xhr = $.ajax("Main.aspx/TogglePause", params)
                              .done(function (response) {
                                  self.do('init');
                                  if (caller == "pause") {
                                      $("#pause").hide();
                                      $("#reprise").show();
                                  } else {
                                      $("#pause").show();
                                      $("#reprise").hide();
                                  }
                                  if (response != null) {
                                      var minutes = Math.abs(response.d);
                                      $("#Duration").val(minutes);
                                      var message = "temps cumulé : " + minutes + " m";
                                      $("#tempDuration").html(message);
                                  }
                              })
                              .fail(function () {
                                  $('#myModal').find('.close').trigger("click");
                                  $("#alert-message").html("Echec");
                                  $('#alert').modal('show');
                              });
                            event.stopPropagation();
                        }
                    });


                    $('#myModal').modal('show');
                }
                else if (whatToDo == 'getModel') {
                    return model;
                }
                else if (whatToDo == 'getData') {
                    errorMessage = "";
                    var params = ajax_default_settings;
                    var xhr = $.ajax("Main.aspx/GetWork", params)
                       .done(function (response) {
                           model = response.d;
                           self.do('drawTable');
                       })
                       .fail(function () {
                           errorMessage = "An error occured..";
                           self.do('showError');

                       });
                }
                else if (whatToDo == 'getSearch') {
                    var what = param1;
                    errorMessage = "";
                    var json = JSON.stringify({ "searchFor": what });
                    var params = ajax_default_settings;
                    params.data = json;
                    var xhr = $.ajax("Main.aspx/GetSearch", params)
                       .done(function (response) {
                           model = response.d;
                           self.do('drawTable');
                       })
                       .fail(function () {
                           errorMessage = "An error occured..";
                           self.do('showError');

                       });
                }
                else if (whatToDo == 'showError') {
                    $(tableInner).html(errorMessage);

                }


            }

        }

        
    }
}());

function ReplaceNewline(input) {
     var newline = String.fromCharCode(13, 10);
     return ReplaceAll(input, "<br>", newline.toString());
 }
function ReplaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function isoToLocalTime(strIsoDate) {
    var greenwich = moment(strIsoDate);
    var paris = greenwich.clone().tz("Europe/Paris");
    return paris.format().split("+")[0];;
}
function SplitTime(numberOfMinutes) {
    var hours = Math.floor(numberOfMinutes / 60);
    var remainder = numberOfMinutes % 60;
    var minutes = remainder;
    return ({ "d": 0, "h": hours, "m": minutes })
}

function imgClickHandler(e,that) {
 
        var test = document.getElementById("hiddenIdentity");
        if (test) {
            test.value = that.id;
            $(".confirm").show();
        } else {
            var aDiv = document.createElement("div");
            aDiv.setAttribute("class", "confirm");
            var hiddenIdentity = document.createElement("input");
            hiddenIdentity.setAttribute("type", "hidden");
            hiddenIdentity.setAttribute('id', 'hiddenIdentity');
            hiddenIdentity.setAttribute('value', that.id);
            aDiv.appendChild(hiddenIdentity);
            var aTitle = document.createElement("h5");
            var txt = document.createTextNode("Supprimer cette image ?");
            aTitle.appendChild(txt);
            aDiv.appendChild(aTitle);

            var elem = document.createElement("button");
            elem.setAttribute('onclick', 'supprImg();');
            elem.setAttribute('class', 'btn btn-danger appliquer-button pull-right');
            var txt2 = document.createTextNode("Supprimer");
            elem.appendChild(txt2);
            aDiv.appendChild(elem);

            var elem2 = document.createElement("button");
            elem2.setAttribute('onclick', 'cancelSupprImg();');
            elem2.setAttribute('class', 'btn btn-primary appliquer-button pull-left');
            var txt3 = document.createTextNode("Annuler");
            elem2.appendChild(txt3);
            aDiv.appendChild(elem2);

            //showFiles
            document.getElementById("showFiles").appendChild(aDiv);
        }

        return false;


}
function supprImg() {
    var ajax_default_settings = {
        type: "POST",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
    };
    $(".confirm").hide();
    var inputId = $("#hiddenIdentity").val();
    
    var id = parseInt(inputId.replace("img_", ""));
    
    var obj = {};
    obj.Id = id;

    var json = JSON.stringify({ "toDel": obj });
    var params = ajax_default_settings;
    params.data = json;
    var xhr = $.ajax("Main.aspx/DeleteImg", params)
       .done(function (response) {
           $(".confirm").hide();

           $("#" + inputId).remove();
       })
       .fail(function () {
           $(".confirm").hide();


       });

}
function cancelSupprImg() {
}