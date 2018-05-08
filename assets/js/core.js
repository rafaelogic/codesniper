$(function(){
    var css = editor('cssCode', 'css');
    var html = editor('htmlCode', 'xml');
    var js = editor('jsCode', {name: "javascript", json: true});

    resizeW();
    
    $("#xternal-lists").append(genelem(`https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css`, 'warning'));
    $("#xternal-lists").append(genelem(`https://code.jquery.com/jquery-3.2.1.slim.min.js`, 'danger'));
    $("#xternal-lists").append(genelem(`https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js`, 'danger'));

    $(window).resize(function(){
        resizeW();
        refreshCodeMirror();
    })


    $("#btnRun").on('click', function() {
        result();
    });

    $("#fullscreen").on('click', function(){
        if($("#resultViewer").hasClass('fullscreen')) {
            $("#fullscreen").html(`<i class="fas fa-arrows-alt"></i> fullscreen`);
            $("#fullscreen").removeClass("badge badge-danger");
            $("#resultViewer").removeClass('fullscreen')
            $("#tre").toggle();
        }else{
            $("#fullscreen").html(`<i class="fas fa-window-minimize"></i> minimize`);
            $("#fullscreen").addClass("badge badge-danger");
            $("#resultViewer").addClass('fullscreen');
            $("#tre").toggle();
        }
    });

    $(".nav-link").on('click', function(){
        refreshCodeMirror();
    });

    $("#addUrl").on('click', function() {
        $("#xternal-lists").append(genelem($("#xternalUrl").val()));
        result();
    });

    //remove the loaded generated element
    $(".delter").on('click', function(e) {
        e.preventDefault();
        $(e.target).closest('.input-group').remove();
        result();
    });

    //remove the generated element when adding new url
    $(document).on('click', 'button[name]', function(e){
        e.preventDefault();
        $(this).closest('.input-group').remove();
        result();
    });

    function result(){
        var cssUrls = "";
        var jsUrls = "";
        var cssRx = /^https.*.css$/;
        var jsRx = /^https.*.js$/;

        $('.xtrnal-url').each(function() {
            var url = $(this).val();

            if(cssRx.test($(this).val())) {
                cssUrls += `<link type="text/css" rel="stylesheet" href="${url}" />`;
            }

            if(jsRx.test($(this).val())) {
                jsUrls += `<script src="${url}" ></script>`;
            }
        });

        $('#resultViewer').contents().find('html').html(cssUrls+"<style>"+css.getValue()+"</style>"+html.getValue()+jsUrls);
        document.getElementById('resultViewer').contentWindow.eval( js.getValue() );
    }

    function refreshCodeMirror(){
        css.refresh();
        html.refresh();
        js.refresh();
    }
});

function editor(id, mode) {
    return CodeMirror.fromTextArea(document.getElementById(id), {
        autoCloseBrackets: true,
        autoCloseTags: true,
        indentUnit: 2,
        lineNumbers: true,
        mode: mode,
        tabSize: 2,
        theme: "dracula",
    });
}

function genelem(url, color){
    return `<div class="input-group">
    <input type="text" class="xtrnal-url form-control" value="${url}">
    <span class="input-group-btn">
        <button class="btn btn-${color} smbtn delter" type="button" name="remUrl" id="remUrl"><i class="far fa-trash-alt"></i></button>
    </span>
    </div>`;
}

function resizeW() {
    var wHeight = $(window).height();
    $(".CodeMirror").height(wHeight - 200);
}

