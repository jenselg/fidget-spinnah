function startApp(){
    
    if(navigator.splashscreen) {
        navigator.splashscreen.hide();
    }

    if (device.platform == "Android") {
        admobid = {
            banner: 'ca-app-pub-8133264651158274/2333118143'
        }
    } /*else if (device.platform == "iOS") {
        admobid = {
            banner: 'ca-app-pub-8133264651158274/2126785343',
            interstitial: 'ca-app-pub-8133264651158274/3603518548'
        }
    }*/

    if(AdMob && device.platform != 'browser'){
        AdMob.createBanner({
            adId: admobid.banner,
            position: AdMob.AD_POSITION.BOTTOM_CENTER,
            autoShow: true
        });
        
    }

	//PHASER
	var game = new Phaser.Game(320, 480, Phaser.AUTO, "game");
    game.state.add('spinner', spinner);
	game.state.start('spinner');

}
document.addEventListener('deviceready', startApp, false);