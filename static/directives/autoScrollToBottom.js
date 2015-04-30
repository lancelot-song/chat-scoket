//创建自动滚动至底部的指令 tip：指令中'-'连接的命令需要用大写替代
nodeApp.directive('autoScrollToBottom',function(){
    return {
        link : function(scope,element,attrs){
            scope.$watch(
                function(){
                    return element.children().length;
                },
                function(){
                    element.animate({
                        scrollTop : element.prop('scrollHeight')
                    },1000);
                }
            )

        }
    }
})
