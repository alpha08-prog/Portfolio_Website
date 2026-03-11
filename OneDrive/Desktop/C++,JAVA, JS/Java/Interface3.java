package Java;

//functional interface is an interface which has only one method.

@FunctionalInterface

interface A{
    int add(int a , int b);
}
public class Interface3 {
    public static void main(String[] args) {
        A obj = (i,j) -> i+j; // lambda functions work only with functional interface.

        int result = obj.add(8, 9);
        System.out.println(result);
    }
}
