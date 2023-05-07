import Player from "./Player";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    bulletPrefab: cc.Prefab= null;

    @property(cc.Prefab)
    beePrefab: cc.Prefab= null;

    @property(cc.Prefab)
    bee_blPrefab: cc.Prefab= null;

    @property({
        type: Player
    })
    player: Player = null;

    private beeArray: Array<cc.Node> = [];

    private maxBee = 10;

    private isPlaying: boolean;

    private speed = 500;
    onLoad() {
        let physics_manager = cc.director.getPhysicsManager();
        physics_manager.enabled = true;
        physics_manager.gravity = cc.v2(0,0);

        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true; 
    }

    start() {
        
    }

    update(dt) {
        
    }

    private onMouseDown(event: cc.Event.EventMouse) {
        let gunPos = this.player.getComponent('Player').getGunPos();
        let playerPos = this.player.getComponent('Player').node.getPosition();
        let direc = new cc.Vec2(gunPos.x-playerPos.x,gunPos.y-playerPos.y);
        this.player.getComponent('Player').Rigid_Body.applyForceToCenter(cc.v2(direc.x*this.speed,direc.y*this.speed),true);
    }

    onMouseMove(event: cc.Event.EventMouse){
        let playerPos = this.player.getComponent('Player').node.getPosition();
        let tankPos = new cc.Vec2(playerPos.x,playerPos.y);
        let mousePos = event.getLocation();
        let localPos = this.node.convertToNodeSpaceAR(mousePos);
        let angle = localPos.signAngle(tankPos);
        let angleDegrees  = cc.misc.radiansToDegrees(angle);
        angleDegrees +=35;
        // Xoay sprite của Player
        //this.player.getComponent('Player').node.angle = angleDegrees;
        this.player.getComponent('Player').node.angle = -angleDegrees;

        this.player.getComponent('Player').mousePos = this.node.convertToNodeSpaceAR(event.getLocation());
    }
}
