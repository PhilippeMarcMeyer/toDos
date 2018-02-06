
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

        SetListeners();


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

                    var captionHtml = caption ;

                    $("#toggleDoneView").attr("checked", showDone)
                    $("#toggleDoneView").on("click", function () {
                        self.do('setShowDone', this.checked);
                    });
                 

                    // Drawing headers
                    var html = " <thead class='thead-dark'><tr>"
                    for (var i = 0; i < headers.length; i++) {
                        html += "<th scope='col' data-translate='" + props[i] + "'>" + headers[i] + "</th>";
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
                                if (props[j] == "Duration" || props[j] == "Planned") {
                                    if (item == null) item = "0";
                                    var minutes = parseInt(item);
                                    if (minutes != 0) {
                                        var response = SplitTime(minutes);
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
                                    item = new Date(parseInt(item.substring(6, 19))).toLocaleString(culture); 

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

                                if (props[j] == "Status") {
                                    item = translate(item);
                                }
                                line += "<td class='" + props[j] + "'>" + item + "</td>";
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
                    setTimeout(function () {
                        getTranslations(userLang);
                    }, 300);
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
                    $("#filenamew").html(translate("nofile"));
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
                    $("#old-notew").html("");
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
                                            html += "<h5 id='label_" + aRow[i].Files[j].Id + "'>" + aRow[i].Files[j].Description;
                                        html += "<img src='img/delete.png' onmousedown='imgClickHandler(event,this);' id='del_" + aRow[i].Files[j].Id + "'/> </h5>";
                                            html += "<img class='uploadedPicture' id='img_" + aRow[i].Files[j].Id + "' src='" + aRow[i].Files[j].Filename + "'/><br />";
                                    }

                                    $("#showFiles").html(html)
                                }
                                var itemDate
                                if (aRow[i].ExtNotes.length > 0) {
                                    for (var j = 0; j < aRow[i].ExtNotes.length; j++) {
                                        itemDate = new Date(parseInt(aRow[i].ExtNotes[j].Creation.substring(6, 19))).toLocaleString();
                                        
                                        $("#old-notew").append("<b>" + itemDate + " : </b>" + aRow[i].ExtNotes[j].Body.trim() + "<hr>");
                                    }
                                }

                                var appraisal = aRow[i].Appraisal == null ? 0 : aRow[i].Appraisal;
                                $("#Appraisal").val(appraisal);

                                if (aRow[i].Status == "Running") {
                                    $("#pause").show();
                                    $("#reprise").hide();
                                }
                                if (aRow[i].Status == "Pending") {
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



var doDeleteWork = function () {
    var obj = {};
    obj.Id = $("#Id").val();
    $('#myModal').find('.close').trigger("click"); // closing the modal
    var json = JSON.stringify({ "toDel": obj });
    $.ajax({
        type: "POST",
        url: "Main.aspx/DeleteWork",
        contentType: "application/json; charset=utf-8",
        data: json,
        success: function (response) {
            $('#myModal').find('.close').trigger("click"); // closing the modal
            var toastMsg = new toast("toastMessage", "messageId", false);
            toastMsg.text("Suppression réussie !");
            var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            toastMsg.moveAt(w / 2 - 100, 90);
            toastMsg.showFor(3000);
            window.manager.do('init');

        },
        error: function (jqXHR, textStatus, errorThrown) {
            var str = jqXHR.responseText;
            var obj = JSON.parse(str);
            $('#myModal').find('.close').trigger("click"); // closing the modal
            $("#alert-message").html("Echec " + obj.Message);
            $('#alert').modal('show');
        } // end error
    }); // end ajax

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
    debugger
    var ajax_default_settings = {
        type: "POST",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
    };
    $(".confirm").hide();
    var inputId = $("#hiddenIdentity").val();
    
    var id = parseInt(inputId.replace("del_", ""));
    var imageId = inputId.replace("del_", "img_");
    var labelId = "label_" + id;
    var obj = {};
    obj.Id = id;

    var json = JSON.stringify({ "toDel": obj });
    var params = ajax_default_settings;
    params.data = json;
    var xhr = $.ajax("Main.aspx/DeleteImg", params)
       .done(function (response) {
           $(".confirm").hide();

           $("#" + inputId).remove();
           $("#" + imageId).remove();
           $("#" + labelId).remove();
           window.manager.do('init'); // specific to work : to improve to manage knowledges as well 
       })
       .fail(function () {
           $(".confirm").hide();
       });
}

function cancelSupprImg() {
    $(".confirm").hide();
}
function SetListeners() {
    $("#search").on('change', function () {
        window.manager.do('search', $("#search").val());
    });
    
    $("#files").on('change', function () {
        var image = $("#files").val();
        if (image.length == 0) {
            $("#filenamew").html(translate("nofile"));
        } else {
            var separator = (operatingSystem == "Windows") ? "\\" : "/";
            var arr = image.split(separator);
            if (arr.length > 0) image = arr[arr.length - 1];
            $("#filenamew").html(image);
        }
    });
    $("#saveAndClose,#saveAndStay").on('click', function (event) {
        var doCloseModal = (this.id === "saveAndClose")
        var image = $("#files").val();
        var description = $("#fileDescription").val();
        $(this).prop('disabled', true);
        var obj = {};
        obj.Description = $("#Description").val().trim();
        obj.Reference = $("#Reference").val().trim();
        obj.Duration = $("#Duration").val();
        obj.Planned = $("#Planned").val();
        obj.Begin = $("#Begin").val();
        obj.End = $("#End").val();
        obj.Id = $("#Id").val();
        obj.Notes = htmlEncode($("#Notes").val());
        obj.Notes = obj.Notes.replace(/[\n\r]/g, '<br>');
        obj.Branch = $("#Branch").val().trim();
        obj.Done = $("#Done").val() == "true" ? true : false;
        obj.Appraisal = $("#Appraisal").val();
        obj.AppraisalNote = $("#AppraisalNote").val();
        obj.NoExternalNote = (this.id == "saveAndStay");
        var json = JSON.stringify({ "toDo": obj });
        var self = this;
        $.ajax({
            type: "POST",
            url: "Main.aspx/AddWork",
            contentType: "application/json; charset=utf-8",
            async: true,
            data: json,
            success: function (response) {
                var toDoId = response.d;

                $(self).prop('disabled', false);
                if (image != "") {
                    upload("#files", image, toDoId, "work", description, doCloseModal);
                } else {
                    if (doCloseModal) {
                        $('#myModal').find('.close').trigger("click"); // closing the modal
                        var toastMsg = new toast("toastMessage", "messageId", false);
                        toastMsg.text("Mise à jour réussie !");
                        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                        toastMsg.moveAt(w / 2 - 100, 90);
                        toastMsg.showFor(3000);
                    } else {
                        var toastMsg = new toast("myModalMessage", "modalWorkMsgId", false);
                        toastMsg.text("Mise à jour réussie !");
                        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                        toastMsg.moveAt(350, 10);
                        toastMsg.showFor(3000);
                    }
                }

                window.manager.do('init');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                var str = jqXHR.responseText;
                var obj = JSON.parse(str);
                $('#myModal').find('.close').trigger("click"); // closing the modal

                $("#alert-message").html("Echec " + obj.Message);
                $('#alert').modal('show');
            } // end error
        }); // end ajax
    });
    $("#search").on('change', function () {
        window.manager.do('search', $("#search").val());
    });

    $("#showNotesw").on("click", function () {
        $("#row_notes").show();
        $("#row_images").hide();
    });

    $("#showImagesw").on("click", function () {
        $("#row_notes").hide();
        $("#row_images").show();
    });

    $('[data-toggle=confirmation2]').confirmation({
        rootSelector: '[data-toggle=confirmation2]',
        onConfirm: function () {
            doDeleteWork();
        },
    });
    $("#Position").on("change", function () {
        var doSend = false;
        var choice = $(this).val();
        var tagName = this.tagName.toLowerCase();
        if (tagName == "select") {
            var int_choice = parseInt(choice);
            if (!isNaN(int_choice)) {
                if (int_choice == -1) { // ask for a new value
                    doSend = true;
                    var parent = $(this).parent();
                    $(this).remove();
                    parent.append("<input type='text' value='' placeholder='Veuillez saisir' class='form-control' id='Position'/>");
                }
            }
        }
    });

}

var uploadMessage = function (msg, doCloseModal, modalId) {
    if (doCloseModal) {
        $('#' + modalId).find('.close').trigger("click"); // closing the modal
        var toastMsg = new toast("toastMessage", "messageId", false);
        toastMsg.text(msg);
        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        toastMsg.moveAt(w / 2 - 100, 90);
        toastMsg.showFor(3000);

    } else {
        var toastMsg = new toast(modalId + "Message", modalId + "Message_id", false);
        toastMsg.text(msg);
        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        toastMsg.moveAt(350, 10);
        toastMsg.showFor(3000);
    }


}

var upload = function (jqId, filename, id, concern, descript, doCloseModal) {
    var filename = $(jqId).val();
    var description = descript ? descript : "";
    if (id > 0 && filename != "" && concern != "" && jqId != "") {
        var data = { "Id": id, "concern": concern, "description": description };
        var toastMsg = new toast("toastMessage", "messageId", false);

        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        toastMsg.moveAt(w / 2 + 100, 90);
        //toastMsg.showFor(3000);

        $(jqId).simpleUpload("/DocumentsFileUpload.ashx", {
            data: data,
            allowedExts: ["jpg", "jpeg", "jpe", "jif", "jfif", "jfi", "png", "gif"],
            allowedTypes: ["image/pjpeg", "image/jpeg", "image/png", "image/x-png", "image/gif", "image/x-gif"],
            maxFileSize: 1048576, //1MB in bytes
            start: function (file) {
                this.block = $('<div class="block"></div>');
                this.progressBar = $('<div class="progressBar"></div>');
                this.block.append(this.progressBar);
                $('#uploads').append(this.block);
            },

            progress: function (progress) {
                this.progressBar.width(progress + "%");
            },

            success: function (data) {
                this.progressBar.remove();
                uploadMessage("Mise à jour et upload réussi !", doCloseModal, 'myModal');


            },

            error: function (error) {
                this.progressBar.remove();
                uploadMessage("Mise à jour réussie mais upload en échec...", doCloseModal, 'myModal');
            }

        });
    }
}

//$(function () {
//    $('#Begin').datetimepicker();
//    $('#End').datetimepicker({
//        useCurrent: false //Important! See issue #1075
//    });
//    $("#Begin").on("dp.change", function (e) {
//        $('#End').data("DateTimePicker").minDate(e.date);
//    });
//    $("#End").on("dp.change", function (e) {
//        $('#Begin').data("DateTimePicker").maxDate(e.date);
//    });
//});