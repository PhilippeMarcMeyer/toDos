
(function () {
    'use strict'
    moment.tz.add([
		"Europe/Paris|PMT WET WEST CEST CET WEMT|-9.l 0 -10 -20 -10 -20|0121212121212121212121212121212121212121212121212123434352543434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434|-2nco8.l cNb8.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 1u00 10o0 1io0 1wo0 Rc0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Df0 Ik0 5M30 WM0 1fA0 1cM0 Vx0 hB0 1aq0 16M0 1ekn0 1cL0 1fC0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e6"
    ]);

    //glyphicon glyphicon-pause,play,stop
    // Setting the 
    window.knowledgeManager = function () {
        var who = "Philippe";
        var app = "#appKnowledge";
        var tableInner = "#knowledgeTable";
        var errorMessage = "";
        var model = {};
        var showDone = false;
        var ajax_default_settings = {
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
        };

        SetKnowledgeListeners();

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
                else if (whatToDo == 'init') {
                    self.do('getData');
                }
                else if (whatToDo == 'drawTable') {
                    $(tableInner).html("");

                    var caption = model.caption;
                    var headers = model.headers;
                    var types = model.types;
                    var data = model.data;
                    var props = model.props;

                    var captionHtml = caption;
                    $(app).find("#caption").html(captionHtml);

                    // Drawing headers
                    var html = " <thead class='thead-dark'><tr>"
                    for (var i = 0; i < headers.length; i++) {
                        html += "<th scope='col'>" + headers[i] + "</th>";
                    }
                    html += "</tr> </thead> <tbody id='callModalk'>"
                    // Drawing rows and cells
                    for (var i = 0; i < data.length; i++) {
                        var rowIsDone = false;
                        var line = "<tr>"
                        var keys = Object.keys(data[i]);
                        var nrProp = keys.length;
                        if (nrProp > 0) {
                            var id = data[i].Id;
                            for (var j = 0; j < props.length; j++) {
                                var item = data[i][props[j]];
                                var type = types[j];
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
                                    }
                                    item = "<input class='done' type='checkbox' " + checked + " id='_" + id + "'>";
                                }
                                line += "<td>" + item + "</td>";
                            }
                            line += "</tr>";
                            html += line;
                        }
                    }
                    html += " </tbody>";
                    $(tableInner).html(html);
                    setTimeout(function () {
                        pagineTable("knowledgeTable", 12, 0, "knowledgeTableBottom");
                    }, 100);



                    $("#callModalk").on('dblclick', 'tr', function (event) {
                        var target = event.currentTarget;
                        var id = parseInt(target.cells[0].innerHTML);
                        self.do('showModal', id);
                    });

                    $("#newk").on('click', function () {
                        self.do('showModal');
                    });
                }
                else if (whatToDo == 'showModal') {
                    var id = -1;
                    if (param1) {
                        id = param1;
                    }
                    $("#Idk").val(id);
                    var now = new Date();
                    var differenceFuseauxEnMinutes = now.getTimezoneOffset();
                    now.setTime(now.getTime() - (differenceFuseauxEnMinutes * 60000));
                    var now = now.toISOString().split(".")[0];
                    $("#Creation").val(now);
                    $("#Modification").val("");
                    $("#Subject").val("");
                    $("#Body").val("");
                    $("#showFilesk").html("")
                    if (id != -1) {
                        var aRow = model.data;
                        for (var i = 0; i < aRow.length; i++) {
                            if (aRow[i].Id == id) {
                                $("#Idk").val(id);
                                if (aRow[i].Creation) {
                                    var Creation = new Date(parseInt(aRow[i].Creation.substring(6, 19))).toISOString();
                                    Creation = isoToLocalTime(Creation);
                                    $("#Creation").val(Creation);
                                }
                                if (aRow[i].Modification) {
                                    var Modification = new Date(parseInt(aRow[i].Modification.substring(6, 19))).toISOString();
                                    Modification = isoToLocalTime(Modification);
                                    $("#Modification").val(Modification);
                                }
                                $("#Subject").val(aRow[i].Subject.trim());
                                $("#Body").val(ReplaceNewline(aRow[i].Body.trim()));
                                var html = "";

                                if (aRow[i].Files.length != 0) {
                                    for (var j = 0; j < aRow[i].Files.length; j++) {
                                        if (aRow[i].Files[j].Description)
                                            html += "<h5 id='label_" + aRow[i].Files[j].Id + "'>" + aRow[i].Files[j].Description+"</h5>";

                                        html += "<img src='img/delete.png' onmousedown='imgClickHandler(event,this,\"knowledge\");' id='del_" + aRow[i].Files[j].Id + "'/> ";
                                        html += "<img class='uploadedPicture' id='img_" + aRow[i].Files[j].Id + "' src='" + aRow[i].Files[j].Filename + "'/><br />";
                                    }

                                    $("#showFilesk").html(html)
                                }
                            }
                        }

                    } else {
                        $("#Creation").val(now);
                        $("#Modification").val("");
                        $("#Subject").val("");
                        $("#Body").val("");
                    }

                    if (id == -1) {
                        $("#deletek").hide();
                    } else {
                        $("#deletek").show();
                    }
                    $("#savek").attr('disabled', false);




                    $('#myModalk').modal('show');
                }
                else if (whatToDo == 'getModel') {
                    return model;
                }
                else if (whatToDo == 'getData') {
                    errorMessage = "";
                    var xhr = $.ajax("Main.aspx/GetKnowledge", ajax_default_settings)
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

                } else if (whatToDo == 'getSearch') {
                    var what = param1;
                    errorMessage = "";
                    var url = "";
                    var json = JSON.stringify({ "searchFor": what });
                    var params = ajax_default_settings;
                    params.data = json;
                    var xhr = $.ajax("Main.aspx/GetSearchForKnowledge", params)
                       .done(function (response) {
                           model = response.d;
                           self.do('drawTable');
                       })
                       .fail(function () {
                           errorMessage = "An error occured..";
                           self.do('showError');

                       });
                }


            }

        }


    }

}());



launchKnowHowManager();

function SetKnowledgeListeners() {

    $("#showNotesk").on("click", function () {
        $("#row_notesk").show();
        $("#row_imagesk").hide();
    });

    $("#showImagesk").on("click", function () {
        $("#row_notesk").hide();
        $("#row_imagesk").show();
    });


    $("#searchk").on('change', function () {
        // $("#toggleDoneView").attr("checked", true);
        window.knowHowManager.do('search', $("#searchk").val());
    });

    $('[data-toggle=confirmation]').confirmation({
        rootSelector: '[data-toggle=confirmation]',
        onConfirm: function () {
            doDeleteKnowledge();
        },
    });

    $("#filesk").on('change', function () {
        var image = $("#filesk").val();
        if (image.length == 0) {
            $("#filenamek").html(translate("nofile"));
        } else {
            var separator = (operatingSystem == "Windows") ? "\\" : "/";
            var arr = image.split(separator);
            if (arr.length > 0) image = arr[arr.length - 1];
            $("#filenamek").html(image);
        }
    });

    $("#savek").on('click', function (event) {
        $(this).prop('disabled', true);
        var image = $("#filesk").val();
        var description = $("#fileDescriptionk").val();

        var obj = {};
        obj.Subject = $("#Subject").val().trim();
        obj.Id = $("#Idk").val();
        obj.Body = $("#Body").val().replace(/[\n\r]/g, '<br>');

        var selectedFile = document.getElementById('filesk').files[0];
        var json = JSON.stringify({ "Know": obj });
        var self = this;

        $.ajax({
            type: "POST",
            url: "Main.aspx/AddKnowledge",
            contentType: "application/json; charset=utf-8",
            async: true,
            data: json,
            success: function (response) {
                var knowledgeId = response.d;
                $(self).prop('disabled', false);
                if (image != "") {
                    upload("#filesk", image, knowledgeId, "knowledge", description, true,"myModalk");
                } else {
                    $('#myModalk').find('.close').trigger("click"); // closing the modal
                    var toastMsg = new toast("toastMessage", "messageId", false);
                    toastMsg.text(translate("knowledgeCardUpdateSuccess"));
                    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                    toastMsg.moveAt(w / 2 - 100, 90);
                    toastMsg.showFor(3000);
                }

                window.knowHowManager.do('init');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                var str = jqXHR.responseText;
                var obj = JSON.parse(str);
                $('#myModalk').find('.close').trigger("click"); // closing the modal
                $('.modal-backdrop').remove();

                setTimeout(function () {
                    $("#alert-message").html("Failure " + obj.Message);
                    $('#alert').modal('show');
                }, 100);


            } // end error
        }); // end ajax
    });

}

var doDeleteKnowledge = function () {
    var obj = {};
    obj.Id = $("#Idk").val();
    var json = JSON.stringify({ "toDel": obj });
    var url = "Main.aspx/DeleteKnowledge";
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",
        data: json,
        success: function (response) {
            $('#myModalk').find('.close').trigger("click"); // closing the modal
            var toastMsg = new toast("toastMessage", "messageId", false);
            toastMsg.text(translate("deleteSuccess"));
            var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            toastMsg.moveAt(w / 2 - 100, 90);
            toastMsg.showFor(3000);

            window.knowHowManager.do('init');

        },
        error: function (jqXHR, textStatus, errorThrown) {
            var str = jqXHR.responseText;
            var obj = JSON.parse(str);
            $("#alert-message").html("Failure " + obj.Message);
            $('#alert').modal('show');
        } // end error
    }); // end ajax
}