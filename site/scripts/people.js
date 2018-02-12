
(function () {
    'use strict'
    moment.tz.add([
		"Europe/Paris|PMT WET WEST CEST CET WEMT|-9.l 0 -10 -20 -10 -20|0121212121212121212121212121212121212121212121212123434352543434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434|-2nco8.l cNb8.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 1u00 10o0 1io0 1wo0 Rc0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Df0 Ik0 5M30 WM0 1fA0 1cM0 Vx0 hB0 1aq0 16M0 1ekn0 1cL0 1fC0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e6"
    ]);

    //glyphicon glyphicon-pause,play,stop
    // Setting the 
    window.peopleManager = function () {
        var who = "Philippe";
        var app = "#appPeople";
        var tableInner = "#peopleTable";
        var errorMessage = "";
        var model = {};
        var showDone = false;
        var ajax_default_settings = {
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
        };
        SetPeopleListeners();
       
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
                    $(app).find("#peopleCaption").html(captionHtml);

                    // Drawing headers
                    var html = " <thead class='thead-dark'><tr>"
                    for (var i = 0; i < headers.length; i++) {
                        html += "<th scope='col' data-translate='" + props[i] + "'>" + headers[i] + "</th>";
                    }
                    html += "</tr> </thead> <tbody id='callModalp'>"
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
                                item = tidy(item);


                                line += "<td>" + item + "</td>";
                            }

                            line += "</tr>";

                             html += line;

                        } 
                            
                    }

                    html += " </tbody>";
                    $(tableInner).html(html);

                    setTimeout(function () {
                        pagineTable("peopleTable", 12, 0, "peopleTableBottom");
                    }, 100);

                    setTimeout(function () {
                        getTranslations(userLang);
                    }, 300);

                    $("#callModalp").off('dblclick').on('dblclick', 'tr', function (event) {
                        var target = event.currentTarget;
                        var id = parseInt(target.cells[0].innerHTML);
                        self.do('showModal', id);
                    });

                    $("#newp").off('click').on('click', function () {
                        self.do('showModal');
                    });

                    

                    var tagName = document.getElementById("Position").tagName.toLowerCase();
                    if (tagName == "select") {
                        $("#Position").html("");

                    } else {
                        var parent = $("#Position").parent();
                        $("#Position").remove();
                        parent.append("<select id='Position' class='form-control'></select>");
                    }

                    var html = "<option value=0>...</option>";
                  
                    if (model.Positions.length > 0) {
                        for (var i = 0; i < model.Positions.length; i++) {
                            html += "<option value=" + model.Positions[i].key + ">" + model.Positions[i].value + "</option>";
                            
                        }
                    }
                    html += "<option value=-1>Saisir</option>";
                    $("#Position").html(html);

                }


                else if (whatToDo == 'showModal') {
                    var id = -1;
                    if (param1) {
                        id = param1;
                    }
                    $("#Idp").val(id);
                    var itemDate
                    var now = new Date();
                    var differenceFuseauxEnMinutes = now.getTimezoneOffset();
                    now.setTime(now.getTime() - (differenceFuseauxEnMinutes * 60000));
                    var now = now.toISOString().split(".")[0];
                    $("#Nom").val("");
                    $("#Prenom").val("");
                    $("#Mobile").val("");
                    $("#Email").val("");
                    $("#Position").val(0);
                    $("#new-notep").val("");
                    $("#old-notep").html("");
                   // $("#Subject").val("");
                    $("#Body").val("");
                    if (id != -1) {
                        var aRow = model.data;
                        for (var i = 0; i < aRow.length; i++) {
                            if (aRow[i].Id == id) {
                                $("#Idp").val(id);
                                $("#Nom").val(tidy(aRow[i].Nom));
                                $("#Prenom").val(tidy(aRow[i].Prenom));
                                $("#Mobile").val(tidy(aRow[i].Mobile));
                                $("#Email").val(tidy(aRow[i].Email));
                                if (aRow[i].IdPosition) {
                                    $("#Position").val(aRow[i].IdPosition);
                                }
                                if (aRow[i].Photo && aRow[i].Photo!="") {
                                    $("#portraitzone img").attr("src",aRow[i].Photo);
                                }
                                else {
                                    $("#portraitzone img").attr("src","/images/nobody.jpg");
                                }
                                if (aRow[i].Notes.length > 0) {
                                    for (var j = 0; j < aRow[i].Notes.length; j++) {
                                        itemDate = new Date(parseInt(aRow[i].Notes[j].Creation.substring(6, 19))).toLocaleString();

                                        $("#old-notep").append("<b>" + itemDate + " : </b>" + aRow[i].Notes[j].Body.trim() + "<hr>");
                                    }
                                }
                                
                            }
                        }

                    } 

                    if (id == -1) {
                        $("#deletep").hide();
                        $("#uploadsp").hide();
                        $("#portraitzone img").attr("src", "/images/nobody.jpg");
                    } else {
                        $("#deletep").show();
                        $("#uploadsp").show();

                    }

                    $("#savep").attr('disabled', false);

                   $("#newNotep").removeClass("inactive").addClass("active");
                   $("#oldNotep").removeClass("active").addClass("inactive");
                   $("#old-notep").hide();
                   $("#new-notep").show();

                   $('#myModalp').modal('show');
                } 
                else if (whatToDo == 'getModel') {
                    return model;
                }
                else if (whatToDo == 'getData') {
                    errorMessage = "";
                    var xhr = $.ajax("Main.aspx/GetPeople", ajax_default_settings)
                       .done(function (response) {
                           model = response.d;
                           xhr = $.ajax("Main.aspx/GetPositions", ajax_default_settings)
                            .done(function (response) {
                                model.Positions = response.d;
                                self.do('drawTable');
                            })
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
                    var xhr = $.ajax("Main.aspx/GetSearchForPeople", params)
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





launchPeopleManager();

function SetPeopleListeners() {


    $('[data-toggle=confirmationp]').confirmation({
        rootSelector: '[data-toggle=confirmationp]',
        onConfirm: function () {
            doDeletePeople();
        },
    });

    $("#searchp").on('change', function () {
        window.peopleManager.do('search', $("#search").val());
    });

    $("#oldNotep").on("click", function () {
        if ($(this).hasClass("inactive")) {
            $(this).removeClass("inactive").addClass("active");
            $("#newNotep").removeClass("active").addClass("inactive");
            $("#new-notep").hide();
            $("#old-notep").show();
        }
    });

    $("#newNotep").on("click", function () {
        if ($(this).hasClass("inactive")) {
            $(this).removeClass("inactive").addClass("active");
            $("#oldNotep").removeClass("active").addClass("inactive");
            $("#old-notep").hide();
            $("#new-notep").show();
        }
    });


    $("#filesp").on("change", function () {
        
        var selectedFile = this.files[0];
        if (selectedFile) {
            var id = parseInt($("#Idp").val());
            var data = { "Id": id, "concern": "people", "description": "" };

            $(this).simpleUpload("/DocumentsFileUpload.ashx", {
                data: data,
                allowedExts: ["jpg", "jpeg", "jpe", "jif", "jfif", "jfi", "png", "gif"],
                allowedTypes: ["image/pjpeg", "image/jpeg", "image/png", "image/x-png", "image/gif", "image/x-gif"],
                maxFileSize: 1048576, //1MB in bytes
                success: function (data) {
                    var params = {
                        type: "POST",
                        dataType: 'json',
                        contentType: "application/json; charset=utf-8",
                        data: "{Id:" + id + "}"
                    };
                    xhr = $.ajax("Main.aspx/GetPhoto", params)
                         .done(function (response) {
                             if (response.d != "") {
                                 $("#portraitzone img").attr("src", response.d);
                             }
                             else {
                                 $("#portraitzone img").attr("src", "images/nobody.jpg");
                             }
                         })
                    window.peopleManager.do('init');
                },
            });
        }
    });

    $("#newp").on("click", function () {

        var src = $("iframe").attr("src");

        $.ajax({
            type: "GET",
            url: src,
            success: function (response) {
                var n = response.search("<title>");
                if (n != -1) {
                    var title = response.substr(n + 7, 100);
                    n = title.search("</title>");
                    if (n != -1) {
                        var title = title.substr(0, n);
                        $("iframe").css("zoom", 0.75);
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            } // end error
        }); // end ajax

    });
}

var doDeletePeople = function () {

    var obj = {};
    obj.Id = $("#Ido").val();
    var json = JSON.stringify({ "toDel": obj });
    var url = "Main.aspx/DeletePeople";
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",
        data: json,
        success: function (response) {
            $('#myModalp').find('.close').trigger("click"); // closing the modal
            var toastMsg = new toast("toastMessage", "messageId", false);
            toastMsg.text(translate("deleteSuccess"));
            var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            toastMsg.moveAt(w / 2 - 100, 90);
            toastMsg.showFor(3000);

            window.peopleManager.do('init');

        },
        error: function (jqXHR, textStatus, errorThrown) {
            var str = jqXHR.responseText;
            var obj = JSON.parse(str);
            $("#alert-message").html("Echec " + obj.Message);
            $('#alert').modal('show');
        } // end error
    }); // end ajax
}