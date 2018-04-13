$(function(){
    var css = editor('cssCode', 'css');
    var html = editor('htmlCode', 'xml');
    var js = editor('jsCode', {name: "javascript", json: true});


    $("#btnRun").on('click', function() {

        var xtrnalCSS = '<link type="text/css" rel="stylesheet" href="'+$("#externalCSS").val()+'" />';
        var xtrnalJS = '<script src="'+$("#externalJS").val()+'"></script>';

        $('#resultViewer').contents().find('html').html(xtrnalCSS+"<style>"+css.getValue()+"</style>"+html.getValue()+xtrnalJS);
        document.getElementById('resultViewer').contentWindow.eval( js.getValue() );
    });

    $("#fullscreen").on('click', function(){
        if($("#resultViewer").hasClass('fullscreen')) {
            $("#fullscreen").text("fullscreen");
            $("#fullscreen").removeClass("label-danger");
            $("#resultViewer").removeClass('fullscreen')
            $("#area2").removeClass('fullscreen')
            $("#tre").toggle();
        }else{
            $("#fullscreen").text("minimize");
            $("#fullscreen").addClass("label-danger");
            $("#resultViewer").addClass('fullscreen');
            $("#area2").addClass('fullscreen');
            $("#tre").toggle();
        }

    });
});

function editor(id, mode) {
    return CodeMirror.fromTextArea(document.getElementById(id), {
        autoCloseBrackets: true,
        autoCloseTags: true,
        indentUnit: 2,
        lineNumbers: true,
        mode: mode,
        smartIndent: true,
        tabSize: 2,
        theme: "dracula",
    });
}
