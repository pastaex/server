/// <reference path="../../declaration/client.ts" />

import {Container} from '../modules/data';
import {methods} from '../modules/methods';
import {user} from '../user';
import {ui} from '../modules/ui';
import {houses} from '../houses';
import {jobPoint} from '../managers/jobPoint';
import { gui } from '../modules/gui';


let isProcess = false;
let _checkpointId = -1;
let bugstars = {
    findHouse: function() {
        try {
            methods.debug('Execute: bugstars.findHouse');
            if (isProcess) return;
            houses.getRandomHousePositionOfLosSantos('client:jobs:bugstars:findHouse');
        } catch (e) {
            methods.debug('Exception: bugstars.findHouse');
            methods.debug(e);
        }
    },

    findHouseEvent: function(x:number, y:number, z:number) {
        try {
            methods.debug('Execute: bugstars.findHouseEvent');
            if (isProcess) return;
    
            isProcess = true;
            mp.game.ui.notifications.showWithPicture('Начальник', "323-555-4122", 'Скинул координаты точки', "CHAR_MICHAEL", 1);
            _checkpointId = jobPoint.create(new mp.Vector3(x, y, z), true);
        } catch (e) {
            methods.debug('Exception: bugstars.findHouseEvent');
            methods.debug(e);
        }
    },

    workProcess: function() {
        try {
            methods.debug('Execute: bugstars.workProcess');
            if (!isProcess) return;
    
            user.showLoadDisplay();
    
            Container.ResetLocally(mp.players.local.id, 'workerTool');
            isProcess = false;
    
            methods.disableAllControls(true);
            jobPoint.delete();
    
            user.playScenario("CODE_HUMAN_MEDIC_TIME_OF_DEATH");
    
            setTimeout(function () {
                try {
                    methods.debug('Execute: bugstars.workProcess function ()');
                    methods.disableAllControls(false);
                    user.stopScenario();
                    user.hideLoadDisplay();
                    user.giveJobMoney(methods.getRandomInt(35, 45));
                    user.giveJobSkill();
                    mp.game.ui.notifications.show('~b~Вы произвели необходимую проверку в доме');
                }
                catch (e) {
    
                    methods.debug('Exception: bugstars.workProcess function ()');
                    methods.debug(e);
                }
            }, 5000);
        } catch (e) {
            methods.debug('Exception: bugstars.workProcess');
            methods.debug(e);
        }
    }
};


mp.events.add("playerEnterCheckpoint", (checkpoint) => {
    if(gui.isActionGui()) return;
    if (!isProcess) return;
    if (_checkpointId == -1 || _checkpointId == undefined)
        return;
    if (checkpoint.id == _checkpointId) {
        if (!Container.HasLocally(mp.players.local.id, 'workerTool')) {
            mp.game.ui.notifications.show('~r~Возьмите инструменты в транспорте');
            return;
        }
        bugstars.workProcess();
    }
});

mp.events.add("client:jobs:bugstars:findHouse", (x, y, z) => {
    bugstars.findHouseEvent(x, y, z);
});

export {bugstars};