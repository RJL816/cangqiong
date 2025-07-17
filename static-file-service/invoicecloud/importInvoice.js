console.log("in import2")

function showImportInvoicePage(path) {
    console.log("dd url: " + path)
    dd.biz.util.openLink({
        // url: 'https://www.piaozone.com/test/m4-web/dd/wap/index?userKey=65ed27506d9a1140417379327ed458ba&socketName=' + socketName,
        url: path,
        enableShare: true
    })
    dd.error(function (error) {
        alert('dd error: ' + JSON.stringify(error));
    });
}