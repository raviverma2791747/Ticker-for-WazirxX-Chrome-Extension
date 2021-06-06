(function trades() {
    var children = document.getElementsByClassName("kQIVYP")[0];
    children.scrollIntoView(false);
    children = children.children[0].children;
    var json_data = { trades: [] , currencies : []};
    for (var i = 0; i < children.length; i++) {
        trade = {};
        if (children[i].classList.contains("eVNcjS") || children[i].classList.contains("blXZKS")) {
            if (children[i].classList.contains("eVNcjS")) {
                trade["type"] = "buy";
            }
            else {
                trade["type"] = "sell";
            }
            raw_data = children[i].innerText.split("\n");
            trade["base_unit"] = raw_data[0];
            if(json_data["currencies"].indexOf(raw_data[0]) === -1) {
                json_data["currencies"].push(raw_data[0]);
            }
            trade["quote_unit"] = raw_data[1];
            trade["volume"] = parseFloat(raw_data[3].replace(/,/g,''));
            trade["price"] = parseFloat(raw_data[4].replace(/,/g,''));
            trade["date"] = raw_data[raw_data.length-2];
            json_data["trades"].push(trade);
        }
    }
    var download = document.createElement('a');
    document.getElementsByTagName('body')[0].appendChild(download);
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json_data));
    download.setAttribute("href", dataStr);
    download.setAttribute("download", "trades.json");
    download.click();
})();
