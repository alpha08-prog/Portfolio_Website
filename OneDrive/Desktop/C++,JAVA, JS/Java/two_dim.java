package Java;

public class two_dim {
    public static void main(String[] args) {
        int array[][] = new int[3][];//jagged array

         array[0]= new int[3];
         array[1]= new int[4];
         array[2]= new int[2];

        for (int i = 0; i < array.length; i++) {
            for (int j = 0; j < array[i].length; j++) {
                array[i][j] = (int) (Math.random() * 10);
               
            }
        }
        for (int i = 0; i < array.length; i++) {
            for (int j = 0; j < array[i].length; j++) {
               System.out.print(array[i][j] + " ");
               
            }
            System.out.println();
        }
        

    }
}
