package Java;

enum Laptop{
    MacBook(2000), XPS(2200),ThinkPad(1800);

    private int price;
    private Laptop(int price){
        this.price=price;
    }
    public int getPrice(){
        return price;
    }
    public void setPrice(int p){
        this.price=p;
    }
}

public class Enum {
    public static void main(String[] args) {
        for(Laptop lap: Laptop.values()){
            System.out.println(lap + " : " + lap.getPrice());
        }
    }
}
