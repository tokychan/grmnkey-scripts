// ==UserScript==
// @name         rarbg show images with links
// @version      0.2.2
// @description  rarbg
// @author       tkchan
// @include      https://rarbgmirror.com/torrents.php*
// @include      https://rarbgmirror.com/top10
// @include      https://rarbgmirror.org/torrents.php*
// @include      https://rarbgmirror.org/top10
// @include      https://rarbg.to/torrents.php*
// @include      https://rarbg.to/top10
// ==/UserScript==


var hyper, img, tag_a, link, common_rute, oldLink_location;
var className = 'lista2';
var pathName = 'top';

var allRow = document.getElementsByClassName(className);
const regex = /(?:http|https):\/\/((?:[\w-]+)(?:\.[\w-]+)+)(?:[\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g;

//normal or top list page
var aux = !(window.location.href.indexOf(pathName) > -1) ? 1 : 3;
var pos = (aux === 1) ? 0 : 1;


for(var i=0; i<allRow.length; i++ ) {
    /* https://regex101.com */
    while ((hyper = regex.exec(allRow[i].childNodes[aux].firstChild.attributes.onmouseover.nodeValue)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (hyper.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the hyper-variable.
        /*hyper.forEach((match, groupIndex) => {
              console.log(Found match, group ${groupIndex}: ${match});
          });*/
        //console.log(hyper[0])

        common_rute = allRow[i].childNodes[pos];

        link = allRow[i].childNodes[aux].firstChild.href;

        tag_a = document.createElement("a");
        img = document.createElement("img");

        tag_a.href = link; //link -> torrent

        img.src = hyper[0]; //hyper[0] -> link to img

        tag_a.appendChild(img); //<a><img></a>

        oldLink_location = common_rute.firstChild;

        common_rute.removeChild(oldLink_location);
        common_rute.appendChild(tag_a);
    }
}
