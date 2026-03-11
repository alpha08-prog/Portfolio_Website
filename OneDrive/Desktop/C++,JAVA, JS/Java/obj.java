package Java;

class calculator{
public int add(int a,int b){
    int result = a+b;
    return result;
}
}
public class obj {
    public static void main(String[] args) {
        int num1=89;
        int num2 = 43;

        calculator calc = new calculator();
        int result = calc.add(num1, num2);

        System.out.println(result);

    }
}
