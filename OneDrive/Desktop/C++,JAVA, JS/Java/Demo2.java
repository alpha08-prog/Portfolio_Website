package Java;//wrapper class examples;

class Laptop{
    String model;
    int price;

    public String toString(){
        return model + " : " + price;
    }

    public boolean equals(Laptop that){
        return this.model.equals(that.model) && this.price==that.price; 
    }
}
public class Demo2 {
    public static void main(String[] args){

        Laptop obj = new Laptop();
        obj.model="Victus 5600H";
        obj.price=55000;

        Laptop obj2 = new Laptop();
        obj2.model="Victus 5600H";
        obj2.price=55000;

        boolean result = obj.equals(obj2);
        
        System.out.println(result);
        System.out.println(obj.toString());
    }
}
