#include<bits/stdc++.h>
using namespace std;

class Student{
    string name;
    int rollNumber;
    float grade;

    public:
    Student(){

    }

    Student(string Name,int rollNum,float grade){
        this->grade=grade;
        this->name=Name;
        this->rollNumber=rollNum;
    }

    void setName(string n){
        this->name=n;
    }

    void setRollnum(int r_num){
        this->rollNumber=r_num;
    }

    void Setgrade(float grade){
        this->grade=grade;
    }

    string getName(){
        return name;
    }

    int getRollNum(){
        return rollNumber;
    }

    float getGrade(){
        return grade;
    }


};

int main(){
    Student S1("Rohan",23,8.85);
    cout<<"Details of the Student are: "<<endl;
    cout<<"Name: "<<S1.getName()<<endl;
    cout<<"RollNumber: "<<S1.getRollNum()<<endl;
    cout<<"Grade: "<<S1.getGrade()<<endl;
    return 0;
}