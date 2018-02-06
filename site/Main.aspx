<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Main.aspx.cs" Inherits="site.Main" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">

    <title>Phm's todos</title>

    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/style.css">

</head>
<body>
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">

            <div class="navbar-header">
               <div class="btn-group" style="margin-top: 8px;margin-right:10px;">
                <button id="btnLang" type="button" class="btn navbar-inverse" style="border:none;" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src="x" style="width: 20px;">
                </button>
                <ul class="dropdown-menu" id="menuLanguage">

                </ul>
            </div>
                <a class="navbar-brand"  href="#" data-translate="brand">Learning C#, Linq and js factories
                </a>
            </div>
            <ul class="nav navbar-nav">
                <li id="jobs" class="active"><a href="#jobs" data-translate="Jobstodo">Jobs to do</a></li>
                <li id="knowledge"><a href="#knowledge" data-translate="Knowledge">Knowledge</a></li>
                <li id="people"><a href="#people" data-translate="People">People</a></li>
            </ul>

        </div>
    </nav>

    <span id="toastMessage"></span>

    <div id="jobsZone">
        <div class="ui main container" id="app">
            <div class="caption">

                <span id="caption" data-translate="JobsCaption"></span>&nbsp;<div class="uploadedPicture" id="none" style="display: none;"></div>
                <span style="font-weight: 100; color: darkgrey;" data-translate="search">Chercher :</span>
                <span style="font-weight: 100; color: darkgrey;">
                    <input type="text" id="search" placeholder="Expression" />
                </span>
                <span style='float:right;font-size:12px;font-weight:normal'>
                    <input  type='checkbox' id='toggleDoneView'> 
                    <label for='toggleDoneView' data-translate='showOldies'>Montrer les tâches archivées </label>
                </span>

                &nbsp;
                <span style="font-weight: 100; color: darkgreen;" id="forecastInfo"></span>
            </div>
            <table id="mainTable" class="table table-hover table-bordered table-striped"></table>
            <button type="button" class="btn btn-primary appliquer-button pull-right" style="margin-left: 4px;" id="new" data-translate="Btn_New-Job">Nouveau Job</button>
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
                        <h4 class="modal-title" data-translate="modalJobTitle">Saisie d'un job <span id="myModalMessage"></span></h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <input type="text" id="Id" style="display: none;" />
                            <input type="text" id="Done" style="display: none;" />
                            <div class="form-group col-md-7 col-md-offset-1">
                                <label for="Description"><span class="text-danger">*</span><span data-translate="Description">Description</span></label>
                                <input type="text" class="form-control" id="Description" maxlength="80" value="" />
                            </div>
                            <div class="form-group col-md-3">
                                <label for="Branch">Branch</label>
                                <input type="text" class="form-control" id="Branch" maxlength="30" value="" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-md-3 col-md-offset-1">
                                <label for="Begin">Début</label>
                                <input type="datetime-local" class="form-control" id="Begin" value="" />
                                <input type="text" class="form-control" id="dt-Begin" style="display:none;" value=""/>

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
                                <label for="AppraisalNote">Note de bilan</label>
                                <input type="text" class="form-control" id="AppraisalNote" maxlength="80" value="" />
                            </div>
                        </div>

                        <div class="row" id="row_notes" style="display: block;">
                            <div class="form-group col-md-10 col-md-offset-1">
                                <span class="tab active">Notes</span><span class="tab inactive" id="showImagesw">Images</span>
                                <textarea class="form-control" id="Notes" maxlength="8000" style="min-height:120px;height:120px;"></textarea>
                                <div id="old-notew" class="oldNotes"></div>

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
                                <label for="files" style="display:block;">Image</label>
                                <button type="button" style="position:absolute;" class="btn btn-default">
                                    <span class="glyphicon glyphicon-upload"></span>&nbsp;<span data-translate="selectImage">Envoyer</span>
                                </button>
                                <span id="filenamew" data-translate="nofile" style="position:absolute;left:120px;line-height:20px;margin-top:7px;"></span>
                                <input name="files" id="files" type="file" style="opacity:0" class="form-control">
                            </div>
                            <div class="form-group col-md-5">
                                <label for="fileDescription">Description de l'image</label>
                                <input name="fileDescription" id="fileDescription" type="text" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="form-group" role="group" style="margin-left: 20px; margin-right: 20px;">
                        <button type="button" class="btn btn-warning appliquer-button pull-left" style="display: none;" data-translate="Pause" id="pause">Pause</button>
                        <button type="button" class="btn btn-warning appliquer-button pull-left" style="display: none;" data-translate="Reprise" id="reprise">Reprise</button>
                        <button type="button" class="btn btn-primary appliquer-button pull-right" style="width: 160px;" data-translate="SaveAndClose"  id="saveAndClose">Enregistrer et fermer</button>

                        <button type="button" class="btn btn-primary appliquer-button pull-right" data-translate="SaveAndStay" id="saveAndStay">Enregistrer</button>
                        <button type="button" class="btn btn-danger appliquer-button pull-right" id="delete" data-toggle="confirmation2" data-popout="true" data-btn-ok-label="Supprimer" data-btn-ok-icon="glyphicon glyphicon-share-alt" data-btn-ok-class="btn-danger" data-btn-cancel-label="Annuler" data-btn-cancel-icon="glyphicon glyphicon-ban-circle" data-btn-cancel-class="btn-success" data-title="Etes-vous sûr(e) ?" data-translate="Supprimer" data-content="">Supprimer</button>
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
                <span id="peopleCaption" data-translate="peopleCaption">People of interest</span>
                <span style="font-weight: 100; color: darkgrey;" data-translate="search">Chercher :</span>
                 <span style="font-weight: 100; color: darkgrey;">
                    <input type="text" id="searchp" placeholder="Expression" />
                </span>
            </div>
            <table id="peopleTable" class="table table-hover table-bordered table-striped"></table>
            <button type="button" class="btn btn-primary appliquer-button pull-right" style="margin-left: 4px; width: 200px;" id="newp" data-translate="Btn_newp">Nouvelle personne</button>
        </div>

        <!-- Modal -->

        <div id="myModalp" class="modal inmodal fade in" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg md-skin">
                <div class="modal-content animated bounceInRight">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span></button>
                        <h4 class="modal-title" data-translate="peopleModalCaption">Saisie d'un personnage</h4>
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
                                <span class="active tab" id="newNotep" data-translate="newNotep">Nouvelle note</span><span class="inactive tab old" data-translate="oldNotep" id="oldNotep">Notes</span>
                                 <textarea id="new-notep" class="form-control" style="overflow-y: auto; border: solid 1px #888;"  maxlength="8000">test</textarea>
                                 <div id="old-notep" style="min-height:300px;max-width:110%; overflow-y: auto; border: solid 1px #888;display:none;"></div>
                            </div>
                        </div>
                            
                         <div class="row" style="display: block;">
                            <div class="form-group col-md-5 col-md-offset-1">
                                <div id="uploadsp"></div>
                                <label for="filesp" data-translate="Photo">Photo</label>
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
        <script src="scripts/vendor/modernizr-3.5.0.min.js"></script>
        <script src="scripts/jquery-3.2.1.js"></script>
        <script src="scripts/bootstrap.js"></script>
        <script src="scripts/bootstrap-confirmation.js"></script>
        <script src="scripts/plugins.js"></script>
        <script src="scripts/moment.js"></script>
        <script src="scripts/moment-timezone.js"></script>
        <script src="scripts/simpleUpload.js"></script>
        <script src="scripts/toast.js"></script>
        <script src="scripts/fr.js"></script>
        <script src="scripts/en.js"></script>
        <script src="scripts/de.js"></script>
        <script src="scripts/common.js"></script>
        <script src="scripts/work.js"></script>
    </div>
    <script>


        window.manager = window.workManager();
        window.manager.do('init');
        
        
        // change the look of bootstrap buttons for fun !
        $(".appliquer-button").each(function () {
            var goGreen = 0;
            var goRed = 0;
            var offset = 15;
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
        });

        $('#portraitzone').on('dragenter', function () {
            $(this).css('border', '3px dashed red');
            return false;
        });


        $('#portraitzone').on(
            'dragover',
            function (e) {
                e.preventDefault();
                e.stopPropagation();
                $(this).css('border', '3px dashed red');
                return false;
        });

        $('#portraitzone').on(
            'dragleave',
            function (e) {
                e.preventDefault();
                e.stopPropagation();
                $(this).css('border', '3px dashed #BBBBBB');
                return false;
            }
        )

        $('#portraitzone').on(
        'drop',
        function (e) {
            var id = parseInt($("#Idp").val());
            if (e.originalEvent.dataTransfer && id != -1) {
                if (e.originalEvent.dataTransfer.files.length>0) {
                    e.preventDefault();
                    e.stopPropagation();

                    var items = e.originalEvent.dataTransfer.files;
   
                    var reader = new FileReader();
                    reader.onload = uploadPeople;
                    reader.readAsDataURL(items[0]);
          
                }
            }
        }
    );

        function uploadPeople(evt) {
            var id = parseInt($("#Idp").val());
            var params = { "Id": id, "concern": "people", "description": "" };
            var image = evt.target.result;
            var base64ImageContent = image.split(",")[1];
            var type = image.split(",")[0];
            type = type.split("/")[1];
            type = type.split(";")[0];
            var blob = base64ToBlob(base64ImageContent, 'image/' + type);
            var formData = new FormData();
            formData.append('File', blob);
            formData.append('Id', params.Id);
            formData.append('Type', type);
            formData.append('Concern', params.concern);
            formData.append('Description', params.Iddescription);
            $.ajax({
                type: "post",
                url: "DocumentsFileUpload.ashx",
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
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
                             $("#portraitzone").css('border', '1px solid #bbb');
                         })
                    window.peopleManager.do('init');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    var str = jqXHR.responseText;
                    var obj = JSON.parse(str);
                    $("#alert-message").html("Echec " + obj.Message);
                    $('#alert').modal('show');
                } // end error
            })
        }
    </script>
</body>
</html>


