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
        let playerPos = this.player.getPosition();
        console.log(`playerPos : ${playerPos}`);
        //let tankPos = this.node.convertToNodeSpaceAR(playerPos);

        // console.log(tankPos);
        let mousePos = event.getLocation();
        let localPos = this.node.convertToNodeSpaceAR(mousePos);
        console.log(`localPos : ${localPos}`);

        let moveVec = playerPos.sub(localPos);

        let moveLength = 100; // Chiều dài đoạn di chuyển
        let distance = moveLength / moveVec.mag(); // Khoảng cách di chuyển
        let movementVec = moveVec.mul(distance); // Vector di chuyển node

        let movementVector = new cc.Vec3(movementVec.x,movementVec.y,0);
        let duration = 0.1;
        cc.tween(this.player)
        .to(duration, { position: this.player.position.add(movementVector) })
        .start();
        
    }

    onMouseMove(event: cc.Event.EventMouse){
        let playerPos = this.player.getPosition();
        //console.log(playerPos);
        let tankPos = this.node.convertToNodeSpaceAR(playerPos);
        let mousePos = event.getLocation();
        let localPos = this.node.convertToNodeSpaceAR(mousePos);
        let angle = localPos.signAngle(tankPos);
        let angleDegrees  = cc.misc.radiansToDegrees(angle);
        angleDegrees +=148;
        this.angleD = angleDegrees - this.angleOld;
        this.angleOld = angleDegrees;
        //console.log(this.angleD);
        // // Xoay sprite của Player
        this.player.angle = -angleDegrees;
        
    }

    plShot(){
        
    }
    
    update(dt) {
        
    }
}
