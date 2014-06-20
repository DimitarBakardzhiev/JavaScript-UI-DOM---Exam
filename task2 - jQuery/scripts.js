$.fn.gallery = function (cols) {
    if (!cols) {
        cols = 4;
    }

    // извинявам за ужасния код

    var $this = this,
        $parentNode = this;
    $this.addClass('gallery');
    $parentNode.find('.gallery-list').css('width', 260 * cols);

    // hide default selected
    $('#previous-image').hide();
    $('#current-image').hide();
    $('#next-image').hide();

    // show enlarged event
    var alreadyEnlarged = false;
    $('.image-container').on('click', function () {
        if (alreadyEnlarged) {
            return;
        }
        var $this = $(this),
            thisData = $this.find('img').attr('data-info');
        $parentNode.find('#current-image').attr('src', $this.find('img').attr('src'))
        .show()
        .attr('data-info', thisData);
        // get previous and next image correctly
        var prevSrc,
            nextSrc;
        if ($this.find('img').attr('data-info') === '1') {
            prevSrc = 'imgs/' + 12 + '.jpg';
        } else {
            var prevImg = parseInt($this.find('img').attr('data-info')) - 1;
            prevSrc = 'imgs/' + prevImg + '.jpg';
        }
        if ($this.find('img').attr('data-info') === '12') {
            nextSrc = 'imgs/' + 1 + '.jpg';
        } else {
            var nextImg = parseInt($this.find('img').attr('data-info')) + 1;
            nextSrc = 'imgs/' + nextImg + '.jpg';
        }
        var prevData,
            nextData;
        if (thisData == 1) {
            prevData = 12;
        } else {
            prevData = parseInt(thisData) - 1;
        }
        if (thisData == 12) {
            nextData = 1;
        } else {
            nextData = parseInt(thisData) + 1;
        }
        //show selected images
        $parentNode.find('#previous-image').attr('src', prevSrc)
        .show()
        .attr('data-info', prevData);
        $parentNode.find('#next-image').attr('src', nextSrc)
        .show()
        .attr('data-info', nextData);
        $parentNode.find('.gallery-list').addClass('blurred');
        alreadyEnlarged = true;
    });

    // restore
    $parentNode.find('.current-image').on('click', function () {
        $parentNode.find('.gallery-list').removeClass('blurred');
        $('#previous-image').hide();
        $('#current-image').hide();
        $('#next-image').hide();
        alreadyEnlarged = false;
    });
    // next
    $parentNode.find('.next-image').on('click', function () {
        var $this = $(this),
            thisData,
            prevData,
            nextData;
        prevData = parseInt($parentNode.find('#previous-image').attr('data-info'));
        nextData = parseInt($parentNode.find('#next-image').attr('data-info'));
        thisData = parseInt($parentNode.find('#current-image').attr('data-info'));
        prevData = add(prevData);
        thisData = add(thisData);
        nextData = add(nextData);
        $parentNode.find('#previous-image').attr('src', $parentNode.find('#current-image').attr('src'))
        .attr('data-info', prevData);
        $parentNode.find('#current-image').attr('src', $this.find('img').attr('src'))
        .attr('data-info', thisData);
        var nextSrc = 'imgs/' + nextData + '.jpg';
        $parentNode.find('#next-image').attr('src', nextSrc)
        .attr('data-info', nextData);
    });

    function add(num) {                    // turn 12 + 1 = 13 to 12 + 1 = 1                 
        var result = parseInt(num) + 1;
        if (result == 13) {
            result = 1;
        }
        return result;
    }
    function subtract(num) {               // turn 1 - 1 = 0 to 1 - 1 = 12
        var result = parseInt(num) - 1;
        if (result == 0) {
            result = 12;
        }
        return result;
    }
    // previous
    $parentNode.find('.previous-image').on('click', function () {
        var $this = $(this),
            thisData,
            prevData,
            nextData;
        prevData = parseInt($parentNode.find('#previous-image').attr('data-info'));
        nextData = parseInt($parentNode.find('#next-image').attr('data-info'));
        thisData = parseInt($parentNode.find('#current-image').attr('data-info'));
        prevData = subtract(prevData);
        thisData = subtract(thisData);
        nextData = subtract(nextData);
        $parentNode.find('#next-image').attr('src', $parentNode.find('#current-image').attr('src'))
        .attr('data-info', nextData);
        $parentNode.find('#current-image').attr('src', $this.find('img').attr('src'))
        .attr('data-info', thisData);
        var prevSrc = 'imgs/' + prevData + '.jpg';
        $parentNode.find('#previous-image').attr('src', prevSrc)
        .attr('data-info', prevData);
    })
};