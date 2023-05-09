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

    @property(cc.Node)
    player: cc.Node = null;

    private beeArray: Array<cc.Node> = [];

    private maxBee = 10;

    private isPlaying: boolean;

    private speed = 50;

    private angleOld: number = 0;

    private angleD: number;

    private deltaTime: number;
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

    

    private onMouseDown(event: cc.Event.EventMouse) {
        let gunPos = this.player.getComponent('Player').getGunPos();
        console.log(`gun pos: ${gunPos}`);
        // cc.tween(this.player)
        // .by(1,{position: gunPos})
        // .start();
        // this.player.movePlayer(gunPos);
        // let playerPos = this.player.getComponent('Player').getPLayerPos();
        // console.log(`playerPos: ${playerPos}`);
        // let direc = playerPos.sub(gunPos);
        // console.log(`direc: ${direc}`);
        // this.player.getComponent('Player').Rigid_Body.applyForceToCenter(cc.v2(direc.x*this.speed,direc.y*this.speed),true);
        // let newPosition = this.player.node.position.add(direc.multiplyScalar(this.speed*this.deltaTime));
        // this.player.node.setPosition(newPosition);
    }

    onMouseMove(event: cc.Event.EventMouse){
        let playerPos = this.player.getPosition();
        let tankPos = new cc.Vec2(playerPos.x,playerPos.y);
        let mousePos = event.getLocation();
        let localPos = this.node.convertToNodeSpaceAR(mousePos);
        let angle = localPos.signAngle(tankPos);
        let angleDegrees  = cc.misc.radiansToDegrees(angle);
        angleDegrees +=5;
        this.angleD = angleDegrees - this.angleOld;
        this.angleOld = angleDegrees;
        //console.log(this.angleD);
        // // Xoay sprite của Player
        this.player.angle = -angleDegrees;
    }

    rotatePlayer(dt: number){
        let rotateAction = cc.rotateBy(dt, this.angleD*dt);
        this.player.runAction(rotateAction);
    }
    update(dt) {
        
    }
}
