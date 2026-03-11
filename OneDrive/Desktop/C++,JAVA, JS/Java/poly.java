package Java;
//dynamic method dispatch//method overriding.
class A{
    A(){
        System.out.println("in A");
    }
}

class B extends A{
    B(){
        System.out.println("in B");
    }
}
class C extends A{
    C(){
        System.out.println("in C");
    }
}
public class poly {
    public static void main(String[] args){

        A obj = new A();
        obj = new B();
        obj = new C();
    }
}
