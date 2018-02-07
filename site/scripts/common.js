
var translations = { "en": words_en, "fr": words_fr, "de": words_de };

var arrLanguages = [
    { "language": "fr", "culture": "fr-FR", "img": "fr.jpg", "label": "Français" },
    { "language": "en", "culture": "en-US", "img": "en.jpg", "label": "English" },
    { "language": "de", "culture": "de-DE", "img": "de.jpg", "label": "German" }
]

var userLang = document.cookie.replace(/(?:(?:^|.*;\s*)language\s*\=\s*([^;]*).*$)|^.*$/, "$1");

if (userLang == "") {
    userLang = navigator.language || navigator.userLanguage;
    userLang = userLang.substr(0, 2);
    document.cookie = "language=" + userLang;
}
var found = false;
var culture = "";
for(lang of arrLanguages) {
    if (userLang == lang.language) {
        found = true;
        culture = lang.culture;
    }
}

if (!found) {
    userLang = "en";
    culture = "en-US";
}
var html = "";
var pos = -1;
for (var i = 0; i < arrLanguages.length; i++) {
    if (arrLanguages[i].language === userLang) {
        html += "<li class='active'>";
        $("#btnLang img").attr("src", "img/" + arrLanguages[i].img);
    } else {
        html += "<li>";
    }
    html += "<a class='CultureInfo' data-culture='" + arrLanguages[i].culture + "'>";
    html += "<img src='img/" + arrLanguages[i].img + "' width='20' />&nbsp;&nbsp;";
    html += arrLanguages[i].label + "</a></li>";
}

$("#menuLanguage").html(html);

$(".dropdown-menu li").on("click", function () {
    culture = $(this).find("a").attr("data-culture");
    var img = $(this).find("img").attr("src");
    $(".dropdown-menu li").removeClass("active");
    $(this).addClass("active");
    $("#btnLang img").attr("src", img);
    var arr = culture.split("-");
    if (arr.length == 2) {
        userLang = arr[0];
        document.cookie = "language=" + userLang;
        getTranslations(userLang);
        window.manager.do('drawTable');

    }

});

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
// loadinf js files when needed and lauching managers
var load = function (menuItem) {
    if (menuItem === "knowledge") {
        // Get the div#scripts and search for the knowledge js src
        var aScript = $("#scripts [src='scripts/knowledge.js']");
        if (aScript.length === 0) { // if not loaded then load it
            var script = document.createElement('script');
            script.src = 'scripts/knowledge.js';
            document.getElementById("scripts").appendChild(script);
        }
    }
    else if (menuItem === "people") {
        var aScript = $("#scripts [src='scripts/people.js']");
        if (aScript.length === 0) { // if not loaded then load it
            var script = document.createElement('script');
            script.src = 'scripts/people.js';
            document.getElementById("scripts").appendChild(script);
        }

    }

}

// knowledgeManager
var launchKnowHowManager = function () {
    window.knowHowManager = window.knowledgeManager();
    window.knowHowManager.do('init');


}
 

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
                toastMsg.text(translate("peopleCardUpdateSuccess"));
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
                toastMsg.text(translate("peopleCardUpdateFail"));
                var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                toastMsg.moveAt(w / 2 - 100, 90);
                toastMsg.showFor(3000);


            } // end error
        }); // end ajax
    });
}



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
    return paris.format().split("+")[0];
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

function getTranslations(lang) {
    if (lang == "fr" || lang == "en" || lang == "de") {
        doTranslate(translations[lang]);
    } else {
        doTranslate(translations["en"]);
    }

}


function translate(key) {
    var output = key;
    var dict = translations[userLang];
    if (dict) {
        var value = dict[key];
        if (value) {
            output = value;
        }
    }
    return output;
}

function doTranslate(tranlations) {
    localDate = tranlations["localDate"];
    $("[data-translate]").each(function () {
        var key = $(this).attr("data-translate");
        var value = tranlations[key];
        if (value) $(this).html(value);
    });
    $("[for]").each(function () {
        var key = $(this).attr("for");
        var value = tranlations[key];
        if (value) $(this).html(value);
    });
}


var Detect = {
    init: function () {
        this.OS = this.searchString(this.dataOS);
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            }
            else if (dataProp)
                return data[i].identity;
        }
    },
    dataOS: [
        {
            string: navigator.platform,
            subString: 'Win',
            identity: 'Windows'
        },
        {
            string: navigator.platform,
            subString: 'Mac',
            identity: 'macOS'
        },
        {
            string: navigator.userAgent,
            subString: 'iPhone',
            identity: 'iOS'
        },
        {
            string: navigator.userAgent,
            subString: 'iPad',
            identity: 'iOS'
        },
        {
            string: navigator.userAgent,
            subString: 'iPod',
            identity: 'iOS'
        },
        {
            string: navigator.userAgent,
            subString: 'Android',
            identity: 'Android'
        },
        {
            string: navigator.platform,
            subString: 'Linux',
            identity: 'Linux'
        }
    ]
};
Detect.init();
window.operatingSystem = Detect.OS;

function htmlEncode(value) {
    return $('<div/>').text(value).html();
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}

function base64ToBlob(base64, mime) 
{
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
        var slice = byteChars.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: mime});
}
