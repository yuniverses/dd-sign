

function zoomImg(obj){          
    // 一开始默认是100%         
     let zoom = parseInt(obj.style.zoom, 10) || 100;       
       // 滚轮滚一下wheelDelta的值增加或减少120         
     zoom += event.wheelDelta/12;      
        if(zoom>0)    {          
     obj.style.zoom = zoom + '%';  
      }    
        return false;      
    }