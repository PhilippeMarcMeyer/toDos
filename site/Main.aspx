<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Main.aspx.cs" Inherits="site.Main" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Phm's todos</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/style.css">

</head>
<body>
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">Learning C#, Linq and js factories</a>
            </div>
            <ul class="nav navbar-nav">
                <li id="jobs" class="active"><a href="#jobs">Jobs to do</a></li>
                <li id="knowledge"><a href="#knowledge">Knowledge</a></li>
                <li id="people"><a href="#people">People</a></li>
            </ul>
        </div>
    </nav>

    <span id="toastMessage"></span>

    <div id="jobsZone">
        <div class="ui main container" id="app">
            <div class="caption">
                <span id="caption"></span>&nbsp;<div class="uploadedPicture" id="none" style="display: none;"></div>
                <span style="font-weight: 100; color: darkgrey;">Chercher :
                <input type="text" id="search" placeholder="Expression" /></span>
                &nbsp;<span style="font-weight: 100; color: darkgreen;" id="forecastInfo"></span>
            </div>
            <table id="mainTable" class="table table-hover table-bordered table-striped"></table>
            <button type="button" class="btn btn-primary appliquer-button pull-right" style="margin-left: 4px;" id="new">Nouveau Job</button>
        </div>


        <!-- Modal -->
        <div class="modal fade" id="alert" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Information</h4>
                    </div>
                    <div class="modal-body">
                        <p id="alert-message"></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>


        <div id="myModal" class="modal inmodal fade in" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg md-skin">
                <div class="modal-content animated bounceInRight">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">Saisie d'un job <span id="myModalMessage"></span></h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <input type="text" id="Id" style="display: none;" />
                            <input type="text" id="Done" style="display: none;" />
                            <div class="form-group col-md-7 col-md-offset-1">
                                <label for="Description"><span class="text-danger">*</span>Description</label>
                                <input type="text" class="form-control" id="Description" maxlength="80" value="" />
                            </div>
                            <div class="form-group col-md-3">
                                <label for="Branch"><span class="text-danger">*</span>Branche</label>
                                <input type="text" class="form-control" id="Branch" maxlength="30" value="" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-md-3 col-md-offset-1">
                                <label for="Begin">Début</label>
                                <input type="datetime-local" class="form-control" id="Begin" value="" />
                            </div>
                            <div class="form-group col-md-3">
                                <label for="End">Fin</label>
                                <input type="datetime-local" class="form-control" id="End" value="" />
                            </div>
                            <div class="form-group col-md-4">
                                <label for="Appraisal">Priorité</label>
                                <select class="form-control" id="Appraisal">
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-2 col-md-offset-1">
                                <label for="Reference">Référence</label>
                                <input type="text" class="form-control" id="Reference" maxlength="80" value="" />
                            </div>

                            <div class="form-group col-md-2">
                                <label for="Planned">Prévu (minutes)</label>
                                <input type="number" class="form-control" id="Planned" min="0" value="" />
                                <div id="tempDelta"></div>
                            </div>
                            <div class="form-group col-md-2">
                                <label for="Duration">Durée (minutes)</label>
                                <input type="number" class="form-control" id="Duration" min="0" value="" />
                                <div id="tempDuration"></div>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="Duration">Note de bilan</label>
                                <input type="text" class="form-control" id="AppraisalNote" maxlength="80" value="" />
                            </div>
                        </div>

                        <div class="row" id="row_notes" style="display: block;">
                            <div class="form-group col-md-10 col-md-offset-1">
                                <span class="tab active">Notes</span><span class="tab inactive" id="showImagesw">Images</span>
                                <textarea class="form-control" id="Notes" maxlength="8000"></textarea>
                            </div>
                        </div>
                        <div class="row" id="row_images" style="display: none;">
                            <div class="form-group col-md-10 col-md-offset-1">
                                <span class="tab inactive" id="showNotesw">Notes</span><span class="tab active">Images</span>
                                <div id="showFiles" style="height: 300px; overflow-y: auto; border: solid 1px #888;"></div>
                            </div>
                        </div>
                        <div class="row" style="display: block;">
                            <div class="form-group col-md-5 col-md-offset-1">
                                <div id="uploads"></div>
                                <label for="files">Image</label>
                                <input name="files" id="files" type="file" class="form-control">
                            </div>
                            <div class="form-group col-md-5">
                                <label for="fileDescription">Description de l'image</label>
                                <input name="fileDescription" id="fileDescription" type="text" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="form-group" role="group" style="margin-left: 20px; margin-right: 20px;">
                        <button type="button" class="btn btn-warning appliquer-button pull-left" style="display: none;" id="pause">Pause</button>
                        <button type="button" class="btn btn-warning appliquer-button pull-left" style="display: none;" id="reprise">Reprise</button>
                        <button type="button" class="btn btn-primary appliquer-button pull-right" style="width: 160px;" id="saveAndClose">Enregistrer et fermer</button>

                        <button type="button" class="btn btn-primary appliquer-button pull-right" id="saveAndStay">Enregistrer</button>
                        <button type="button" class="btn btn-danger appliquer-button pull-right" id="delete" data-toggle="confirmation2" data-popout="true" data-btn-ok-label="Supprimer" data-btn-ok-icon="glyphicon glyphicon-share-alt" data-btn-ok-class="btn-danger" data-btn-cancel-label="Annuler" data-btn-cancel-icon="glyphicon glyphicon-ban-circle" data-btn-cancel-class="btn-success" data-title="Etes-vous sûr(e) ?" data-content="">Supprimer</button>
                    </div>
                    <br />
                    <br />
                </div>
                <div class="modal-footer"></div>
            </div>
        </div>
    </div>
    <!-- End of jobs zone -->

    <div id="knowledgeZone" style="display: none;">

        <div class="ui main container" id="appKnowledge">
            <div class="caption">
                <span id="knowledgeCaption"></span>&nbsp;Connaissances&nbsp;
            <span style="font-weight: 100; color: darkgrey;">Chercher :
                <input type="text" id="searchk" placeholder="" /></span>
            </div>

            <table id="knowledgeTable" class="table table-hover table-bordered table-striped"></table>
            <button type="button" class="btn btn-primary appliquer-button pull-right" style="margin-left: 4px; width: 200px;" id="newk">Nouvelle connaissance</button>
        </div>

        <!-- Modal -->

        <div id="myModalk" class="modal inmodal fade in" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg md-skin">
                <div class="modal-content animated bounceInRight">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">Saisie d'une connaissance</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <input type="text" id="Idk" style="display: none;" />
                            <div class="form-group col-md-10 col-md-offset-1">
                                <label for="Subject"><span class="text-danger">*</span>Sujet</label>
                                <input type="text" class="form-control" id="Subject" maxlength="80" value="" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-md-4 col-md-offset-1">
                                <label for="Creation">Créé le</label>
                                <input type="datetime-local" class="form-control" readonly="readonly" id="Creation" value="" />
                            </div>
                            <div class="form-group col-md-4 col-md-offset-1">
                                <label for="Modification">Modifié le</label>
                                <input type="datetime-local" class="form-control" readonly="readonly" id="Modification" value="" />
                            </div>
                        </div>


                        <div class="row">
                            <div class="form-group col-md-10 col-md-offset-1">
                                <label for="Body">Notes</label>
                                <textarea class="form-control" id="Body" maxlength="8000"></textarea>
                            </div>
                        </div>

                        <div class="form-group" role="group" style="margin-left: 20px; margin-right: 20px;">
                            <button type="button" class="btn btn-primary appliquer-button pull-right" style="margin-left: 4px; width: 120px;" id="savek">Enregistrer</button>
                            <button type="button" class="btn btn-danger appliquer-button pull-right" data-toggle="confirmation" data-popout="true" style="margin-left: 4px; width: 120px;" id="deletek" data-btn-ok-label="Supprimer" data-btn-ok-icon="glyphicon glyphicon-share-alt" data-btn-ok-class="btn-danger" data-btn-cancel-label="Annuler" data-btn-cancel-icon="glyphicon glyphicon-ban-circle" data-btn-cancel-class="btn-success" data-title="Etes-vous sûr(e) ?" data-content="">Supprimer</button>

                        </div>
                        <br />
                    </div>
                    <div class="modal-footer"></div>
                </div>
            </div>
        </div>


    </div>

    <!-- End of knowledge zone -->
    <div id="peopleZone" style="display: none;">

        <div class="ui main container" id="appPeople">
            <div class="caption">
                <span id="peopleCaption"></span>&nbsp;People of interest&nbsp;
            <span style="font-weight: 100; color: darkgrey;">Chercher :
                <input type="text" id="searchp" placeholder="" /></span>
            </div>
            <table id="peopleTable" class="table table-hover table-bordered table-striped"></table>
            <button type="button" class="btn btn-primary appliquer-button pull-right" style="margin-left: 4px; width: 200px;" id="newp">Nouvelle personne</button>
        </div>

        <!-- Modal -->

        <div id="myModalp" class="modal inmodal fade in" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg md-skin">
                <div class="modal-content animated bounceInRight">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">Saisie d'un personnage</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6 col-md-offset-1" id="identzone" ">
                                <div class="row">
                                    <input type="text" id="Idp" style="display: none;" />
                                    <div class="form-group col-md-6">
                                        <label for="Nom"><span class="text-danger">*</span>Nom</label>
                                        <input type="text" class="form-control" id="Nom" maxlength="35" value="" />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="Prenom">Prénom</label>
                                        <input type="text" class="form-control" id="Prenom" maxlength="35" value="" />
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="form-group col-md-6">
                                        <label for="Mobile">Mobile</label>
                                        <input type="text" class="form-control" maxlength="20" id="Mobile" value="" />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="Email">Email</label>
                                        <input type="text" class="form-control" maxlength="50" id="Email" value="" />
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="form-group col-md-8">
                                        <label for="Position">Position</label>
                                        <select id="Position" class="form-control">
                                        </select>
                                    </div>
                                </div>
                            </div>
                             <div class="col-md-4">
                                  <div id="portraitzone">
                                      <img src="images/nobody.jpg" style="width:100%;height:100%;"/>
                                  </div> 
                            </div>
                        </div>

                        <div class="row" id="row_Notesp" style="display: block;">
                            <div class="form-group col-md-10 col-md-offset-1">
                                <span class="active tab" id="newNotep">Nouvelle note</span><span class="inactive tab old" id="oldNotep">Notes</span>
                                 <textarea id="new-notep" class="form-control" style="overflow-y: auto; border: solid 1px #888;"  maxlength="8000">test</textarea>
                                 <div id="old-notep" style="min-height:300px;max-width:110%; overflow-y: auto; border: solid 1px #888;display:none;"></div>
                            </div>
                        </div>
                            
                         <div class="row" style="display: block;">
                            <div class="form-group col-md-5 col-md-offset-1">
                                <div id="uploadsp"></div>
                                <label for="filesp">Photo</label>
                                <input name="filesp" id="filesp" type="file" class="form-control">
                            </div>

                        </div>

                        <div class="form-group" role="group" style="margin-left: 20px; margin-right: 20px;">
                            <button type="button" class="btn btn-primary appliquer-button pull-right" style="margin-left: 4px; width: 120px;" id="savep">Enregistrer</button>
                            <button type="button" class="btn btn-danger appliquer-button pull-right" data-toggle="confirmation" data-popout="true" style="margin-left: 4px; width: 120px;" id="deletep" data-btn-ok-label="Supprimer" data-btn-ok-icon="glyphicon glyphicon-share-alt" data-btn-ok-class="btn-danger" data-btn-cancel-label="Annuler" data-btn-cancel-icon="glyphicon glyphicon-ban-circle" data-btn-cancel-class="btn-success" data-title="Etes-vous sûr(e) ?" data-content="">Supprimer</button>

                        </div>
                        <br />
                    </div>
                    <div class="modal-footer"></div>
                </div>
            </div>
        </div>

    </div>
    <!-- End of people zone -->
    <div id="scripts">
        <script src="scripts/jquery-3.2.1.js"></script>
        <script src="scripts/bootstrap.js"></script>
        <script src="scripts/bootstrap-confirmation.js"></script>
        <script src="scripts/moment.js"></script>
        <script src="scripts/moment-timezone.js"></script>
        <script src="scripts/simpleUpload.js"></script>
        <script src="scripts/toast.js"></script>
        <script src="scripts/main.js"></script>

    </div>
    <script>
        window.manager = window.workManager();
        window.manager.do('init');

        $(".navbar-nav li").on("click", function () {
            setTimeout(function () {
                var pathname = $(location).attr('href');
                var arr = pathname.split("#");
                var menuItem = arr.length >= 2 ? arr[1] : "jobs";
                menuItem = menuItem.toLowerCase();
                init(menuItem);
            }, 100);

        });

        var init = function (menuItem) {
            var menus = $(".navbar-nav li");
            $.each(menus, function (index, menu) {
                if (menu.id == menuItem) {
                    $("#" + menu.id + "Zone").show();
                    $("#" + menu.id).addClass("active");
                } else {
                    $("#" + menu.id + "Zone").hide();
                    $("#" + menu.id).removeClass("active");
                }
            });
            load(menuItem);
        }

        var load = function (menuItem) {
            if (menuItem === "knowledge") {
                // Get the div#scripts and search for the knowledge js src
                var aScript = $("#scripts [src='scripts/knowledge.js']");
                if (aScript.length === 0) { // if not loaded then load it
                    var script = document.createElement('script');
                    script.src = 'scripts/knowledge.js';
                    document.getElementById("scripts").appendChild(script);
                    //  launchKnowHowManager(); is at the end of the loaded script
                }
            }
            else if (menuItem === "people") {
                var aScript = $("#scripts [src='scripts/people.js']");
                if (aScript.length === 0) { // if not loaded then load it
                    var script = document.createElement('script');
                    script.src = 'scripts/people.js';
                    document.getElementById("scripts").appendChild(script);
                    //  launchPeopleManager(); is at the end of the loaded script
                }

            }

        }
        var launchKnowHowManager = function () {
            window.knowHowManager = window.knowledgeManager();
            window.knowHowManager.do('init');
            $("#searchk").on('change', function () {
                // $("#toggleDoneView").attr("checked", true);
                window.knowHowManager.do('search', $("#searchk").val());
            });
            $("#savek").on('click', function (event) {
                $(this).attr('disabled', 'disabled');
                var obj = {};
                obj.Subject = $("#Subject").val().trim();
                obj.Id = $("#Idk").val();
                obj.Body = $("#Body").val().replace(/[\n\r]/g, '<br>');

                var selectedFile = document.getElementById('files').files[0];
                var json = JSON.stringify({ "Know": obj });
                $.ajax({
                    type: "POST",
                    url: "Main.aspx/AddKnowledge",
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    data: json,
                    success: function (response) {
                        $('#myModalk').find('.close').trigger("click"); // closing the modal
                        var toastMsg = new toast("toastMessage", "messageId", false);
                        toastMsg.text("Mise à jour réussie des connaissances !");
                        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                        toastMsg.moveAt(w / 2 - 100, 90);
                        toastMsg.showFor(3000);

                        window.knowHowManager.do('init');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        var str = jqXHR.responseText;
                        var obj = JSON.parse(str);
                        $('#myModalk').find('.close').trigger("click"); // closing the modal
                        $('.modal-backdrop').remove();

                        setTimeout(function () {
                            $("#alert-message").html("Echec " + obj.Message);
                            $('#alert').modal('show');
                        }, 100);


                    } // end error
                }); // end ajax
            });

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
                        toastMsg.text("Suppression réussie !");
                        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                        toastMsg.moveAt(w / 2 - 100, 90);
                        toastMsg.showFor(3000);

                        window.knowHowManager.do('init');

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        var str = jqXHR.responseText;
                        var obj = JSON.parse(str);
                        $("#alert-message").html("Echec " + obj.Message);
                        $('#alert').modal('show');
                    } // end error
                }); // end ajax
            }

            $('[data-toggle=confirmation]').confirmation({
                rootSelector: '[data-toggle=confirmation]',
                onConfirm: function () {
                    doDeleteKnowledge();
                },
            });
        }



        $("#search").on('change', function () {
            // $("#toggleDoneView").attr("checked", true);
            window.manager.do('search', $("#search").val());
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
            obj.Notes = $("#Notes").val().replace(/[\n\r]/g, '<br>');
            obj.Branch = $("#Branch").val().trim();
            obj.Done = $("#Done").val() == "true" ? true : false;
            obj.Appraisal = $("#Appraisal").val();
            obj.AppraisalNote = $("#AppraisalNote").val();
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




        $('[data-toggle=confirmation2]').confirmation({
            rootSelector: '[data-toggle=confirmation2]',
            onConfirm: function () {
                doDeleteWork();
            },
        });



        $("#showNotesw").on("click", function () {
            $("#row_notes").show();
            $("#row_images").hide();
        });

        $("#showImagesw").on("click", function () {
            $("#row_notes").hide();
            $("#row_images").show();
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


        var launchPeopleManager = function () {
            window.peopleManager = window.peopleManager();
            window.peopleManager.do('init');
            $("#searchp").on('change', function () {
                // $("#toggleDoneView").attr("checked", true);
                window.peopleManager.do('search', $("#searchp").val());
            });
            $("#savep").on('click', function (event) {
                $(this).attr('disabled', 'disabled');
                var obj = {};
                obj.Nom = $("#Nom").val().trim();
                obj.Prenom = $("#Prenom").val().trim();
                obj.Email = $("#Email").val().trim();
                obj.Mobile = $("#Mobile").val().trim();
                var tagName = document.getElementById("Position").tagName.toLowerCase();
                if (tagName == "select") {
                    obj.Position = parseInt($("#Position").val());
                    obj.PositionName = "";
                } else {
                    obj.Position = -1
                    obj.PositionName = $("#Position").val().trim();
                }
                obj.Id = parseInt($("#Idp").val());
                obj.NewNote = $("#new-notep").val().trim().replace(/[\n\r]/g, '<br>');

                // var selectedFile = document.getElementById('filesp').files[0];
                var json = JSON.stringify({ "People": obj });
                $.ajax({
                    type: "POST",
                    url: "Main.aspx/AddPeople",
                    contentType: "application/json; charset=utf-8",
                    async: true,
                    data: json,
                    success: function (response) {
                        $('#myModalp').find('.close').trigger("click"); // closing the modal
                        var toastMsg = new toast("toastMessage", "messageId", false);
                        toastMsg.text("Mise à jour réussie de la fiche personnage !");
                        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                        toastMsg.moveAt(w / 2 - 100, 90);
                        toastMsg.showFor(3000);

                        window.peopleManager.do('init');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        var str = jqXHR.responseText;
                        var obj = JSON.parse(str);
                        $('#myModalp').find('.close').trigger("click"); // closing the modal
                        var toastMsg = new toast("toastMessage", "messageId", false);
                        toastMsg.text("Echec de la mise à jour de la fiche personnage ...");
                        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                        toastMsg.moveAt(w / 2 - 100, 90);
                        toastMsg.showFor(3000);


                    } // end error
                }); // end ajax
            });

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
                        toastMsg.text("Suppression réussie !");
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

            $('[data-toggle=confirmation]').confirmation({
                rootSelector: '[data-toggle=confirmation]',
                onConfirm: function () {
                    doDeleteKnowledge();
                },
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
                    toastMsg.text("Suppression réussie !");
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

        $('[data-toggle=confirmationp]').confirmation({
            rootSelector: '[data-toggle=confirmationp]',
            onConfirm: function () {
                doDeletePeople();
            },
        });

        $("#searchp").on('change', function () {
            window.peopleManager.do('search', $("#search").val());
        });


        $("#search").on('change', function () {
            window.manager.do('search', $("#search").val());
        });

        $("#newNotep").on("click", function () {
            if ($(this).hasClass("inactive")) {
                $(this).removeClass("inactive").addClass("active");
                $("#oldNotep").removeClass("active").addClass("inactive");
                $("#old-notep").hide();
                $("#new-notep").show();
            }
        });



        $("#oldNotep").on("click", function () {
            if ($(this).hasClass("inactive")) {
                $(this).removeClass("inactive").addClass("active");
                $("#newNotep").removeClass("active").addClass("inactive");
                $("#new-notep").hide();
                $("#old-notep").show();
            }
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

        $("#filesp").on("change", function () {
            var selectedFile = this.files[0];
            if (selectedFile) {
                console.log(selectedFile);
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

        function tidy(str) {
            if (typeof str == "string") {
                var arr = str.split(" ");
                str.split(" ");
                str = "";

                for (var k = arr.length - 1; k >= 0; k--) {
                    if (arr[k] == "") {
                        arr.pop();
                    }
                }
                str = arr.join(" ");
            }

            return str;
        }

        $(".appliquer-button").each(function () {
            var goGreen = 21;
            var goRed = 40;
            var offset = 35;
            var css = $(this).css("background-color");
            var str = css.replace(/[^0123456789,]+/g, '');
            var colorsDark = str.split(",");
            var colorsLigth = str.split(",");
            for (var i = 0; i < colorsDark.length; i++) {
                colorsDark[i] = parseInt(colorsDark[i]);
                colorsLigth[i] = parseInt(colorsLigth[i]);

                if (colorsDark[i] > offset)
                    colorsDark[i] = colorsDark[i] - offset;
                else
                    colorsDark[i] = 0;

                if (colorsLigth[i] < 255 - offset)
                    colorsLigth[i] = colorsLigth[i] + offset;
                else
                    colorsLigth[i] = 255;
            }
            colorsLigth[1] += goGreen;
            colorsDark[1] += goGreen;
            colorsLigth[0] += goRed;
            colorsDark[0] += goRed;
            var cssLight = "rgb(" + colorsLigth.join(",") + ")";
            var cssDark = "rgb(" + colorsDark.join(",") + ")";
            var gradient = "linear-gradient(" + cssLight + " 10% , " + cssDark + ")"; //to right, 
            $(this).css("background", gradient);//.css("color","black");

           // $(".modal-header").css("background", $(".btn-primary").css("background"));

        });

    </script>
</body>
</html>


