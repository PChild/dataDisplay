var draggies = [];

$(function () {

    $(document).ready(function () {


        var $container = $('.packery').packery({
            columnWidth: 0,
            rowHeight: 0,
            "gutter": 0
        });

        var voltageStamped = false,
            pressureStamped = false,
            solenoidStamped = false,
            currentStamped = false,
            gyroStamped = false,
            encoderStamped = false,
            ultraStamped = false;


        $container.find('.draggable').each(function (i, itemElem) {
            // make element draggable with Draggabilly
            var draggie = new Draggabilly(itemElem);
            draggies.push(draggie);
            // bind Draggabilly events to Packery
            $container.packery('bindDraggabillyEvents', draggie);
        });

        $("#voltageLink").on('click', function () {
            $(this).children('.mdi-content-add, .mdi-content-remove').toggleClass("mdi-content-add, mdi-content-remove");
            updateWindow();
            $container.packery();
        });

        $("#voltFull").on('click', function () {
            $(this).children('.mdi-navigation-fullscreen, .mdi-navigation-fullscreen-exit').toggleClass("mdi-navigation-fullscreen mdi-navigation-fullscreen-exit");
            var $target = $("#voltageCol")
            $("#voltageCol").toggleClass("col-md-6 col-md-12 col-lg-6 col-lg-12");
            $container.packery();
        });

        $("#voltPin").on('click', function () {
            $(this).children('.mdi-toggle-check-box-outline-blank, .mdi-toggle-check-box').toggleClass("mdi-toggle-check-box-outline-blank mdi-toggle-check-box");
            var $stamp = $('#voltageCol');
            if (voltageStamped) {
                $container.packery('unstamp', $stamp);
            } else {
                $container.packery('stamp', $stamp);
            }
            // trigger layout
            $container.packery();
            voltageStamped = !voltageStamped;
        });

        $("#pressureLink").on('click', function () {
            $(this).children('.mdi-content-add, .mdi-content-remove').toggleClass("mdi-content-add, mdi-content-remove");
            updateWindow();
            $container.packery();
        });

        $("#pressureFull").on('click', function () {
            $("#pressureCol").toggleClass("col-md-6 col-md-12 col-lg-6 col-lg-12");
            $(this).children('.mdi-navigation-fullscreen, .mdi-navigation-fullscreen-exit').toggleClass("mdi-navigation-fullscreen mdi-navigation-fullscreen-exit");
            $container.packery();
        });

        $("#pressurePin").on('click', function () {
            $(this).children('.mdi-toggle-check-box-outline-blank, .mdi-toggle-check-box').toggleClass("mdi-toggle-check-box-outline-blank mdi-toggle-check-box");
            var $stamp = $('#pressureCol');
            if (pressureStamped) {
                $container.packery('unstamp', $stamp);
            } else {
                $container.packery('stamp', $stamp);
            }
            // trigger layout
            $container.packery();
            pressureStamped = !pressureStamped;
        });

        $("#gyroLink").on('click', function () {
            $(this).children('.mdi-content-add, .mdi-content-remove').toggleClass("mdi-content-add, mdi-content-remove");
            updateWindow();
            $container.packery();
        });

        $("#gyroFull").on('click', function () {
            $("#gyroCol").toggleClass("col-md-6 col-md-12 col-lg-6 col-lg-12");
            $(this).children('.mdi-navigation-fullscreen, .mdi-navigation-fullscreen-exit').toggleClass("mdi-navigation-fullscreen mdi-navigation-fullscreen-exit");
            $container.packery();
        });

        $("#gyroPin").on('click', function () {
            $(this).children('.mdi-toggle-check-box-outline-blank, .mdi-toggle-check-box').toggleClass("mdi-toggle-check-box-outline-blank mdi-toggle-check-box");
            var $stamp = $('#gyroCol');
            if (gyroStamped) {
                $container.packery('unstamp', $stamp);
            } else {
                $container.packery('stamp', $stamp);
            }
            // trigger layout
            $container.packery();
            gyroStamped = !gyroStamped;
        });

        $("#currentLink").on('click', function () {
            $(this).children('.mdi-content-add, .mdi-content-remove').toggleClass("mdi-content-add, mdi-content-remove");
            updateWindow();
            $container.packery();
        });

        $("#currentFull").on('click', function () {
            $("#currentCol").toggleClass("col-md-6 col-md-12 col-lg-6 col-lg-12");
            $(this).children('.mdi-navigation-fullscreen, .mdi-navigation-fullscreen-exit').toggleClass("mdi-navigation-fullscreen mdi-navigation-fullscreen-exit");
            $container.packery();
        });

        $("#currentPin").on('click', function () {
            $(this).children('.mdi-toggle-check-box-outline-blank, .mdi-toggle-check-box').toggleClass("mdi-toggle-check-box-outline-blank mdi-toggle-check-box");
            var $stamp = $('#currentCol');
            if (currentStamped) {
                $container.packery('unstamp', $stamp);
            } else {
                $container.packery('stamp', $stamp);
            }
            // trigger layout
            $container.packery();
            currentStamped = !currentStamped;
        });

        $("#encoderLink").on('click', function () {
            $(this).children('.mdi-content-add, .mdi-content-remove').toggleClass("mdi-content-add, mdi-content-remove");
            updateWindow();
            $container.packery();
        });

        $("#encoderFull").on('click', function () {
            $("#encoderCol").toggleClass("col-md-6 col-md-12 col-lg-6 col-lg-12");
            $(this).children('.mdi-navigation-fullscreen, .mdi-navigation-fullscreen-exit').toggleClass("mdi-navigation-fullscreen mdi-navigation-fullscreen-exit");
            $container.packery();
        });

        $("#encoderPin").on('click', function () {
            $(this).children('.mdi-toggle-check-box-outline-blank, .mdi-toggle-check-box').toggleClass("mdi-toggle-check-box-outline-blank mdi-toggle-check-box");
            var $stamp = $('#encoderCol');
            if (encoderStamped) {
                $container.packery('unstamp', $stamp);
            } else {
                $container.packery('stamp', $stamp);
            }
            // trigger layout
            $container.packery();
            encoderStamped = !encoderStamped;
        });

        $("#ultraLink").on('click', function () {
            $(this).children('.mdi-content-add, .mdi-content-remove').toggleClass("mdi-content-add, mdi-content-remove");
            updateWindow();
            $container.packery();
        });

        $("#ultraFull").on('click', function () {
            $("#ultraCol").toggleClass("col-md-6 col-md-12 col-lg-6 col-lg-12");
            $(this).children('.mdi-navigation-fullscreen, .mdi-navigation-fullscreen-exit').toggleClass("mdi-navigation-fullscreen mdi-navigation-fullscreen-exit");
            $container.packery();
        });
        $("#ultraPin").on('click', function () {
            $(this).children('.mdi-toggle-check-box-outline-blank, .mdi-toggle-check-box').toggleClass("mdi-toggle-check-box-outline-blank mdi-toggle-check-box");
            var $stamp = $('#ultraCol');
            if (ultraStamped) {
                $container.packery('unstamp', $stamp);
            } else {
                $container.packery('stamp', $stamp);
            }
            // trigger layout
            $container.packery();
            ultraStamped = !ultraStamped;
        });

        $("#solenoidLink").on('click', function () {
            $(this).children('.mdi-content-add, .mdi-content-remove').toggleClass("mdi-content-add, mdi-content-remove");
            updateWindow();
            $container.packery();
        });

        $("#solenoidFull").on('click', function () {
            $("#solenoidCol").toggleClass("col-md-6 col-md-12 col-lg-6 col-lg-12");
            $(this).children('.mdi-navigation-fullscreen, .mdi-navigation-fullscreen-exit').toggleClass("mdi-navigation-fullscreen mdi-navigation-fullscreen-exit");
            $container.packery();
        });

        $("#solenoidPin").on('click', function () {
            $(this).children('.mdi-toggle-check-box-outline-blank, .mdi-toggle-check-box').toggleClass("mdi-toggle-check-box-outline-blank mdi-toggle-check-box");
            var $stamp = $('#solenoidCol');
            if (ultraStamped) {
                $container.packery('unstamp', $stamp);
            } else {
                $container.packery('stamp', $stamp);
            }
            // trigger layout
            $container.packery();
            ultraStamped = !ultraStamped;
        });


        function updateWindow() {
            setInterval(function () {
                $(window).resize();
            }, 1000);
        };
    });
});