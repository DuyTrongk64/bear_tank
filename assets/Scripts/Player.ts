const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

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

    
    onMouseDown(event: cc.Event.EventMouse) {
        
    }

    onMouseMove(event: cc.Event.EventMouse){
       
    }

    update(dt){

    }

    
}
