package Java;

abstract class Car{
    abstract public void drive();
    abstract public void fly();

    public void playMusic(){
        System.out.println("playing music");
    }
}

 abstract class WagonR extends Car{ // if we make this also abstract the it is not necessary to declare all features of parent class

    
    public void drive() {
        System.out.println("driving");
    }

}

class UpdateWagonR extends WagonR{// concrete class
    public void fly(){
        System.out.println("Flying");
    }
}

public class Abstract {
    public static void main(String[] args) {
        Car obj = new UpdateWagonR();
            obj.drive();
            obj.fly();
            obj.playMusic();
        
    }
}
