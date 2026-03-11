package Java;

class Human{
    private int age;
    private String name;

    public Human(){
        age=15;
        name="Jay";
    }
    public Human(int a,String name){
        age=a;
        this.name = name;
    }

    public void setName(String n){
        name=n;
    }
    public void setAge(int a){
        age=a;
    }

    public String getName(){
        return name;
    }
    public int getAge(){
        return age;
    }

}
public class encap {
    public static void main(String[] args){
        Human obj = new Human();
        Human obj1 = new Human(13,"garvit");

        // obj.setName("Atharva");
        // obj.setAge(20);

        System.out.println(obj.getName() + ":" + obj.getAge());
        System.out.println(obj1.getName() + ":" + obj1.getAge());

    }
}
