const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property(cc.Node)
    gun: cc.Node= null;

    private speed: number = 50;

    private Rigid_Body;

    private curPos: cc.Vec2;

    onLoad(){
        this.Rigid_Body = this.node.getComponent(cc.RigidBody);

        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
    }
    

    start() {
        
    }

    getGunPos():cc.Vec2{
        return this.gun.getPosition();
    }

    movePlayer(direction: cc.Vec2){
        let direc = new cc.Vec3(direction.x,direction.y,0);
        let newPosition = this.node.position.add(direc.mul(this.speed));
        this.node.setPosition(newPosition);
    }

    onMouseDown(event: cc.Event.EventMouse) {
        // let direc = this.getGunPos();
        // console.log(direc);
        //this.movePlayer(direc);
    }

    onMouseMove(event: cc.Event.EventMouse){
       
    }

    update(dt){

    }

    
}
