var panel;

function setup(yymmdd, prev, next, desc, issueNumber, links) {
    document.title = yymmdd;
    QuickSettings.useExtStyleSheet();
    panel= QuickSettings.create(10, 10, yymmdd)
        .addHTML("home", '<a href="https://gamkedo-la.github.io/solo-practice-sandbox/rybar">INDEX</a>');

    var prevNext = '';
    if(prev) {
        prevNext += '<a href="' + prev + '.html">PREV</a>';
        if(next) {
            prevNext += " - ";
        }
    }
    if(next) {
        prevNext += '<a href="' + next + '.html">NEXT</a>'
    }

    panel
        .addHTML('social','<a href="https://gamkedo-la.github.io/solo-practice-sandbox/rybar/dailies/' + yymmdd + '.js"><img src="../images/github.png"></a></a><a href="https://twitter.com/home?status=Check it: http://gamkedo-la.github.io/solo-practice-sandbox/rybar/dailies #javascript ' + yymmdd + '.html"><img src="../images/twitter.png"></a><a href="https://www.facebook.com/sharer.php?u=http://gamkedo-la.github.io/solo-practice-sandbox/rybar/dailies/' + yymmdd + '.html&picture=http://gamkedo-la.github.io/solo-practice-sandbox/rybar/thumbs/' + yymmdd + '.png"><img src="../images/facebook.png"></a>')
        .addHTML("hide", "H key toggles panel")
        .addHTML("prev_next", prevNext)
        .addHTML("Description", desc)
        // .addButton("full", function(value){  C.webkitRequestFullscreen() })

        if(links) {
            panel.addHTML("Links", "");
            for(var i = 0; i < links.length; i++) {
                panel.addHTML("link" + i, links[i]);
            }
        }
    panel
        .hideAllTitles()
        //.showTitle("Source, Comments, Social")
        .showTitle("Description")
        .setKey("h");

    if(links) {
        panel.showTitle("Links");
    }

    var script = document.createElement("script");
    script.src = yymmdd + ".js";
    document.body.appendChild(script);
    
}
