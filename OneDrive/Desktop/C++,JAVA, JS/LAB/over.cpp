#include<bits/stdc++.h>
using namespace std;

class Student{
     public:
    string name;
    int marks1;
    int marks2;
    int marks3;
    int marks4;

   
    Student(string n){
        name=n;
    }

    void add(int m_1,int m_2,int m_3){
        cout<<m_1+m_2+m_3<<endl;.

    }

    void add(int m_1,int m_2,int m_3,int m_4){
        cout<< m_1+m_2+m_3+m_4<<endl;
    }
};

Student operator +(int b){
    
}

int main(){
    
    Student s1("Rohan");
    s1.add(89,32,76,87);
    return 0;
}