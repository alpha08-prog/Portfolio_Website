#include<iostream>
#include<stdlib.h>
#include<vector>
#include<map>
#include<set>
#include<stack>
#include<queue>
#include<unordered_map>
using namespace std;
    class calc
    {
        public:
        int num1;
        int num2;

        int add(int num1, int num2){
            return num1+num2;
        }

        int mullt(int a, int b){
            return a*b;
        }
        int div(int c, int d){
            return c/d;
        }

    };

int main(){

    calc c;
    cout<<"Sum is: "<<c.add(5,6)<<endl;
    cout<<"product is: "<<c.mullt(3,4)<<endl;
    cout<<"division is: "<<c.div(4,2)<<endl;
    
    return 0;
}