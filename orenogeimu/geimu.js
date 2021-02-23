enchant();

window.onload = function(){
    const game = new Game(640, 360);
    const bgImgUrl = "hoho.jpg";
    game.preload([bgImgUrl]);
    const yuzuruUrl = "yuzuru.png";
    game.preload([yuzuruUrl]);    
    const yeUrl = "ye.png";
    game.preload([yeUrl]);  
    const baUrl = "ba.png";
    game.preload([baUrl]);
    const nlUrl = "nextlevel.png";
    game.preload([nlUrl]);  
    const yzrUrl = "tada.png";
    game.preload([yzrUrl]);  
    const noUrl = "no.png";
    game.preload([noUrl]); 
    const retryUrl = "retry.png";
    game.preload([retryUrl]);
    const tweetUrl = "tweet.png";
    game.preload([tweetUrl]);

    game.onload = function(){
        let level = 1;
        let phase = 0;
        const mainScene = new Scene();
        game.pushScene(mainScene);

        const bgImg = new Sprite(640, 360);				
		bgImg.moveTo(0, 0);						
        bgImg.image = game.assets[bgImgUrl];	
        mainScene.addChild(bgImg);

        const ye = new Sprite(130, 239);				
		ye.moveTo(380, 130);						
        ye.image = game.assets[yeUrl];	
        mainScene.addChild(ye);

        const yzr = new Sprite(340, 400);
        yzr.scaleX = 0.6;
        yzr.scaleY = 0.6;				
		yzr.moveTo(600, 40);						
        yzr.image = game.assets[yzrUrl];	
        mainScene.addChild(yzr);

        const no = new Sprite(400, 400);
        no.scaleX = 0.36;
        no.scaleY = 0.36;				
		no.moveTo(150, 100);						
        no.image = game.assets[noUrl];	

        const yuzuru = new Sprite(1227, 639);	
        yuzuru.scaleX = 0.1;
        yuzuru.scaleY = 0.1;			
		yuzuru.moveTo(-170, -210);						
        yuzuru.image = game.assets[yuzuruUrl];	
        mainScene.addChild(yuzuru);

        const retry = new Sprite(1227, 639);	
        retry.scaleX = 0.15;
        retry.scaleY = 0.15;			
		retry.moveTo(-490, -190);						
        retry.image = game.assets[retryUrl];	
       
        const tweet = new Sprite(1227, 639);	
        tweet.scaleX = 0.15;
        tweet.scaleY = 0.15;			
		tweet.moveTo(-130, -190);						
        tweet.image = game.assets[tweetUrl];

        const nlBtn = new Sprite(1227, 639);	
        nlBtn.scaleX = 0.1;
        nlBtn.scaleY = 0.1;			
		nlBtn.moveTo(-170, -210);						
        nlBtn.image = game.assets[nlUrl];	

        const scoreText = new Label(); 					
		scoreText.font = "30px Meiryo";				
		scoreText.color = "black";		
		scoreText.width = 400;							
		scoreText.moveTo(0, 10);						
        mainScene.addChild(scoreText);	
        scoreText.text = "レベル：" + level;

        const ba = new Sprite(400, 399);
        ba.scaleX = -0.5;
        ba.scaleY = 0.5;				
		ba.moveTo(-270, 67);						
        ba.image = game.assets[baUrl];	
        mainScene.addChild(ba);

        const bx = new Label(); 					
		bx.font = "30px Meiryo";				
	    bx.color = "black";		
		bx.width = 400;							
		bx.moveTo(0, 30);						

        const winText = new Label(); 					
		winText.font = "30px Meiryo";				
		winText.color = "black";		
		winText.width = 400;							
        winText.moveTo(200, 100);	
        
        const loseText = new Label(); 					
		loseText.font = "30px Meiryo";				
		loseText.color = "black";		
		loseText.width = 400;							
        loseText.moveTo(300, 200);	
        
        yuzuru.ontouchend = function(){
            ye.moveTo(800, 130);
            mainScene.removeChild(yuzuru);
            yzr.moveTo(180, 40);
            if(ba.x>=100&&ba.x<=200){
                phase = 2;
            }
        };

        nlBtn.ontouchend = function(){
            mainScene.removeChild(winText);
            mainScene.removeChild(nlBtn);
            mainScene.addChild(yuzuru);
            yzr.moveTo(600, 40);
            ye.moveTo(380, 130);
            phase = 0;
            level++;
        };

        retry.ontouchend = function(){
            mainScene.removeChild(loseText);
            mainScene.removeChild(winText);
            mainScene.removeChild(no);
            mainScene.removeChild(retry);
            mainScene.removeChild(tweet);
            ye.moveTo(380, 130);
            yzr.moveTo(600, 40);
            mainScene.addChild(yuzuru);

            phase = 0;
            level = 1;
        };
        
    var theta = 0;
    game.onenterframe = function () {
        
        theta += 0.4;
        if(phase == 0){
            ba.x = -270;
            ba.y = 67;
            phase = 1;
        }
        if(level==1&&phase==1){
            ba.x += 5;
        }
        if(level==2&&phase==1){
            ba.x += 15;
        }
        if(level==3&&phase==1){
            ba.x += 25;
        }
        if(level==4&&phase==1){
            ba.x += 5 + 23*Math.sin(theta);
        }
        if(level==5&&phase==1){
            ba.x += Math.exp((ba.x+271)/100);
        }
        if(phase == 2&&level==5){
            ba.x += 0;
            winText.text = "YOU WIN!!!!";	
            mainScene.addChild(winText);		
			mainScene.addChild(retry);
			mainScene.addChild(tweet);
        }
        if(phase == 2&&level!=5){
            ba.x += 0;
            winText.text = "ゆずれた！！";			
			mainScene.addChild(winText);
			mainScene.addChild(nlBtn);
        }
        if(ba.x>=500){
            loseText.text = "ゆずれんかった。。。";			
            mainScene.addChild(loseText);
            mainScene.addChild(no);
            mainScene.addChild(retry);
            mainScene.addChild(tweet);
            ye.moveTo(800, 130);
            mainScene.removeChild(yuzuru);
            yzr.moveTo(600, 40);
            ba.x = 800;
        }
        scoreText.text = "レベル：" + level;
    };
    };
    game.start();
};
