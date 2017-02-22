/**
 * Created by Administrator on 2016/10/22 0022.
 */
//获得画布对象
var chess = document.getElementById("chess");
//画布上下文为2D
var context = chess.getContext("2d");
//创建一个me变量，如果true就是黑子，false是白子
var me = true;
//创建二维数组阻止棋盘上的交叉点有棋子落下不能再放棋子
var chessBoard = [];
for(var i=0;i<15;i++){
    chessBoard[i] = [];
    for(var j=0;j<15;j++){
    chessBoard[i][j] = 0;
    }
}

//绘制路径颜色
context.strokeStyle = "#BFBFBF";

//添加水印
var image = new Image();
image.src = "img/img2.gif";
//在图片加载完绘制棋盘，实现水印在棋盘的下面
image.onload = function(){
    context.drawImage(image,-30,-20,450,450);
    drawChessBoard();
    // oneStep(0,0,true);
    // oneStep(1,1,false)
}
//绘制棋盘
var drawChessBoard = function(){
    for(var i=0;i<15;i++){
        context.moveTo(15 + i*30,15)
        context.lineTo(15 + i*30,435);
        context.stroke();
        context.moveTo(15,15 + i*30);
        context.lineTo(435,15 + i*30);
        context.stroke();
    }
}

//画棋子
function oneStep(i,j,me){
    context.beginPath();
    context.arc(15 + i*30,15 + j*30,13,0,2*Math.PI);
    context.closePath();
    var gradient = context.createRadialGradient(15 + i*30 +2,15 + j*30 - 2,13,15 + i*30 + 2,15 + j*30 -2,0);
    //黑子
    if(me){
        gradient.addColorStop(0, "#0A0A0A");
        gradient.addColorStop(1, "#636766");
    }
    //白子
    else{
        gradient.addColorStop(0, "#D1D1D1");
        gradient.addColorStop(1, "#F9F9F9");
    }
    context.fillStyle = gradient;
    context.fill();
}
//实现鼠标点击棋子落下
chess.onclick = function(evt){
    var e = evt||window.event;
    var x= e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    //一旦棋子落下不能再放置其他棋子
    if(chessBoard[i][j]==0){
        oneStep(i,j,me);
        if(me){
            chessBoard[i][j]=2;
        }else{
            chessBoard[i][j]=3;
        }
    }

    me = !me;
}



