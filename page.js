document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("refresh").addEventListener("click", () => {
        update();
    })

    var menuItems = document.getElementById("menu").children;
    var mil = menuItems.length;
    for (var i = 0; i < mil; i++) {
        menuItems[i].onclick = function () {
            var mI = document.getElementById("menu").children;
            var miL = mI.length;
            for (var j = 0; j < miL; j++) {
                mI[j].classList.remove("active");
            }
            this.classList.add("active");

            var tabs = document.getElementById("tabs").children;
            var tl = tabs.length;
            for (var j = 0; j < tl; j++) {
                if (this.dataset.tab == tabs[j].id) {
                    tabs[j].classList.remove("d-none");
                } else {
                    tabs[j].classList.add("d-none");
                }
            }
        }
    }

    function construct() {
        const Http = new XMLHttpRequest();
        const url = "https://api.wazirx.com/api/v2/tickers";
        Http.open("GET", url);
        Http.send();
        Http.onreadystatechange = (e) => {
            try {
                const data = JSON.parse(Http.responseText);
                for (let [key, value] of Object.entries(data)) {
                    document.getElementById(value["quote_unit"]).appendChild(construct_card(key, value));
                }
            } catch {

            }
        }
    }

    function construct_card(id, data) {
        var card = document.createElement("div");
        card.className = "card d-flex w-100 align-items-center";
        card.id = id;

        /*chrome.storage.local.get([id], function (result) {
            var old_data = Object.values(result)[0];
            var change = 0;
            if (old_data) {
                change = (old_data["last"] - data["last"]) / old_data["last"];
                change = Math.round(change * 100) / 100
            }

            var clr = "bg-red";

            if (change > 0 && change != NaN) {
                clr = "bg-green";
            }
            var changeEle = document.getElementById(data["base_unit"]+data["quote_unit"]).children[2];
            changeEle.classList.add(clr);
            changeEle.innerText = change + "%";
        });*/

        const unit = {
          'inr' : '&#8377;',
          'usdt' : '&#36;',
          'wrx' : 'WRX',
          'btc' : 'BTC'
        }

        let quote_unit = unit[data['quote_unit']];

        card.innerHTML = `
         <div class="d-flex flex-column">
            <span class="fw-bold text-light">`+ data["name"] + `</span>
            <span><small></small></span>
         </div>
         <div class="flex-grow-1 text-end p-10 fw-bold text-light">
          `+quote_unit +` `+ data["last"] + `
         </div>
        <!--div class="btn text-light bg-red m-10">0&percnt;</div-->
        `
        /*var obj = {};
        obj[id] = data;
        chrome.storage.local.set(obj, function () {
        });
*/
        return card;
    }

    function update() {
        const Http = new XMLHttpRequest();
        const url = "https://api.wazirx.com/api/v2/tickers";
        Http.open("GET", url);
        Http.send();
        Http.onreadystatechange = (e) => {
            try {
               const data = JSON.parse(Http.responseText);
               for (let [key, value] of Object.entries(data)) {
                document.getElementById(key).children[1].innerHTML = ' &#8377; ' + value["last"];
            }
            } catch {

            }
        }
    }

    construct();
});
