app.directive("accordionItem", function() {
    return {
        templateUrl: "accordion-item.html",
        restrict: "E",
        transclude: true,
        scope: {
            title: "@"
        },
        link: function(scope, element, attrs, ctrl, transcludeFn) {
            element.bind("click", function() {
                scope.$apply(function() {
                    scope.showDescription = !scope.showDescription;
                });
            });
        }
    };
});
