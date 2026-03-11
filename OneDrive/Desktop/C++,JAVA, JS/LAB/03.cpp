#include<bits/stdc++.h>
using namespace std;

class Rectangle{
    int length;
    int breadth;

    public:
    Rectangle(){
        this->breadth=1;
        this->length=1;
    }

    Rectangle(int n){
        this->breadth=this->length=n;
    }

    Rectangle(int a,int b){
        this->breadth=a;
        this->length=b;
    }

    int area(){
        return length*breadth;
    }
};

int main(){
    Rectangle r1(3,4);
    cout<<"The area of the rectangle is: "<<r1.area()<<endl;
    return 0;
}