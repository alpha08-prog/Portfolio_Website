package Java;
class A extends Thread{ // Threads are useful when we want to execute multiple things at the same time.
    // we can also implement Runnabele the only difference will be ot eill not have the properties of thread class.

    public void run()
	{
		for(int i=1;i<=100;i++)
		{
			System.out.println("Hi");
			try {
				Thread.sleep(10);
			}catch(InterruptedException e) {
				e.printStackTrace();
			}
		}
	}
}

class B extends Thread{
    public void run()
	{
		for(int i=1;i<=100;i++)
		{
			System.out.println("Hello");
			try {
				Thread.sleep(10);
			}catch(InterruptedException e) {
				e.printStackTrace();
			}
		}
	}
}
public class Threads {
    public static void main(String[] args) {
        A obj1=new A();
    	B obj2=new B();
    	
//    	obj1.show();
//    	obj2.show();
    	
    	obj2.setPriority(Thread.MAX_PRIORITY);
    	System.out.println(obj1.getPriority());
    	
    	obj1.start();
    	try {
			Thread.sleep(2);
		}catch(InterruptedException e) {
			e.printStackTrace();
		}
    	obj2.start();

        // Runnable obj = new Thread();
        // Runnable obj3  = new Thread();

        // Thread t1 = new Thread(obj);
        // Thread t2 = new Thread(obj3);

        // t1.start();
        // t2.start();
    }
}
