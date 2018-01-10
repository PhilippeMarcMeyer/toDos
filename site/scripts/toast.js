
function toast(htmlZone, toastId, onParent, style) {
    this.style = (style || "display:none;position:absolute;padding:4px;color:white;background-color:rgba(90, 90, 90, 0.7);border-radius:5px;text-align:center;cursor:hand;cursor:pointer;padding: 3px;border: 1px solid #555;width:200px;box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);")
    this.html = "<div id='" + toastId + "' style='" + this.style + "'></div>";
    this.onParent = (onParent || false);
    if (this.onParent)
        this.ParentPtr = parent.document.getElementById(htmlZone);
    else
        this.ParentPtr = document.getElementById(htmlZone);

    this.ToastPtr = null;
    if (this.ParentPtr) {
        this.ParentPtr.innerHTML = this.html;
        if (this.ParentPtr.querySelectorAll) {
            this.ToastPtr = this.ParentPtr.querySelectorAll("#" + toastId)[0];
        } else {
            if (this.onParent)
                this.ToastPtr = parent.document.getElementById(toastId);
            else
                this.ToastPtr = document.getElementById(toastId);
        }
    }
    // We need to stay absolute
    if (this.ToastPtr) {
        this.ToastPtr.style.position = "absolute";
    }
    // ------- methods
    this.hide = function () {
        if (this.ToastPtr) {
            this.ToastPtr.style.display = "none";
        }
    }
    this.show = function () {
        if (this.ToastPtr) {
            this.ToastPtr.style.display = "block";
        }
    }
    // If you don't move and dont provide a style left and top attribute in the style parametre
    // then without moveAt the toast will appear at its relative position
    // If you use moveAt, location is absolute 
    this.moveAt = function (x, y) {
        if (this.ToastPtr) {
            this.ToastPtr.style.left = 0;
            this.ToastPtr.style.top = 0;
            this.ToastPtr.style.marginLeft = x + "px";
            this.ToastPtr.style.marginTop = y + "px";
        }
    }
    // fires a timer to hide the toest
    this.showFor = function (millisecs) {
        if (this.ToastPtr) {
            this.ToastPtr.style.display = "block";
            var self = this;
            this.ToastPtr.addEventListener("click", function (event) {
                self.hide();
                event.preventDefault();
            });
            setTimeout(function () {
                self.hide();
            }, millisecs);

        }
    }
    // set the text (you can use html)
    this.text = function (text) {
        if (this.ToastPtr) {
            this.ToastPtr.innerHTML = text;
        }
    }
}
