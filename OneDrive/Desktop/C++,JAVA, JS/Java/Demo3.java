package Java;
class MyException extends Exception{
    public MyException(String str){
        super(str);
    }
}
public class Demo3 {
    public static void main(String[] args) {
        int i=20;
        int j=0;

     
        try{
            j=18/i;
            if(j==0)
                throw new MyException("Fcuk off");
        }
            
            catch (MyException e){
                j=18/1;
                System.out.println("That's the default value.");
            }

        
        catch(ArithmeticException e){
            System.out.println("Cannot divide by 0");
        }
        catch(ArrayIndexOutOfBoundsException e){
            System.out.println("Not in the size");
        }
        catch(Exception e){
            System.out.println("Something went wrong" + e);
        }
        System.out.println(j);
    }
}
