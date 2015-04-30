//创建发送指令
nodeApp.directive('ctrlEnterBreakLine',function(){
    return function(scope,element,attrs){
        var ctrldown = false;
        element.bind('keydown',function(evt){
            if(evt.which == 17){
                ctrldown = true;
            }
            setTimeout(function(){
                ctrldown = false;
            },1000)
            if(evt.which == 13){
                if(ctrldown == true){
                    element.val(element.val()+'\n')
                }else{
                    scope.$apply(function(){
                        scope.$eval(attrs.ctrlEnterBreakLine);
                    })
                    evt.preventDefault();
                }
            }
        })
    }
})