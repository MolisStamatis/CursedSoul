﻿'use strict';

// ================================================
// Version number, development switch, seed & color
// ================================================

var Main = {};
Main._version = 'Version 1.3.0';
// Set the _develop value in the window.onload function.
// Main._develop = false;

Main.getVersion = function () { return this._version; };
Main.getDevelop = function () { return this._develop; };

Main.setDevelop = function () { this._develop = !this._develop; };

// Set seed manually for testing. '#' can be omitted.
// There are no hyphens ('-') inside numbered seed.
// Example:
// Main._devSeed = '#12345';
Main.getDevSeed = function () { return this._devSeed; };

Main._color = new Map();
Main._color.set('white', '#ABB2BF');
Main._color.set('black', '#262626');
Main._color.set('grey', '#666666');
Main._color.set('orange', '#FF9900');
Main._color.set('green', '#A0D86C');

Main.getColor = function (color) {
    if (Main._color.get(color)) {
        return Main._color.get(color);
    }
    return color;
};

Main._log = {};
Main._log.seedPrinted = false;
Main._log.msgPrinted = false;
Main._log.floor = null;
Main._log.cycle = null;
Main._log.retry = [];
Main._log.enemyCount = null;
Main._log.enemyComposition = [];

// ==============
// Initialization
// ==============

window.onload = function () {
    let errorText = null;
    Main._develop = Main.system.loadWizardMode();

    Main.text.initialize();
    Main.entity.message();
    Main.entity.gameProgress();

    document.getElementById('game').appendChild(Main.display.getContainer());

    if (!ROT.isSupported()) {
        errorText = Main.text.error('browser');
    } else if (!Main.system.storageAvailable()) {
        errorText = Main.text.error('storage');
    }

    if (errorText) {
        Main.display.drawText(
            Main.UI.cutScene.getX(),
            Main.UI.cutScene.getY(),
            errorText,
            Main.UI.cutScene.getWidth()
        );
        return;
    }

    Main.display.clear();

    Main.getEntity('gameProgress').BossFight.setDungeonLevel(
        Main.system.loadDungeonLevel()
    );
    // TODO: delete this line when finish builidng the 2nd level.
    // Main.getEntity('gameProgress').BossFight.setDungeonLevel(3);

    // Achievements.
    Main.system.setAchievement();
    Main.system.checkAchUnlockAll();

    if (Main.getDevelop()) {
        Main.screens.main.enter();
        Main.input.listenEvent('add', 'main');
    } else {
        Main.screens.cutScene.enter();
        Main.input.listenEvent('add', 'cutScene');
    }
};
