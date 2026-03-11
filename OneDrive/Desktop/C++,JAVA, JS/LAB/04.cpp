#include<bits/stdc++.h>
using namespace std;

class Circle{
    float radius;

    public:
    Circle(){
        radius=1.0;
    }

    Circle(int a){
        this->radius=a;
    }

    Circle(float radius){
        this->radius=radius;
    }

    float area(){
        return 3.14*radius*radius;
    }
};

int main(){
    Circle c1(4);
    cout<<"The area of circle is: "<<c1.area()<<endl;
    return 0;
}