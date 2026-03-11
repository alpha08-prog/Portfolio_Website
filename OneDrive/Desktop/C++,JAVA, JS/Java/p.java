package Java;
class Student{
    int roll_no;
    String name;
    int marks;

}
public class p {
    public static void main(String[] args){
        Student s1 = new Student();
        s1.roll_no=34;
        s1.name="Ankur";
        s1.marks=65;

        Student s2 = new Student();
        s2.roll_no=43;
        s2.name="karan";
        s2.marks=71;

        Student s3 = new Student();
        s3.roll_no=23;
        s3.name="Rohit";
        s3.marks=87;

        Student students[] = new Student[3];
        students[0]=s1;
        students[1]=s2;
        students[2]=s3;

        

        for(Student stud: students)
        System.out.println(stud.name + ":" + stud.marks);
    }
}
