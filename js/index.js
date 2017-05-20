function getSelectionText(target) {
    var text = '';
    if (target && target.selectionStart) {
        // works on inputs / textarea
        var start = target.selectionStart;
        var end = target.selectionEnd;
        text = target.value.substring(start, end)
    } else if (window.getSelection) {
        // works on text nodes, E.g. contents of a <p>
        text = window.getSelection().toString();
    }
    return text;
}

function resetKeyMonitor(time){
    $('#resetMessage').show();
    $('#resetMessage').fadeOut(time, function(){
        $('#keyDown, #keyPress, #keyUp').removeClass('success');
        $('#keyDown, #keyPress, #keyUp').addClass('failure');
    });
}

$(document).ready(function () {

    // tracking mousemove and scroll in the DOM is pretty expensive

    // scroll event
    // track and display the vertical scroll position
    $(window).scroll(function () {
        // only working in Chrome?
        var scrollPosition = parseInt($(window).scrollTop());
        $('#scroll-overlay').text('Scroll: ' + scrollPosition);
    });
    // mousemove event
    // when the mouse moves, pass in the event data to the following function,
    // so that the mouse position can be tracked
    $(window).mousemove(function (ev) {
        // store the current x and y positions of the mouse from the mousemove event
        mouseX = ev.pageX;
        mouseY = ev.pageY;
        // show the x and y values of the mouse position in the corresponding overlay
        $('#mouse-overlay').text('Mouse: ' + mouseX + ', ' + mouseY);
    });

    // Hover should normally be in CSS, but the jQuery functionality is demonstrated here
    $('a[href="#change-panel"]').hover(function () {
        $('a[href="#change-panel"]>.circle>.circle-content>.fa').toggleClass('fa-circle-o fa-dot-circle-o');
    });

    // key events
    $('#resetMessage').hide();
    $('#txtKeyEventsField').keydown(function (ev) {
        $('#keyDown').removeClass('failure').addClass('success');
        resetKeyMonitor(1000);
    });
    $('#txtKeyEventsField').keypress(function (ev) {
        $('#keyPress').removeClass('failure').addClass('success');
        resetKeyMonitor(1000);
    });
    $('#txtKeyEventsField').keyup(function (ev) {
        $('#keyUp').removeClass('failure').addClass('success');
        resetKeyMonitor(1000);
    });

    // select event
    $('#txtSelectEventTarget').select(function (ev) {
        $('#selectMessage').text(
            'Text is: ' + getSelectionText(ev.target)
        ).removeClass('failure').addClass('success');
    });

    // change event
    $('input[name="radChangeEvent"]').change(function (ev) {
        $('#radStatus').removeClass('failure');
        $('#radStatus').addClass('success');
        $('#radStatus').html(
            'The current radio selection is radio button ' +
            '<strong>' +
            $(this).val() +
            '</strong>'
        );
    });

    // click event
    $('#btnFace').click(function () {
        $('#btnFace.circle>.circle-content>.fa').toggleClass('fa-frown-o fa-smile-o');
    });

    // Bind to the click event on submit button
    $('#btnSubmit').click(function (ev) {
        // Prevent postback and bring the response div back inti the DOM on submit button click
        ev.preventDefault();
    });
});
