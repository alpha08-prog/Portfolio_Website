#include<bits/stdc++.h>
using namespace std;

class calculator{
    public:
    double calculate( double num1, char oper,double num2){
        switch(oper)
        {
            case('+'):
            return add(num1,num2);
            case('-'):
            return subtract(num1,num2);
            case('*'):
            return multiply(num1,num2);
            case('/'):
            return divide(num1,num2);
        }

    }

    private:
   
    double add(double a, double b) {
        return a + b;
    }

    double subtract(double a, double b) {
        return a - b;
    }

    double multiply(double a, double b) {
        return a * b;
    }

    double divide(double a, double b) {
        if (b != 0) {
            return a / b;
        }
    }
};

int main(){
    double a,b;
    char oper;
    char reply;
    calculator calc;
    cout<<"Enter the first number:"<<endl;
    cin>>a;

    cout<<"Enter the operation symbol to be carried out:"<<endl;
    cin>>oper;

    cout<<"Enter the second number:"<<endl;
    cin>>b;

    double result = calc.calculate(a,oper,b);
    cout<<"Result is: "<<result<<endl;
    

    cout<<"Do you want to do further calculation:"<<endl;
    cin>>reply;

    if(reply == 'Y'){
        return calc.calculate(a,oper,b);
    }else{
        return 0;
    }
}